import { createTransport } from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

export type SendMailProperties = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: SendMailProperties) => {
  if (
    !process.env.MAILER_SENDER_EMAIL ||
    !process.env.MAILER_SMTP_HOST ||
    !process.env.MAILER_SMTP_USER ||
    !process.env.MAILER_SMTP_PASSWORD
  ) {
    throw new Error('Missing one of env variables for mailing functionality');
  }
  try {
    const transporter = createTransport({
      host: process.env.MAILER_SMTP_HOST,
      port: 465,
      secure: true,
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.MAILER_SMTP_USER,
        pass: process.env.MAILER_SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAILER_SENDER_EMAIL,
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    return error;
  }
};
