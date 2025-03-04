// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req: { method: string; body: { to: any; name: any; subject: any; body: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  if (req.method === "POST") {
    const { to, name, subject, body } = req.body;

    const { SMPT_PASSWORD, SMPT_EMAIL } = process.env;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMPT_EMAIL,
        pass: SMPT_PASSWORD,
      },
    });

    try {
      await transport.sendMail({
        from: SMPT_EMAIL,
        to,
        subject,
        html: body,
      });
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}