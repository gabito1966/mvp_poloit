// src/services/email/ResendService.ts

import { IEmailService, EmailOptions } from './IEmailService';
import { Resend } from 'resend';

export class ResendService implements IEmailService {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendEmail(options: EmailOptions) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: options.from,
        to: options.to,
        subject: options.subject,
        react: options.template,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getEmail(emailId: string) {
    try {
      const { data, error } = await this.resend.emails.get(emailId);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  async deleteEmail(emailId: string) {
    try {
      const { data, error } = await this.resend.delete(emailId);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}
