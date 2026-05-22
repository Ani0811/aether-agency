import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { getContactEmailTemplate, getPaymentSuccessTemplate, getRefundInitiatedTemplate, getRefundSuccessTemplate } from './templates/emailTemplates.js';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcodeTerminal from 'qrcode-terminal';

dotenv.config()

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
      if (razorpay) {
        const payment = await razorpay.payments.fetch(razorpay_payment_id)
        const userEmail = payment.email
        const userAmount = payment.amount / 100

        if (userEmail) {
          await transporter.sendMail({
            from: `"Aether Agency" <${process.env.SMTP_USER}>`,
            to: userEmail,
            subject: 'Payment Received — Aether Agency',
            html: getPaymentSuccessTemplate({ userAmount, razorpay_payment_id })
          })
        }
      }
      res.json({ success: true, message: 'Payment verified successfully' })
    } catch (error) {
      console.error('Error in post-verification (email):', error)
      res.json({ success: true, message: 'Payment verified successfully, but failed to send receipt email.' })
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
// WHATSAPP BOT INTEGRATION (DEPLOYED TO RENDER/PRODUCTION)
// ─────────────────────────────────────────────────────────────────────────────

const whatsappLogs = [];
function addWhatsappLog(type, message) {
  const timestamp = new Date().toLocaleTimeString();
  whatsappLogs.push({ timestamp, type, message });
  if (whatsappLogs.length > 55) {
    whatsappLogs.shift();
  }
  console.log(`[WhatsApp Bot] [${type.toUpperCase()}] ${message}`);
}

let latestQr = null;
let whatsappStatus = 'initializing'; // 'initializing', 'qr_ready', 'authenticated', 'ready', 'disconnected'

const whatsappClient = new Client({
  authStrategy: new LocalAuth({ clientId: 'g-onemedia-bot', dataPath: './node_modules/.wwebjs_auth' }),
  puppeteer: {
    headless: true,
    handleSIGINT: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ],
  }
});

whatsappClient.on('qr', (qr) => {
  latestQr = qr;
  whatsappStatus = 'qr_ready';
  addWhatsappLog('qr', 'New QR code generated, waiting for scan.');
  console.log('▼ Scan the QR below or visit /api/whatsapp-qr to connect:');
  qrcodeTerminal.generate(qr, { small: true });
});

whatsappClient.on('authenticated', () => {
  whatsappStatus = 'authenticated';
  latestQr = null;
  addWhatsappLog('auth', 'WhatsApp session authenticated successfully.');
  console.log('✅ WhatsApp authenticated!');
});

whatsappClient.on('ready', () => {
  whatsappStatus = 'ready';
  addWhatsappLog('ready', 'WhatsApp assistant online and active.');
  console.log('🚀 WhatsApp AI bot is ready!');
});

whatsappClient.on('disconnected', (reason) => {
  whatsappStatus = 'disconnected';
  latestQr = null;
  addWhatsappLog('error', `WhatsApp disconnected: ${reason}`);
  console.log(`⚠️ WhatsApp disconnected: ${reason}`);
  setTimeout(() => {
    try {
      addWhatsappLog('info', 'Attempting to reinitialize WhatsApp client...');
      console.log('Attempting to reinitialize WhatsApp client...');
      whatsappClient.initialize();
    } catch (e) {
      addWhatsappLog('error', `Reinitialization failed: ${e.message}`);
      console.error('Re-init failed:', e);
    }
  }, 10000);
});

// Memory session map
const whatsappSessions = new Map();

// Gemini Response function
async function getGeminiWhatsAppReply(userMessage, userId) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    addWhatsappLog('error', 'Gemini API key missing in environment configuration.');
    return "System configuration error: GEMINI_API_KEY is not set.";
  }

  const SYSTEM_PROMPT = `
You are an AI assistant for G-One Media (also known as Aether Digital), a modern digital agency based in India.

WHAT WE DO:
- Custom Website Design & Development (React, Next.js, full-stack)
- E-commerce solutions with Razorpay payment integrations
- Digital marketing (SEO, social media, email campaigns)
- AI chatbot creation & automation (like the one you are interacting with right now!)
- Brand identity & logo design

HOW TO RESPOND:
- Be friendly, professional, and concise (2-4 sentences max per reply)
- If asked for pricing, say packages start from ₹10,000 and vary by scope
- If someone wants to book a call or discuss a project, ask for their name and email and say our team will reach out within 24 hours
- If asked something you are not sure about, say "Let me connect you with our team for that!" and ask for their email
- Never make up specific details you are not sure about

NEVER say you are an AI or a bot unless the user directly and explicitly asks "are you a bot/AI?".
`.trim();

  if (!whatsappSessions.has(userId)) {
    whatsappSessions.set(userId, [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: "Understood! I am ready to assist G-One Media customers." }] }
    ]);
  }

  const history = whatsappSessions.get(userId);
  history.push({ role: 'user', parts: [{ text: userMessage }] });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    || "I'm having a moment! Could you rephrase that?";

  history.push({ role: 'model', parts: [{ text: replyText }] });

  if (history.length > 22) {
    const trimmed = [history[0], history[1], ...history.slice(-18)];
    whatsappSessions.set(userId, trimmed);
  }

  return replyText;
}

