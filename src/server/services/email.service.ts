// import { MailtrapClient, type Address } from "mailtrap";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import type { IUser } from "../models/User.model.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./email.templates.js";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
config();

// const TOKEN = process.env.MAILTRAP_API_KEY!;
// const mail_trap_client = new MailtrapClient({
//   token: TOKEN,
// });

// const sender = {
//   email: "hello@demomailtrap.co",
//   name: "Mailtrap Test",
// };

/**
 * switching from mailtrap to nodemailer + gmail because
 * my dumbass maxed out on their testing domain 💀
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

const send_email_callback = (
  err: Error | null,
  info: SMTPTransport.SentMessageInfo,
) => {
  if (err) {
    console.error("email sending error ", err);
  } else {
    console.info("email sent successfully ", info);
  }
};

export async function send_verification_email(user: IUser, raw_token: string) {
  const mail_options = {
    from: process.env.GMAIL_USER!,
    subject: "verify email",
    to: user.email,
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", raw_token)
      .replace("{name}", user.name)
      .replace(
        "{token_expire_date}",
        user.verification_token_expire_at!.toISOString(),
      ),
  };
  try {
    transporter.sendMail(mail_options, send_email_callback);
  } catch (error) {
    console.error("email verification error " + error);
    throw new Error("email verification error " + error);
  }
}

export async function send_welcome_email(user: IUser) {
  try {
    const email_options = {
      from: process.env.GMAIL_USER!,
      to: user.email,
      subject: "welcome to our app !",
      html: `<h1>Welcome to our app, ${user.name}!</h1>
      <p>We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p>
      <p>Best regards,<br/>The Team</p>`,
    };
    transporter.sendMail(email_options, send_email_callback);
    return;
  } catch (error) {
    console.error("welcome email error " + error);
    throw new Error("welcome email error " + error);
  }
}
