// src/services/email/EmailServiceFactory.ts

import { IEmailService } from './IEmailService';
import { ResendService } from './ResendService';
// Importa otras implementaciones cuando las tengas

export enum EmailServiceType {
  RESEND = 'RESEND',
  // Otras opciones como SENDGRID, MAILGUN, etc.
}

export const EmailServiceFactory = (type: EmailServiceType, apiKey: string): IEmailService => {
  switch (type) {
    case EmailServiceType.RESEND:
      return new ResendService(apiKey);
    // case EmailServiceType.SENDGRID:
    //   return new SendGridService(apiKey);
    // case EmailServiceType.MAILGUN:
    //   return new MailgunService(apiKey);
    default:
      throw new Error('Unsupported Email Service Type');
  }
};
