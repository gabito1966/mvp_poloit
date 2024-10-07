import nodemailer, { Transporter } from "nodemailer";
import { IEmailService, EmailOptions } from "./IEmailService";
import { sql } from "@vercel/postgres";

export class NodemailerService implements IEmailService {
  private transporter: Transporter;

  constructor(
    smtpHost: string,
    smtpPort: number,
    smtpUser: string,
    smtpPass: string
  ) {
    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendEmail(options: EmailOptions) {
    try {
      const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.content,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { data: info, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getEmail(emailId: string) {


    try {
      
      const {rows:resultEmails} = await sql`

      `

      return { data: resultEmails[0], error: "Not implemented" };
      
    } catch (error) {
      
      return { data:null, error: error };
    }


  }

  async deleteEmail(emailId: string) {
    return { data: null, error: "Not implemented" };
  }
}