whatsappClient.on('message', async (msg) => {
  if (msg.from.includes('@g.us') || msg.isStatus) return;
  if (!msg.body || msg.body.trim() === '') return;

  const sender = msg.from.replace('@c.us', '');
  addWhatsappLog('incoming', `Received from +${sender}: "${msg.body.trim()}"`);

  const chat = await msg.getChat();
  await chat.sendStateTyping();

  try {
    const replyText = await getGeminiWhatsAppReply(msg.body.trim(), msg.from);
    await msg.reply(replyText);
    addWhatsappLog('outgoing', `Sent to +${sender}: "${replyText}"`);
    console.log(`✅ Sent WhatsApp reply to ${msg.from}`);
  } catch (e) {
    addWhatsappLog('error', `Error replying to +${sender}: ${e.message}`);
    console.error('Error replying to WhatsApp:', e);
    await msg.reply("Sorry, I ran into a small issue. Please try again later!");
  } finally {
    await chat.clearState();
  }
});

// Start Client
try {
  addWhatsappLog('info', 'Initializing WhatsApp client...');
  whatsappClient.initialize();
} catch (e) {
  addWhatsappLog('error', `Failed to initialize WhatsApp client: ${e.message}`);
  console.error('Failed to initialize WhatsApp client:', e);
}

// ─────────────────────────────────────────────────────────────────────────────
// ENDPOINTS FOR WHATSAPP DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

app.get('/api/whatsapp-status', (req, res) => {
  res.json({
    status: whatsappStatus,
    hasQr: !!latestQr,
    qr: latestQr,
    logs: whatsappLogs
  });
});

app.post('/api/whatsapp-send', async (req, res) => {
  const { number, message } = req.body;
  if (!number || !message) {
    return res.status(400).json({ error: 'Phone number and message are required.' });
  }

  if (whatsappStatus !== 'ready') {
    return res.status(400).json({ error: 'WhatsApp client is not ready. Current status: ' + whatsappStatus });
  }

  try {
    let cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.length === 10) {
      cleanNumber = '91' + cleanNumber; // Default to India country code if 10 digits
    }
    const whatsappId = `${cleanNumber}@c.us`;
    
    await whatsappClient.sendMessage(whatsappId, message);
    addWhatsappLog('test', `Sent test message to +${cleanNumber}: "${message}"`);
    res.json({ success: true, message: `Message sent successfully to +${cleanNumber}` });
  } catch (err) {
    addWhatsappLog('error', `Failed to send test message to +${number}: ${err.message}`);
    console.error('Failed to send test message:', err);
    res.status(500).json({ error: err.message || 'Failed to send test message' });
  }
});

app.post('/api/whatsapp-logout', async (req, res) => {
  addWhatsappLog('info', 'Manual session disconnect requested from dashboard.');
  try {
    if (whatsappStatus === 'ready' || whatsappStatus === 'authenticated') {
      try {
        await whatsappClient.logout();
      } catch (logoutErr) {
        console.warn('Logout error, destroying anyway:', logoutErr);
      }
    }
    
    try {
      await whatsappClient.destroy();
    } catch (destroyErr) {
      console.warn('Destroy error:', destroyErr);
    }

    whatsappStatus = 'disconnected';
    latestQr = null;
    addWhatsappLog('info', 'WhatsApp client destroyed. Reinitializing in 2s...');

    setTimeout(() => {
      try {
        whatsappClient.initialize();
        addWhatsappLog('info', 'WhatsApp client reinitialized successfully.');
      } catch (err) {
        addWhatsappLog('error', `Reinitialization failed: ${err.message}`);
      }
    }, 2000);

    res.json({ success: true, message: 'Session disconnected and client reinitializing' });
  } catch (err) {
    addWhatsappLog('error', `Failed to disconnect session: ${err.message}`);
    res.status(500).json({ error: err.message || 'Failed to disconnect session' });
  }
});

