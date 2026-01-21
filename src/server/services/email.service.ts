import { MailtrapClient, type Address } from "mailtrap";
import { config } from "dotenv";
import type { IUser } from "../models/User.model.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./email.templates.js";
config();
const TOKEN = process.env.MAILTRAP_API_KEY!;
const mail_trap_client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

export async function send_verification_email(user: IUser, raw_token: string) {
  try {
    const response = await mail_trap_client.send({
      from: sender,
      subject: "verify email",
      to: [{ email: user.email, name: user.name }],
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", raw_token)
        .replace("{name}", user.name)
        .replace(
          "{token_expire_date}",
          user.verification_token_expire_at!.toISOString(),
        ),
      category: "Email Verification",
    });
    if (response.success) {
      console.log(
        `email sent successfully ! message id : ${response.message_ids}`,
      );
      return;
    }
    console.error(`email wasn't sent ! message id : ${response.message_ids}`);
    return;
  } catch (error) {
    console.error("email verification error " + error);
    throw new Error("email verification error " + error);
  }
}

export async function send_welcome_email(user: IUser) {
  try {
    const response = await mail_trap_client.send({
      from: sender,
      to: [{ email: user.email, name: user.name }],
      template_uuid: "073fb681-9f29-44a3-8a67-8238f404fbdf",
      template_variables: {
        "company_info_name": "auth app",
        "name": user.name,
      },

    });
    if (response.success) {
      console.log(
        `welcome email sent successfully ! message id : ${response.message_ids}`,
      );
      return;
    }
    console.error(
      `welcome email wasn't sent !`,
    );
    return;
  } catch (error) {
    console.error("welcome email error " + error);
    throw new Error("welcome email error " + error);
  }
}
