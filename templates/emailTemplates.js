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
                <p style="margin:0; font-size:15px; color:#334155; line-height:1.6;">
                  Please keep this Payment ID for your records. If you are dissatisfied with our service, you can use this ID to request an instant refund on our website within the guarantee period.
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

