import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { getContactEmailTemplate, getPaymentSuccessTemplate, getRefundInitiatedTemplate, getRefundSuccessTemplate } from './templates/emailTemplates.js';

dotenv.config()

// Supabase admin client (server-side — uses service key or anon key)
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL || process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'placeholder'
)

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:4173,https://ani0811.github.io'

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message, details, service, budget } = req.body

  const content = message || details

  if (!name || !email || !content) {
    return res.status(400).json({ error: 'Name, email, and message or description are required.' })
  }

  // Determine if this is a Discovery Call Booking request
  const isDiscoveryCall = !!service

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.AGENCY_EMAIL || 'gmedia774@gmail.com', // sends to agency
      replyTo: email,
      subject: isDiscoveryCall
        ? `✦ Discovery Call Request [${service}] from ${name} — Aether Digital`
        : `✦ New Message from ${name} — Aether Digital`,
      html: getContactEmailTemplate({ name, email, service, budget, content, isDiscoveryCall }),
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Nodemailer error:', err)
    res.status(500).json({ error: 'Failed to send email. Check your SMTP credentials.' })
  }
})

app.get('/', (req, res) => res.send('Aether Agency API'))

// Razorpay Initialization
const VITE_RAZORPAY_KEY_ID = process.env.VITE_RAZORPAY_KEY_ID
const VITE_RAZORPAY_KEY_SECRET = process.env.VITE_RAZORPAY_KEY_SECRET

let razorpay;
if (VITE_RAZORPAY_KEY_ID && VITE_RAZORPAY_KEY_SECRET) {
  console.log('Razorpay Key ID loaded:', `${VITE_RAZORPAY_KEY_ID.substring(0, 9)}... (length: ${VITE_RAZORPAY_KEY_ID.trim().length})`)
  console.log('Razorpay Key Secret loaded: (length:', VITE_RAZORPAY_KEY_SECRET.trim().length, ')')
  razorpay = new Razorpay({
    key_id: VITE_RAZORPAY_KEY_ID.trim(),
    key_secret: VITE_RAZORPAY_KEY_SECRET.trim(),
  })
} else {
  console.warn("⚠️ RAZORPAY KEYS MISSING: Please add VITE_RAZORPAY_KEY_ID and VITE_RAZORPAY_KEY_SECRET to your environment variables.")
}

