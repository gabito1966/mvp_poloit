import {
  EmailServiceFactory,
  EmailServiceType,
} from "@/lib/service/email/EmailsServiceFactory";
import { createResponse } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

const PostSchema = z.object({
  mensaje: z.string({message:"Ingrese un mensaje" }).min(20, "El mensaje no puede estar vacio"),
  tipo: z.string().refine((value) => value === "true" || value === "false", {
    message: "Seleccione un tipo",
  }),
});

// export async function POST(request: Request) {
//   const { mensaje, tipo } = PostSchema.parse(await request.json());
// /******  7c361ec2-91c7-496e-8c36-1833b8bf3b77  *******/

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
