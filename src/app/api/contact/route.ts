import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Path to the email count file
const filePath = path.join(process.cwd(), "emailCounter.json");

// Ensure the file exists with initial values
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ count: 0, date: new Date().toISOString().split("T")[0] }));
}

// Function to get and reset the email count if a new day has started
const getEmailCount = () => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const today = new Date().toISOString().split("T")[0];

  if (data.date !== today) {
    const newData = { count: 0, date: today };
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return newData;
  }

  return data;
};

// Function to update the email count
const updateEmailCount = (newCount: number) => {
  const data = { count: newCount, date: new Date().toISOString().split("T")[0] };
  fs.writeFileSync(filePath, JSON.stringify(data));
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, question } = body;

    const { count } = getEmailCount();

    if (count >= 20) {
      return NextResponse.json(
        { success: false, message: "Daily email limit reached (20 emails per day)." },
        { status: 429 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nQuestion: ${question}`,
    };

    await transporter.sendMail(mailOptions);
    updateEmailCount(count + 1);

    return NextResponse.json({ success: true, message: "Email sent successfully!", remaining: 19 - count });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}