app.post('/api/create-order', async (req, res) => {
  try {
    console.log('--- Razorpay Order Creation Start ---')
    console.log('Request body:', req.body)
    if (!razorpay) {
      console.error('Razorpay client not initialized. Keys are missing in process.env.')
      return res.status(500).json({ error: 'Razorpay keys not configured on the server.' })
    }
    const { amount, receipt } = req.body
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`
    }
    console.log('Creating order with options:', options)
    const order = await razorpay.orders.create(options)
    console.log('Razorpay Order Response:', order)
    res.json(order)
  } catch (error) {
    console.error('Razorpay Create Order Error details:', error)
    res.status(500).json({ error: error.message || 'Failed to create order' })
  } finally {
    console.log('--- Razorpay Order Creation End ---')
  }
})

app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  const body = razorpay_order_id + "|" + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac('sha256', VITE_RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex')

  if (expectedSignature === razorpay_signature) {
    try {
      let userEmail = null
      let userAmount = 0

      if (razorpay) {
        const payment = await razorpay.payments.fetch(razorpay_payment_id)
        userEmail = payment.email
        userAmount = payment.amount / 100

        // Log payment to Supabase (fire-and-forget)
        supabase.from('payments').insert([{
          razorpay_order_id,
          razorpay_payment_id,
          amount: userAmount,
          email: userEmail || null,
          status: 'captured',
        }]).then(({ error }) => {
          if (error) console.warn('⚠️ Supabase payment log failed:', error)
          else console.log('✅ Payment logged to Supabase:', razorpay_payment_id)
        })

        if (userEmail) {
          // Send receipt email (fire-and-forget — don't block the response)
          transporter.sendMail({
            from: `"G-One Media" <${process.env.SMTP_USER}>`,
            to: userEmail,
            subject: 'Payment Received — G-One Media',
            html: getPaymentSuccessTemplate({ userAmount, razorpay_payment_id })
          }).catch(err => console.warn('Payment email failed:', err))
        }
      }
      res.json({ success: true, message: 'Payment verified successfully' })
    } catch (error) {
      console.error('Error in post-verification:', error)
      res.json({ success: true, message: 'Payment verified successfully, but post-processing failed.' })
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' })
  }
})

app.post('/api/refund', async (req, res) => {
  const { payment_id, email } = req.body

  if (!payment_id || !email) {
    return res.status(400).json({ error: 'Payment ID and Email are required.' })
  }

  if (!razorpay) {
    return res.status(500).json({ error: 'Razorpay keys not configured on the server.' })
  }

  try {
    const payment = await razorpay.payments.fetch(payment_id)
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found.' })
    }

    if (payment.email !== email) {
      return res.status(403).json({ error: 'Email does not match the payment record.' })
    }

    if (payment.status === 'refunded') {
      return res.status(400).json({ error: 'This payment has already been refunded.' })
    }

    const refund = await razorpay.payments.refund(payment_id)

    // In Test Mode (or if Razorpay processed it instantly in Live Mode), status is 'processed'
    if (refund.status === 'processed') {
      await transporter.sendMail({
        from: `"Aether Agency" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Refund Successful — Aether Agency',
        html: getRefundSuccessTemplate({ amount: payment.amount / 100, payment_id, refund_id: refund.id })
      })
    } else {
      await transporter.sendMail({
        from: `"Aether Agency" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Refund Initiated — Aether Agency',
        html: getRefundInitiatedTemplate({ amount: payment.amount / 100, payment_id })
      })
    }

    res.json({ success: true, refund })
  } catch (error) {
    console.error('Refund Error:', error)
    res.status(500).json({ error: error.message || 'Failed to process refund' })
  }
})

app.post('/api/razorpay-webhook', async (req, res) => {
  const signature = req.headers['x-razorpay-signature']
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

  // Verify webhook signature if a secret is configured in the environment
  if (webhookSecret && signature) {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex')

    if (expectedSignature !== signature) {
      console.warn('⚠️ Webhook signature verification failed')
      return res.status(400).json({ error: 'Invalid webhook signature' })
    }
  }

  const { event, payload } = req.body

  if (event === 'refund.processed') {
    try {
      const refundEntity = payload.refund.entity
      const paymentId = refundEntity.payment_id
      const amount = refundEntity.amount / 100

      if (razorpay) {
        // Fetch payment details to obtain the consumer's email address
        const payment = await razorpay.payments.fetch(paymentId)
        const email = payment.email

        if (email) {
          await transporter.sendMail({
            from: `"G-One Media" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Refund Successful — G-One Media',
            html: getRefundSuccessTemplate({ amount, payment_id: paymentId, refund_id: refundEntity.id })
          })
          console.log(`✉️ Async refund successful email sent to ${email} for payment ${paymentId}`)
        }
      }
    } catch (error) {
      console.error('Error handling refund.processed webhook:', error)
    }
  }
  res.json({ status: 'ok' })
})
// ─────────────────────────────────────────────────────────────────────────────
// AI CHAT WIDGET ENDPOINT
// ─────────────────────────────────────────────────────────────────────────────

const chatSessions = new Map()

const CHAT_SYSTEM_PROMPT = `
You are an AI assistant for Aether Digital (G-One Media), a modern digital agency based in India.

WHAT WE DO:
- Custom Website Design & Development (React, Next.js, full-stack)
- E-commerce solutions with Razorpay payment integrations
- Digital marketing (SEO, social media, email campaigns)
- AI chatbot creation & automation
- Video production (Reels, YouTube, cinematic content)
- Brand identity & logo design

HOW TO RESPOND:
- Be friendly, professional, and concise (2-4 sentences max per reply)
- If asked for pricing, say packages start from ₹10,000 and vary by scope
- If someone wants to book a call or discuss a project, ask for their name and email and say our team will reach out within 24 hours
- If asked something you are not sure about, say "Let me connect you with our team for that!" and ask for their email
- Never make up specific details you are not sure about
- Use short paragraphs and emojis sparingly for a modern feel
`.trim()

app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service not configured.' })
  }

  const sid = sessionId || `session_${Date.now()}`

  if (!chatSessions.has(sid)) {
    chatSessions.set(sid, [
      { role: 'user', parts: [{ text: CHAT_SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: "Hi! I'm the Aether Digital assistant. How can I help you today? 🚀" }] }
    ])
  }

  const history = chatSessions.get(sid)
  history.push({ role: 'user', parts: [{ text: message }] })

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history,
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || "I'm having a moment! Could you rephrase that?"

    history.push({ role: 'model', parts: [{ text: reply }] })

    // Trim history to prevent token overflow
    if (history.length > 22) {
      const trimmed = [history[0], history[1], ...history.slice(-18)]
      chatSessions.set(sid, trimmed)
    }

    res.json({ reply, sessionId: sid })
  } catch (error) {
    console.error('Chat API error:', error)
    res.status(500).json({ error: 'Failed to get AI response.' })
  }
})

app.listen(PORT, () => console.log(`✅ Aether API running on http://localhost:${PORT}`))