app.get('/api/whatsapp-qr', (req, res) => {
  const dashboardHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>G-One Media — WhatsApp AI Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #0b0f19;
        }
        .glow {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.15);
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen text-slate-100 p-4">
    <!-- Background Blur Gradients -->
    <div class="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div class="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div class="absolute top-1/2 right-1/4 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full"></div>
    </div>

    <div class="glow max-w-md w-full backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        <!-- Brand Header -->
        <div class="flex items-center justify-center gap-3 mb-6">
            <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
            <h1 class="text-xl font-bold tracking-wider uppercase text-cyan-400">G-One Media AI</h1>
        </div>

        <p class="text-slate-400 text-sm mb-8 leading-relaxed">
            WhatsApp AI Assistant Dashboard. Control the chatbot session for website inquiries.
        </p>

        <!-- Dynamic Status Section -->
        <div class="mb-8">
            <span class="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2">Connection Status</span>
            <div id="status-badge" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-slate-800/80 text-sm font-semibold transition-all duration-300">
                <span id="status-indicator" class="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-ping"></span>
                <span id="status-text" class="text-slate-300">Checking status...</span>
            </div>
        </div>

        <!-- QR Code / Active State container -->
        <div class="flex flex-col items-center justify-center bg-slate-950/40 border border-slate-900 rounded-2xl p-6 min-h-[300px] mb-8 relative">
            <div id="loading-spinner" class="flex flex-col items-center gap-4 text-slate-400">
                <svg class="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm font-medium">Loading bot environment...</span>
            </div>

            <div id="qr-container" class="hidden flex flex-col items-center gap-6">
                <div class="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                    <div id="qrcode"></div>
                </div>
                <div class="text-xs text-slate-400 leading-relaxed max-w-xs">
                    <p class="font-semibold text-slate-300 mb-1">To Link WhatsApp:</p>
                    <ol class="list-decimal list-inside text-left space-y-1">
                        <li>Open WhatsApp on your phone</li>
                        <li>Tap Menu (⋮) or Settings (⚙️)</li>
                        <li>Tap <strong class="text-cyan-400">Linked Devices</strong> → <strong class="text-cyan-400">Link a Device</strong></li>
                        <li>Scan the QR code above</li>
                    </ol>
                </div>
            </div>

            <div id="online-container" class="hidden flex flex-col items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    ✓
                </div>
                <h3 class="text-lg font-bold text-emerald-400">Assistant Online</h3>
                <p class="text-xs text-slate-400 max-w-xs leading-relaxed">
                    The bot is linked and replying to website inquiries in real-time. Any incoming message will be handled by the AI.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <p class="text-[10px] text-slate-500 tracking-wider uppercase">
            G-One Media Systems • Secure Connection
        </p>
    </div>

    <script>
        let lastQr = null;
        let qrRenderer = null;
        const qrcodeEl = document.getElementById('qrcode');
        const statusBadge = document.getElementById('status-badge');
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('status-text');
        
        const loadingSpinner = document.getElementById('loading-spinner');
        const qrContainer = document.getElementById('qr-container');
        const onlineContainer = document.getElementById('online-container');

        async function checkStatus() {
            try {
                const res = await fetch('/api/whatsapp-status');
                const data = await res.json();
                
                updateUI(data.status, data.qr);
            } catch (err) {
                console.error('Error fetching status:', err);
                statusText.innerText = "Error Connecting to Server";
                statusIndicator.className = "w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse";
                statusBadge.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-red-500/30 text-sm font-semibold text-red-400";
            }
        }

        function updateUI(status, qr) {
            if (status === 'initializing') {
                statusText.innerText = "Initializing Server";
                statusIndicator.className = "w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse";
                statusBadge.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-cyan-500/30 text-sm font-semibold text-cyan-400";
                
                loadingSpinner.classList.remove('hidden');
                qrContainer.classList.add('hidden');
                onlineContainer.classList.add('hidden');
            } 
            else if (status === 'qr_ready') {
                statusText.innerText = "Waiting for Scan";
                statusIndicator.className = "w-2.5 h-2.5 rounded-full bg-yellow-500 animate-ping";
                statusBadge.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-yellow-500/30 text-sm font-semibold text-yellow-400";
                
                loadingSpinner.classList.add('hidden');
                qrContainer.classList.remove('hidden');
                onlineContainer.classList.add('hidden');

                if (qr && qr !== lastQr) {
                    lastQr = qr;
                    qrcodeEl.innerHTML = "";
                    new QRCode(qrcodeEl, {
                        text: qr,
                        width: 200,
                        height: 200,
                        colorDark: "#0b0f19",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                }
            } 
            else if (status === 'authenticated') {
                statusText.innerText = "Connecting to WhatsApp...";
                statusIndicator.className = "w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse";
                statusBadge.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-blue-500/30 text-sm font-semibold text-blue-400";
                
                loadingSpinner.classList.remove('hidden');
                qrContainer.classList.add('hidden');
                onlineContainer.classList.add('hidden');
            } 
            else if (status === 'ready') {
                statusText.innerText = "Active & Online";
                statusIndicator.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]";
                statusBadge.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-emerald-500/30 text-sm font-semibold text-emerald-400";
                
                loadingSpinner.classList.add('hidden');
                qrContainer.classList.add('hidden');
                onlineContainer.classList.remove('hidden');
            } 
            else if (status === 'disconnected') {
                statusText.innerText = "Disconnected";
                statusIndicator.className = "w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse";
                statusBadge.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-slate-950/40 border-red-500/30 text-sm font-semibold text-red-400";
                
                loadingSpinner.classList.remove('hidden');
                qrContainer.classList.add('hidden');
                onlineContainer.classList.add('hidden');
            }
        }

        setInterval(checkStatus, 1500);
        checkStatus();
    </script>
</body>
</html>
  `;
  res.send(dashboardHtml);
});

app.listen(PORT, () => console.log(`✅ Aether API running on http://localhost:${PORT}`))
