export const getContactEmailTemplate = ({ name, email, service, budget, content, isDiscoveryCall }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${isDiscoveryCall ? 'Discovery Call Request' : 'New Message'} — G-One Media</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            
            <!-- HEADER -->
            <tr>
              <td style="padding: 32px 40px; background-color: #0f172a; text-align: center;">
                <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff; tracking:-0.5px;">G-One Media</h1>
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
                <a href="mailto:${email}?subject=Re: Your inquiry with G-One Media" style="display:inline-block; background-color:#2563eb; color:#ffffff; font-weight:500; font-size:14px; text-decoration:none; padding:12px 32px; border-radius:6px;">
                  Reply to ${name}
                </a>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px 40px; text-align: center;">
                <p style="margin:0; font-size:13px; color:#64748b;">This email was sent from the G-One Media website.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`

export const getPaymentSuccessTemplate = ({ userAmount, razorpay_payment_id }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Payment Receipt — G-One Media</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            <!-- HEADER -->
            <tr>
              <td style="padding: 32px 40px; background-color: #0f172a; text-align: center;">
                <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff; letter-spacing:-0.5px;">G-One Media</h1>
                <p style="margin:6px 0 0; font-size:14px; color:#94a3b8;">
                  ✦ Payment Successful
                </p>
              </td>
            </tr>
            <!-- CONTENT -->
            <tr>
              <td style="padding: 40px;">
                <h2 style="margin:0 0 20px; font-size:20px; color:#0f172a;">Thank you for your payment!</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #f1f5f9; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                  <tr>
                    <td width="120" style="font-size:14px; color:#64748b; padding-bottom:12px;">Amount Paid:</td>
                    <td style="font-size:14px; font-weight:600; color:#06b6d4; padding-bottom:12px;">INR ${userAmount}</td>
                  </tr>
                  <tr>
                    <td width="120" style="font-size:14px; color:#64748b;">Payment ID:</td>
                    <td style="font-size:14px; font-weight:600; color:#0f172a;">${razorpay_payment_id}</td>
                  </tr>
                </table>
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; margin-bottom:20px;">
                  Please keep this Payment ID for your records. If you are dissatisfied with our service, you can use this ID to request an instant refund on our website within the guarantee period.
                </p>
                <div style="text-align: center; margin-top: 24px;">
                  <a href="${process.env.FRONTEND_ORIGIN || 'https://g-onemedia.com'}/refund?payment_id=${razorpay_payment_id}" 
                     style="display:inline-block; background-color:#d946ef; color:#ffffff; font-weight:600; font-size:14px; text-decoration:none; padding:12px 24px; border-radius:6px;">
                    Request a Refund
                  </a>
                </div>
              </td>
            </tr>
            <!-- FOOTER -->
            <tr>
              <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px 40px; text-align: center;">
                <p style="margin:0; font-size:13px; color:#64748b;">Best regards,<br/>G-One Media Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`

export const getRefundInitiatedTemplate = ({ amount, payment_id }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Refund Initiated — G-One Media</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            <!-- HEADER -->
            <tr>
              <td style="padding: 32px 40px; background-color: #0f172a; text-align: center;">
                <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff; letter-spacing:-0.5px;">G-One Media</h1>
                <p style="margin:6px 0 0; font-size:14px; color:#94a3b8;">
                  ✦ Refund Processed
                </p>
              </td>
            </tr>
            <!-- CONTENT -->
            <tr>
              <td style="padding: 40px;">
                <h2 style="margin:0 0 20px; font-size:20px; color:#0f172a;">Your refund has been initiated</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #f1f5f9; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                  <tr>
                    <td width="140" style="font-size:14px; color:#64748b; padding-bottom:12px;">Refund Amount:</td>
                    <td style="font-size:14px; font-weight:600; color:#06b6d4; padding-bottom:12px;">INR ${amount}</td>
                  </tr>
                  <tr>
                    <td width="140" style="font-size:14px; color:#64748b;">Original Payment ID:</td>
                    <td style="font-size:14px; font-weight:600; color:#0f172a;">${payment_id}</td>
                  </tr>
                </table>
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; margin-bottom:16px;">
                  We have successfully initiated an instant refund for your payment. The amount should reflect in your source account within 1-2 business days, depending on your bank.
                </p>
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6;">
                  We are sorry to see you go. If there's anything we could have done better, please reply to this email and let us know!
                </p>
              </td>
            </tr>
            <!-- FOOTER -->
            <tr>
              <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px 40px; text-align: center;">
                <p style="margin:0; font-size:13px; color:#64748b;">Best regards,<br/>G-One Media Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`

export const getRefundSuccessTemplate = ({ amount, payment_id, refund_id }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Refund Successful — G-One Media</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            <!-- HEADER -->
            <tr>
              <td style="padding: 32px 40px; background-color: #0f172a; text-align: center;">
                <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff; letter-spacing:-0.5px;">G-One Media</h1>
                <p style="margin:6px 0 0; font-size:14px; color:#94a3b8;">
                  ✦ Refund Successful
                </p>
              </td>
            </tr>
            <!-- CONTENT -->
            <tr>
              <td style="padding: 40px;">
                <h2 style="margin:0 0 20px; font-size:20px; color:#0f172a;">Your refund is complete</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #f1f5f9; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                  <tr>
                    <td width="150" style="font-size:14px; color:#64748b; padding-bottom:12px;">Refunded Amount:</td>
                    <td style="font-size:14px; font-weight:600; color:#06b6d4; padding-bottom:12px;">INR ${amount}</td>
                  </tr>
                  <tr>
                    <td width="150" style="font-size:14px; color:#64748b; padding-bottom:12px;">Original Payment ID:</td>
                    <td style="font-size:14px; font-weight:600; color:#0f172a; padding-bottom:12px;">${payment_id}</td>
                  </tr>
                  <tr>
                    <td width="150" style="font-size:14px; color:#64748b;">Refund Reference ID:</td>
                    <td style="font-size:14px; font-weight:600; color:#0f172a;">${refund_id}</td>
                  </tr>
                </table>
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; margin-bottom:16px;">
                  We are pleased to inform you that your refund has been successfully processed and completed by our system.
                </p>
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; margin-bottom:16px;">
                  Depending on your bank, it may take a short time for the transaction to reflect on your card or bank statement.
                </p>
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6;">
                  If you have any further questions or if we can assist you with other services in the future, please do not hesitate to contact us.
                </p>
              </td>
            </tr>
            <!-- FOOTER -->
            <tr>
              <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px 40px; text-align: center;">
                <p style="margin:0; font-size:13px; color:#64748b;">Best regards,<br/>G-One Media Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`

// ─────────────────────────────────────────────────────────────────────────────
// AI CHAT AGENT EMAIL TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const getChatBookingTemplate = ({ name, email, service, budget, details, type = 'enquiry' }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${type === 'booking' ? 'New Booking' : 'New Enquiry'} via AI Chat — G-One Media</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <!-- HEADER -->
            <tr>
              <td style="padding: 32px 40px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); text-align: center;">
                <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff;">G-One Media</h1>
                <p style="margin:6px 0 0; font-size:14px; color:#94a3b8;">${type === 'booking' ? '🗓️ New Booking Request' : '💬 New Enquiry'} — via AI Chat</p>
              </td>
            </tr>
            <!-- AI CHAT BADGE -->
            <tr>
              <td style="padding: 16px 40px 0; text-align:center;">
                <span style="display:inline-block; background:#f0fdf4; border:1px solid #86efac; color:#16a34a; font-size:12px; font-weight:700; padding:6px 16px; border-radius:99px; letter-spacing:0.05em;">📩 CAPTURED VIA AI CHAT AGENT</span>
              </td>
            </tr>
            <!-- CONTENT -->
            <tr>
              <td style="padding: 32px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                  <tr><td style="padding-bottom:8px;"><p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:600;">Client Details</p></td></tr>
                  <tr>
                    <td style="background-color:#f1f5f9; padding:20px; border-radius:6px; border:1px solid #e2e8f0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="100" style="font-size:14px; color:#64748b; padding-bottom:10px;">Name:</td>
                          <td style="font-size:14px; font-weight:600; color:#0f172a; padding-bottom:10px;">${name}</td>
                        </tr>
                        <tr>
                          <td width="100" style="font-size:14px; color:#64748b; padding-bottom:${service ? '10px' : '0'};">Email:</td>
                          <td style="font-size:14px; font-weight:600; padding-bottom:${service ? '10px' : '0'};"><a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></td>
                        </tr>
                        ${service ? `<tr><td width="100" style="font-size:14px; color:#64748b; padding-bottom:${budget ? '10px' : '0'};">Service:</td><td style="font-size:14px; font-weight:600; color:#06b6d4; padding-bottom:${budget ? '10px' : '0'};">${service}</td></tr>` : ''}
                        ${budget ? `<tr><td width="100" style="font-size:14px; color:#64748b;">Budget:</td><td style="font-size:14px; font-weight:600; color:#0f172a;">${budget}</td></tr>` : ''}
                      </table>
                    </td>
                  </tr>
                </table>
                ${details ? `
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding-bottom:8px;"><p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#64748b; font-weight:600;">${type === 'booking' ? 'Project Details' : 'Message'}</p></td></tr>
                  <tr><td style="padding:20px; border:1px solid #e2e8f0; border-left:4px solid #6366f1; border-radius:4px; background:#ffffff;"><p style="margin:0; font-size:15px; color:#334155; line-height:1.6; white-space:pre-wrap;">${details.replace(/\n/g, '<br/>')}</p></td></tr>
                </table>` : ''}
              </td>
            </tr>
            <!-- ACTION -->
            <tr>
              <td style="padding: 0 40px 40px;" align="center">
                <a href="mailto:${email}?subject=Re: Your ${type === 'booking' ? 'booking' : 'enquiry'} with G-One Media" style="display:inline-block; background:#2563eb; color:#ffffff; font-weight:500; font-size:14px; text-decoration:none; padding:12px 32px; border-radius:6px;">Reply to ${name}</a>
              </td>
            </tr>
            <!-- FOOTER -->
            <tr>
              <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:20px 40px; text-align:center;">
                <p style="margin:0; font-size:12px; color:#94a3b8;">This lead was captured automatically by the G-ONE AI Chat Agent.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`

export const getChatRefundRequestTemplate = ({ name, email, payment_id, reason }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Refund Request (Manual Review) — G-One Media</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #fecaca; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <!-- HEADER -->
            <tr>
              <td style="padding: 32px 40px; background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); text-align: center;">
                <h1 style="margin:0; font-size:24px; font-weight:600; color:#ffffff;">G-One Media</h1>
                <p style="margin:6px 0 0; font-size:14px; color:#fca5a5;">⚠️ Refund Request — Manual Review Required</p>
              </td>
            </tr>
            <!-- WARNING BADGE -->
            <tr>
              <td style="padding: 20px 40px 0; text-align:center;">
                <span style="display:inline-block; background:#fff7ed; border:1px solid #fdba74; color:#c2410c; font-size:12px; font-weight:700; padding:8px 20px; border-radius:6px; letter-spacing:0.05em;">🔒 DO NOT PROCESS AUTOMATICALLY — VERIFY BEFORE ACTIONING</span>
              </td>
            </tr>
            <!-- CONTENT -->
            <tr>
              <td style="padding:32px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px; background:#fef2f2; padding:20px; border-radius:6px; border:1px solid #fecaca;">
                  <tr>
                    <td width="140" style="font-size:14px; color:#64748b; padding-bottom:12px;">Client Name:</td>
                    <td style="font-size:14px; font-weight:600; color:#0f172a; padding-bottom:12px;">${name || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td width="140" style="font-size:14px; color:#64748b; padding-bottom:12px;">Client Email:</td>
                    <td style="font-size:14px; font-weight:600; padding-bottom:12px;"><a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td width="140" style="font-size:14px; color:#64748b; padding-bottom:${reason ? '12px' : '0'};">Payment ID:</td>
                    <td style="font-size:14px; font-weight:700; color:#dc2626; padding-bottom:${reason ? '12px' : '0'}; font-family:monospace;">${payment_id}</td>
                  </tr>
                  ${reason ? `<tr><td width="140" style="font-size:14px; color:#64748b;">Reason:</td><td style="font-size:14px; color:#0f172a; line-height:1.5;">${reason}</td></tr>` : ''}
                </table>
                <p style="margin:0 0 12px; font-size:15px; color:#334155; line-height:1.6;">Please log into the <strong>Razorpay Dashboard</strong> to verify this payment ID and process the refund if approved.</p>
                <p style="margin:0; font-size:13px; color:#64748b; line-height:1.6;">Once actioned, update the status in your Supabase <code>chat_refund_requests</code> table to <strong>'approved'</strong> or <strong>'rejected'</strong>.</p>
              </td>
            </tr>
            <!-- ACTIONS -->
            <tr>
              <td style="padding:0 40px 32px;" align="center">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="padding-right:12px;">
                    <a href="https://dashboard.razorpay.com/app/payments/${payment_id}" target="_blank" style="display:inline-block; background:#2563eb; color:#ffffff; font-weight:600; font-size:14px; text-decoration:none; padding:12px 24px; border-radius:6px;">View in Razorpay →</a>
                  </td>
                  <td>
                    <a href="mailto:${email}?subject=Your Refund Request — G-One Media" style="display:inline-block; background:#f1f5f9; color:#0f172a; font-weight:600; font-size:14px; text-decoration:none; padding:12px 24px; border-radius:6px; border:1px solid #e2e8f0;">Email Client</a>
                  </td>
                </tr></table>
              </td>
            </tr>
            <!-- FOOTER -->
            <tr>
              <td style="background:#fef2f2; border-top:1px solid #fecaca; padding:20px 40px; text-align:center;">
                <p style="margin:0; font-size:12px; color:#94a3b8;">This refund request was submitted via the G-ONE AI Chat Agent and requires manual review.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`
