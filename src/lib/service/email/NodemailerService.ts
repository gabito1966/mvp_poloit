import nodemailer, { Transporter } from "nodemailer";
import { IEmailService, EmailOptions } from "./IEmailService";

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
      const messageArr = options.content.split("\n");

      console.log(options.content);
      console.log(messageArr);

      let mensaje: string = `<div>
            <h1>Welcome, ${options.firstName}!</h1>`;

      messageArr.forEach((e, i) => {
        mensaje += (e!='')? `<p>${e}</p>`:`</br>`;
      });

      mensaje += `<p>Saludos,<br />Equipo Polo IT</p>
          </div>`;

      console.log(mensaje);

      const mailOptions = {
        from: options.from,
        to: options.to.join(", "),
        subject: options.subject,
        html: mensaje,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { data: info, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getEmail(emailId: string) {
    return { data: null, error: "Not implemented" };
  }

  async deleteEmail(emailId: string) {
    return { data: null, error: "Not implemented" };
  }
}
