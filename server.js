import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:4173,https://ani0811.github.io'

const corsOptions = FRONTEND_ORIGIN === '*'
  ? {}
  : { origin: FRONTEND_ORIGIN.split(',').map(s => s.trim()) }

app.use(cors(corsOptions))
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
      to: process.env.SMTP_USER, // sends to yourself
      replyTo: email,
      subject: isDiscoveryCall 
        ? `✦ Discovery Call Request [${service}] from ${name} — Aether Digital`
        : `✦ New Message from ${name} — Aether Digital`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>${isDiscoveryCall ? 'Discovery Call Request' : 'New Message'} — Aether Agency</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
                  
                  <!-- HEADER -->
                  <tr>
                    <td style="padding: 32px 40px; background-color: #0f172a; text-align: center;">
                      <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff; tracking:-0.5px;">Aether Agency</h1>
                      <p style="margin:6px 0 0; font-size:14px; color:#94a3b8;">
                        ${isDiscoveryCall ? '✦ New Discovery Booking Request' : '✦ New Contact Request'}
                      </p>
                    </td>
                  </tr>

                  <!-- CONTENT -->
                  <tr>
                    <td style="padding: 40px;">
                      <!-- Contact Info -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:600;">Client Details</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td width="100" style="font-size:14px; color:#64748b; padding-bottom:12px;">Name:</td>
                                <td style="font-size:14px; font-weight:600; color:#0f172a; padding-bottom:12px;">${name}</td>
                              </tr>
                              <tr>
                                <td width="100" style="font-size:14px; color:#64748b; padding-bottom:${isDiscoveryCall ? '12px' : '0px'};">Email:</td>
                                <td style="font-size:14px; font-weight:600; padding-bottom:${isDiscoveryCall ? '12px' : '0px'};">
                                  <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a>
                                </td>
                              </tr>
                              ${isDiscoveryCall ? `
                              <tr>
                                <td width="100" style="font-size:14px; color:#64748b; padding-bottom:12px;">Service:</td>
                                <td style="font-size:14px; font-weight:600; color:#06b6d4; padding-bottom:12px;">${service}</td>
                              </tr>
                              <tr>
                                <td width="100" style="font-size:14px; color:#64748b;">Budget Focus:</td>
                                <td style="font-size:14px; font-weight:600; color:#0f172a;">${budget}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Message -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:600;">
                              ${isDiscoveryCall ? 'Project Description' : 'Message'}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 24px; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; border-radius: 4px; background-color: #ffffff;">
                            <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; white-space:pre-wrap;">${content.replace(/\n/g, '<br/>')}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- ACTION -->
                  <tr>
                    <td style="padding: 0 40px 40px;" align="center">
                      <a href="mailto:${email}?subject=Re: Your inquiry with Aether Agency" style="display:inline-block; background-color:#2563eb; color:#ffffff; font-weight:500; font-size:14px; text-decoration:none; padding:12px 32px; border-radius:6px;">
                        Reply to ${name}
                      </a>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px 40px; text-align: center;">
                      <p style="margin:0; font-size:13px; color:#64748b;">This email was sent from the Aether Agency website.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Nodemailer error:', err)
    res.status(500).json({ error: 'Failed to send email. Check your SMTP credentials.' })
  }
})

app.get('/', (req, res) => res.send('Aether Agency API'))

// Razorpay Initialization
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, receipt } = req.body
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`
    }
    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (error) {
    console.error('Razorpay Create Order Error:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  const body = razorpay_order_id + "|" + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex')

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: 'Payment verified successfully' })
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' })
  }
})

app.listen(PORT, () => console.log(`✅ Aether API running on http://localhost:${PORT}`))
