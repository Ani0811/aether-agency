import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // sends to yourself
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 32px; background: #050508; color: #fff; border-radius: 16px; border: 1px solid #1a1a24;">
          <h2 style="color: #00f0ff; margin-bottom: 8px;">New Message via Aether Digital</h2>
          <hr style="border-color: #1a1a24; margin-bottom: 24px;" />
          <p><strong style="color:#b9cacb;">Name:</strong> ${name}</p>
          <p><strong style="color:#b9cacb;">Email:</strong> <a href="mailto:${email}" style="color:#00f0ff;">${email}</a></p>
          <hr style="border-color: #1a1a24; margin: 24px 0;" />
          <p><strong style="color:#b9cacb;">Message:</strong></p>
          <p style="color:#b9cacb; line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Nodemailer error:', err)
    res.status(500).json({ error: 'Failed to send email. Check your SMTP credentials.' })
  }
})

app.listen(PORT, () => console.log(`✅ Aether API running on http://localhost:${PORT}`))
