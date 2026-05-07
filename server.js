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
  tls: {
    rejectUnauthorized: false,
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
      subject: `✦ New Lead from ${name} — Aether Digital`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Lead — Aether Agency</title>
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
                      <p style="margin:6px 0 0; font-size:14px; color:#94a3b8;">New Contact Request</p>
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
                                <td width="80" style="font-size:14px; color:#64748b; padding-bottom:12px;">Name:</td>
                                <td style="font-size:14px; font-weight:600; color:#0f172a; padding-bottom:12px;">${name}</td>
                              </tr>
                              <tr>
                                <td width="80" style="font-size:14px; color:#64748b;">Email:</td>
                                <td style="font-size:14px; font-weight:600;">
                                  <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Message -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom: 8px;">
                            <p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:600;">Message</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 24px; border: 1px solid #e2e8f0; border-left: 4px solid #0f172a; border-radius: 4px; background-color: #ffffff;">
                            <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; white-space:pre-wrap;">${message.replace(/\n/g, '<br/>')}</p>
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

app.listen(PORT, () => console.log(`✅ Aether API running on http://localhost:${PORT}`))
