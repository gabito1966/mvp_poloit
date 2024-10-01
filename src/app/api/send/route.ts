import {
  EmailServiceFactory,
  EmailServiceType,
} from "@/lib/service/email/EmailsServiceFactory";
import { createResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { mensaje, tipo } = await request.json();

  // Determinar el tipo de servicio de correo a utilizar
  const emailServiceType = process.env.EMAIL_SERVICE as EmailServiceType;

  // Determinar el apiKey correspondiente
  let apiKey = "";
  switch (emailServiceType) {
    case EmailServiceType.RESEND:
      apiKey = process.env.RESEND_API_KEY || "";
      break;
    case EmailServiceType.NODEMAILER:
      apiKey = ""; // Nodemailer no usa apiKey, las configuraciones se obtienen de process.env
      break;
    default:
      throw new Error("Unsupported Email Service Type");
  }

  // Instanciar el servicio de correo
  const emailService = EmailServiceFactory(emailServiceType, apiKey);

  try {
    const { data, error } = await emailService.sendEmail({
      from: "Polo-IT ",
      to: ["nicoespindola899@gmail.com"],
      subject: `Acelerador Polo IT`,
      firstName: "",
      content: mensaje,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      createResponse(true, [data], "email enviado correctamente"),
      {status:200}
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  const emailServiceType = process.env.EMAIL_SERVICE as EmailServiceType;

  let apiKey = "";
  switch (emailServiceType) {
    case EmailServiceType.RESEND:
      apiKey = process.env.RESEND_API_KEY || "";
      break;
    case EmailServiceType.NODEMAILER:
      apiKey = ""; // Nodemailer no usa apiKey
      break;
    default:
      throw new Error("Unsupported Email Service Type");
  }

  const emailService = EmailServiceFactory(emailServiceType, apiKey);

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
  const emailServiceType = process.env.EMAIL_SERVICE as EmailServiceType;

  let apiKey = "";
  switch (emailServiceType) {
    case EmailServiceType.RESEND:
      apiKey = process.env.RESEND_API_KEY || "";
      break;

    case EmailServiceType.NODEMAILER:
      apiKey = ""; // Nodemailer no usa apiKey
      break;
    default:
      throw new Error("Unsupported Email Service Type");
  }

  const emailService = EmailServiceFactory(emailServiceType, apiKey);

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
