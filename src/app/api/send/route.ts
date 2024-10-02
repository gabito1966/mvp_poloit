import {
  EmailServiceFactory,
  EmailServiceType,
} from "@/lib/service/email/EmailsServiceFactory";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchemaMensaje = z.object({
  mensaje: z
    .string({ message: "Ingrese un mensaje" })
    .min(20, "El mensaje debe contener al menos 20 caracteres"),
  tipo: z.string().refine((value) => value === "true" || value === "false", {
    message: "Seleccione un tipo de mensaje del email",
  }),
  session: z.string({ message: "Inicie sesión" }),
});

type MensajeInterface = z.infer<typeof CreateSchemaMensaje>;

// export async function POST(request: Request) {
//   const { mensaje, tipo } = PostSchema.parse(await request.json());
// /******  7c361ec2-91c7-496e-8c36-1833b8bf3b77  *******/

export async function POST(request: Request) {
  const body = (await request.json()) as MensajeInterface;

  const validatedFields = CreateSchemaMensaje.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en algún campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { mensaje, tipo, session } = validatedFields.data;

  try {
    const { rows: resultAdmin } = await sql`SELECT * FROM sesiones WHERE id = ${
      session.split("#")[0]
    }`;

    if (!resultAdmin.length) {
      return NextResponse.json(createResponse(false, [], "Sesión invalida"), {
        status: 500,
      });
    }

    //validat jwt sino lanzar error atributo token

    const emailServiceType = process.env.EMAIL_SERVICE as EmailServiceType;

    if (tipo == "true") {
      //concatenar los datos de mentores y estudiantes de un grupo 
    }

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

    // va a estar en un foreatch
    const { data, error } = await emailService.sendEmail({
      from: "Polo-IT ",
      to: ["nicoespindola899@gmail.com"],//todos de ese grupo si es true, si es false individual a cada uno
      subject: `Acelerador Polo IT`,
      firstName: "",//agregar el nombre del admin
      content: mensaje,
    });

    if (error) {
      throw new Error(error)
    }

    //guardar en la base de datos

    return NextResponse.json(
      createResponse(true, [data], "Email enviado correctamente"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
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
