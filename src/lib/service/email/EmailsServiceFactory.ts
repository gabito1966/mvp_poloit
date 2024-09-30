import { IEmailService } from './IEmailService';
import { NodemailerService } from './NodemailerService';
import { ResendService } from './ResendService';

export enum EmailServiceType {
  RESEND = 'RESEND',
  NODEMAILER = 'NODEMAILER',
}

export const EmailServiceFactory = (type: EmailServiceType, apiKey: string): IEmailService => {
  switch (type) {
    case EmailServiceType.RESEND:
      return new ResendService(apiKey);
    case EmailServiceType.NODEMAILER:
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        throw new Error('SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are required for NodemailerService');
      }

      return new NodemailerService(smtpHost, smtpPort, smtpUser, smtpPass);
    
    default:
      throw new Error('Unsupported Email Service Type');
  }
};
