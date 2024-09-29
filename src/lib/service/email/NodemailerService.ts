// src/services/email/NodemailerService.ts

import nodemailer, { Transporter } from 'nodemailer';
import { IEmailService, EmailOptions } from './IEmailService';
import { renderTemplate } from '@/lib/renderTemplate';

export class NodemailerService implements IEmailService {
  private transporter: Transporter;

  constructor(smtpHost: string, smtpPort: number, smtpUser: string, smtpPass: string) {
    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true para puerto 465, false para otros puertos
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendEmail(options: EmailOptions) {
    try {
      const htmlContent = renderTemplate(options.template);

      const mailOptions = {
        from: options.from,
        to: options.to.join(', '),
        subject: options.subject,
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { data: info, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getEmail(emailId: string) {
    // Nodemailer no proporciona una API para obtener correos enviados de forma directa.
    return { data: null, error: 'Not implemented' };
  }

  async deleteEmail(emailId: string) {
    // Similar a getEmail, depende de la funcionalidad de la librería
    return { data: null, error: 'Not implemented' };
  }
}
