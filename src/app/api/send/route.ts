// src/pages/api/email.ts

import { EmailTemplate } from '@/components/email/email-template';
import { EmailServiceFactory, EmailServiceType } from '@/lib/service/email/EmailsServiceFactory';
import { NextResponse } from "next/server";



const emailService = EmailServiceFactory(
  process.env.EMAIL_SERVICE as EmailServiceType,
  process.env.RESEND_API_KEY || '' // Puedes manejar múltiples claves según el servicio
);

export async function POST(request: Request) {
  const { bodyEmail, tipo } = await request.json();

  try {
    const { data, error } = await emailService.sendEmail({
      from: 'Polo-IT <onboarding@resend.dev>',
      to: ['espindolajavier2013@gmail.com'],
      subject: `Acelerador Polo IT - squad 1`,
      template: EmailTemplate({ firstName: 'John', content: bodyEmail }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const emailId = "1b4a6a3b-ad3f-40ed-80ac-3ed3e36fec34"; // Esto debería venir de algún parámetro o lógica
    const { data, error } = await emailService.getEmail(emailId);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const emailId = "ee8c22ab-383b-4f5a-8e26-86ed7b9c15ac"; // Esto debería venir de algún parámetro o lógica
    const { data, error } = await emailService.deleteEmail(emailId);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
