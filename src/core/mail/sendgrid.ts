import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) 
  throw new Error("SENDGRID_API_KEY not found in ambiance variables");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(config: { to: string, subject: string, text: string, html?: string }): Promise<{ success: boolean, error?: string }> {
  const msg = {
    to: config.to,
    from: "StudyPilotOfficial@outlook.com",
    subject: config.subject,
    text: config.text,
    html: config.html ?? config.text,
  };
  
  const result = await sgMail
  .send(msg)
  .then((): { success: boolean; error?: string } => ({ success: true }))
  .catch((err): { success: boolean; error?: string } => ({ success: false, error: err }));
  
  return result;
}