import {
  EmailServiceFactory,
  EmailServiceType,
} from "@/lib/service/email/EmailsServiceFactory";
import { createResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { mensaje, tipo } = await request.json();

  const emailServiceType = process.env.EMAIL_SERVICE as EmailServiceType;
 
  let apiKey = "";
  switch (emailServiceType) {
    case EmailServiceType.RESEND:
      apiKey = process.env.RESEND_API_KEY || "";
      break;
    case EmailServiceType.NODEMAILER:
      apiKey = ""; 
      break;
    default:
      throw new Error("Unsupported Email Service Type");
  }

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
      apiKey = "";
      break;
    default:
      throw new Error("Unsupported Email Service Type");
  }

  const emailService = EmailServiceFactory(emailServiceType, apiKey);

  try {
    
    const { data, error } = await emailService.getEmail("");

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
      apiKey = ""; 
      break;
    default:
      throw new Error("Unsupported Email Service Type");
  }

  const emailService = EmailServiceFactory(emailServiceType, apiKey);

  try {
    
    const { data, error } = await emailService.deleteEmail("");

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
