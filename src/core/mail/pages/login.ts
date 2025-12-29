export function page(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0; background-color: #f4f4f7;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyPilot – New Login Detected</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 24px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 450px; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background: #4a6df0; padding: 32px 20px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 22px;">New Login Detected</h1>
                <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">
                  We noticed a new sign-in to your account
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 28px 24px; color: #333;">
                
                <p style="font-size: 15px; margin-bottom: 18px;">
                  Hello <strong>${name}</strong>,
                </p>

                <p style="font-size: 15px; margin-bottom: 20px;">
                  A new login to your StudyPilot account was detected.
                </p>

                <p style="font-size: 14px; margin-bottom: 20px; color: #444;">
                  <strong>If this was you</strong>, no action is required — you can safely ignore this email.
                </p>

                <p style="font-size: 14px; margin-bottom: 20px; color: #b00020;">
                  <strong>If this wasn’t you</strong>, we strongly recommend that you take action immediately:
                </p>

                <ul style="font-size: 14px; color: #444; padding-left: 18px; margin-bottom: 22px;">
                  <li>Change your account password</li>
                  <li>Enable two-factor authentication (2FA)</li>
                  <li>Review recent account activity</li>
                </ul>

                <hr style="border: none; border-top: 1px solid #ddd; margin: 26px 0;" />

                <!-- Security Tip -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 14px; color: #555;">
                      <strong>Security Tip</strong><br/>
                      Using a strong, unique password and enabling two-factor authentication greatly improves the protection of your account.
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background: #f0f0f5; padding: 16px 20px; text-align: center; font-size: 12px; color: #777;">
                <p style="margin: 0;">© ${new Date().getFullYear()} StudyPilot. All rights reserved.</p>
                <p style="margin: 8px 0 0;">
                  <a href="" style="color: #4a6df0; text-decoration: none;">Visit our website</a>
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
`
}

export function text(name: string): string {
  return `
Hello ${name},

A new login to your StudyPilot account was detected.

If this was you, no action is required.

If you do not recognize this login, please take action immediately:
- Change your account password
- Enable two-factor authentication (2FA)
- Review your recent account activity

Keeping your account secure helps protect your data.

StudyPilot Security Team
  `
}