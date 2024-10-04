import { JWTValidate } from "@/lib/server/auth";
import {
  EmailServiceFactory,
  EmailServiceType,
} from "@/lib/service/email/EmailsServiceFactory";
import {
  createResponse,
  generateHTMLString,
  getErrorMessageFromCode,
} from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchemaMensaje = z.object({
  mensaje: z
    .string({ message: "Ingrese un mensaje" })
    .min(20, "El mensaje debe contener al menos 20 caracteres"),
  tipo: z.coerce
    .number({
      message: "seleccione tipo",
      invalid_type_error: "seleccione tipo valido",
    })
    .gt(0, { message: "seleccione tipo" }),
  session: z.string({ message: "Inicie sesión" }),
});

type MensajeInterface = z.infer<typeof CreateSchemaMensaje>;

interface sessionJWT{
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  iat:number;
  exp:number;
}

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

    const validateJWT = await JWTValidate(resultAdmin[0].token);

    if(!validateJWT){
      return NextResponse.json(createResponse(false, [], "Sesión invalida"), {
        status: 500,
      });
    }

    const emailServiceType = process.env.EMAIL_SERVICE as EmailServiceType;

    const {rows:resultTipo} = await sql`
      SELECT 
        * 
      FROM 
        tipo_correo 
      WHERE
        id = ${tipo}`;

    // if (tipo == "true") {
    //   //concatenar los datos de mentores y estudiantes de un grupo
    // }
    //conectar con base de datos para obtener el script

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

    const emailBody = generateHTMLString(mensaje, validateJWT.nombre as string ,validateJWT.apellido as string );

      const {rows:resultGrupos} =await sql`
         SELECT 
  e.id,
  e.nombre,
  e.tamano,
  e.fecha_inicio,
  e.fecha_fin,
  ARRAY_AGG(
    json_build_object(
      'id', m.id,
      'nombre', m.nombre,
      'apellido', m.apellido,
      'email', m.email,
      'telefono', m.telefono,
      'rol', 'Mentor'
    )
  ) AS mentores,
  ARRAY_AGG(
    json_build_object(
      'id', muxui.id,
      'nombre', muxui.nombre,
      'apellido', muxui.apellido,
      'email', muxui.email,
      'telefono', muxui.telefono,
      'rol', 'Mentor UX/UI'
    )
  ) AS mentores_ux_ui,
  ARRAY_AGG(
    json_build_object(
      'id', mqa.id,
      'nombre', mqa.nombre,
      'apellido', mqa.apellido,
      'email', mqa.email,
      'telefono', mqa.telefono,
      'rol', 'Mentor QA'
    )
  ) AS mentores_qa,
  ARRAY_AGG(s.nombre) AS nombres_estudiantes,
  ARRAY_AGG(s.apellido) AS apellidos_estudiantes,
  ARRAY_AGG(s.email) AS emails_estudiantes,
  ARRAY_AGG(s.telefono) AS telefonos_estudiantes,
  ARRAY_AGG(s.estado) AS estados_estudiantes,
  ARRAY_AGG(t.nombre) AS tecnologias,
  ARRAY_AGG(o.nombre) AS ongs
FROM 
  equipos e
  LEFT JOIN 
    mentores m ON e.id_mentor = m.id
  LEFT JOIN 
    mentores muxui ON e.id_mentor_ux_ui = muxui.id
  LEFT JOIN 
    mentores mqa ON e.id_mentor_qa = mqa.id
  LEFT JOIN 
    equipos_estudiantes ces ON e.id = ces.id_equipo
  LEFT JOIN 
    estudiantes s ON ces.id_estudiante = s.id
  LEFT JOIN 
    estudiantes_tecnologias est ON s.id = est.id_estudiante
  LEFT JOIN 
    tecnologias t ON est.id_tecnologia = t.id
  LEFT JOIN 
    ongs o ON s.id_ong = o.id
GROUP BY 
  e.id, m.id, muxui.id, mqa.id
            `

    console.log(resultGrupos);
    console.log(resultGrupos[0]);

    // va a estar en un foreatch
    const { data, error } = await emailService.sendEmail({
      from: "Polo-IT ",
      to: ["nicoespindola899@gmail.com"], //todos de ese grupo si es true, si es false individual a cada uno
      subject: `Acelerador Polo IT - ${resultTipo[0].tipo}`,
      content: emailBody,
    });

    if (error) {
      throw new Error(error);
    }

    //guardar en la base de datos

    revalidatePath("/mensaje");

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
      return NextResponse.json(
        createResponse(false, [], getErrorMessageFromCode(error)),
        { status: 500 }
      );
    }
    return NextResponse.json(
      createResponse(true, data, "Historial de Emails"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
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
