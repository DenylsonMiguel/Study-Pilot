export function page(name: string): string {
return `
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0; background-color: #f4f4f7;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyPilot – Account Created</title>
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
                <h1 style="margin: 0; font-size: 22px;">Account Created Successfully</h1>
                <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">
                  Welcome to StudyPilot — let’s build your learning journey!
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
                  Your account has been successfully created. We’re excited to have you onboard!  
                </p>

                <p style="font-size: 14px; margin-bottom: 16px;">
                  If you didn’t create an account with StudyPilot, please ignore this email.
                </p>

                <hr style="border: none; border-top: 1px solid #ddd; margin: 26px 0;" />

                <!-- About StudyPilot -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 14px; color: #555;">
                      <strong>Why StudyPilot?</strong><br/>
                      Organize your subjects, track your progress, create study plans, and stay consistent with your goals.
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

Your StudyPilot account has been successfully created!

If you did not create an account on StudyPilot, please ignore this email.
  `
}