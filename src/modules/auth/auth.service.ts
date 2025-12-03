import { Result } from "../../core/result.js";
import { sendMail } from "../../core/mail/sendgrid.js";
import type { User } from "../../models/models.js";
import { UserModel, PendingUserModel } from "../../models/models.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export class AuthService {
  async register(data: { name: string, age: number, password: string, grade: number, email: string }): Promise<Result<{ email: string }>> {
    const existingUName = await UserModel.findOne({ name: data.name });
    const existingUEmail = await UserModel.findOne({ email: data.email });
    if (existingUName || existingUEmail) return Result.fail("This user already exists", 409, "CONFLICT");
    
    const existingPName = await PendingUserModel.findOne({ name: data.name });
    const existingPEmail = await PendingUserModel.findOne({ email: data.email });
    if (existingPName || existingPEmail) return Result.fail("This user already pending", 409, "CONFLICT");
    
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const token = crypto.randomBytes(5).toString("hex");
      const result = await sendMail({ to: data.email, subject: "Verify your StudyPilot email", text: `
StudyPilot – Confirm Your Email

Welcome to StudyPilot — your learning journey starts now!

Hello ${data.name},

To complete your registration, please use the verification code below:

${token}

This code is valid for a limited time only.

If you didn’t sign up for StudyPilot, you can safely ignore this email.

What is StudyPilot?
StudyPilot helps you organize your studies, create subjects, track your learning progress, and stay consistent on your educational journey.

© ${new Date().getFullYear()} StudyPilot. All rights reserved.`, 
  html: `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0; background-color: #f4f4f7;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyPilot – Email Verification</title>
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
                <img src="https://raw.githubusercontent.com/DenylsonMiguel/StudyPilot/main/public/images/StudyPilotFullLogo.png" alt="StudyPilot Logo" width="64" style="margin-bottom: 12px;" />
                <h1 style="margin: 0; font-size: 22px;">Confirm Your Email</h1>
                <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">
                  Welcome to StudyPilot — your journey starts now!
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 28px 24px; color: #333;">
                
                <p style="font-size: 15px; margin-bottom: 18px;">
                  Hello <strong>${data.name}</strong>,
                </p>

                <p style="font-size: 15px; margin-bottom: 20px;">
                  To complete your registration, use the verification code below:
                </p>

                <!-- Verification Code -->
                <div style="text-align: center; margin: 28px 0;">
                  <div style="display: inline-block; background: #4a6df0; color: white; padding: 14px 28px; font-size: 18px; border-radius: 8px; letter-spacing: 2px; font-weight: bold;">
                    ${token}
                  </div>
                </div>

                <p style="font-size: 14px; margin-bottom: 16px;">
                  This code is valid for a limited time. If you did not request an account on StudyPilot, you can safely ignore this email.
                </p>

                <hr style="border: none; border-top: 1px solid #ddd; margin: 26px 0;" />

                <!-- About StudyPilot -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 14px; color: #555;">
                      <strong>What is StudyPilot?</strong><br/>
                      StudyPilot helps you organize your studies, create subjects, track learning progress, and stay consistent on your educational journey.
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
</html>` });
      
      if (!result.success) {
        console.error("Error on sending email: " + result.error);
        return Result.fail("Internal server error", 500, "SERVER_ERROR");
      }
      
      const user = new PendingUserModel({ name: data.name, password: hashedPassword, token, email: data.email, age: data.age, grade: data.grade});
      await user.save();
      
      return Result.ok({ email: user.email }, 202);
    } catch (err) {
      console.error("Error on create pending user: " + err);
      return Result.fail("Internal server error", 500, "SERVER_ERROR");
    }
  }
}