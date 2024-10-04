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
  m.id AS id_mentor,
  m.nombre AS nombre_mentor,
  m.apellido AS apellido_mentor,
  m.email AS email_mentor,
  m.telefono AS telefono_mentor,
  muxui.id AS id_mentor_ux_ui,
  muxui.nombre AS nombre_mentor_ux_ui,
  muxui.apellido AS apellido_mentor_ux_ui,
  muxui.email AS email_mentor_ux_ui,
  muxui.telefono AS telefono_mentor_ux_ui,
  mqa.id AS id_mentor_qa,
  mqa.nombre AS nombre_mentor_qa,
  mqa.apellido AS apellido_mentor_qa,
  mqa.email AS email_mentor_qa,
  mqa.telefono AS telefono_mentor_qa,
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
            
    resultGrupos.map(async (e,i)=>{
      let tablaGrupos:string = "";
      
      tablaGrupos += `
        <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">Nombre</th>
      <th style="padding: 8px;">Apellido</th>
      <th style="padding: 8px;">Email</th>
      <th style="padding: 8px;">Teléfono</th>
      <th style="padding: 8px;">Estado</th>
      <th style="padding: 8px;">Tecnología</th>
      <th style="padding: 8px;">ONG</th>
    </tr>
  </thead>
  <tbody>
    ${e.nombres_estudiantes.map((nombre:string, index:number) => `
      <tr>
        <td style="padding: 8px;">${nombre}</td>
        <td style="padding: 8px;">${e.apellidos_estudiantes[index]}</td>
        <td style="padding: 8px;">${e.emails_estudiantes[index]}</td>
        <td style="padding: 8px;">${e.telefonos_estudiantes[index]}</td>
        <td style="padding: 8px;">${e.estados_estudiantes[index] ? 'Activo' : 'Inactivo'}</td>
        <td style="padding: 8px;">${e.tecnologias[index]}</td>
        <td style="padding: 8px;">${e.ongs[index]}</td>
      </tr>
    `).join('')}
  </tbody>
</table>
      <br>
      ` 

      tablaGrupos +=`
        <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">Nombre</th>
      <th style="padding: 8px;">Apellido</th>
      <th style="padding: 8px;">Email</th>
      <th style="padding: 8px;">Teléfono</th>
      <th style="padding: 8px;">Rol</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">${e.nombre_mentor}</td>
      <td style="padding: 8px;">${e.apellido_mentor}</td>
      <td style="padding: 8px;">${e.email_mentor}</td>
      <td style="padding: 8px;">${e.telefono_mentor}</td>
      <td style="padding: 8px;">Mentor Técnico</td>
    </tr>
    <tr>
      <td style="padding: 8px;">${e.nombre_mentor_ux_ui}</td>
      <td style="padding: 8px;">${e.apellido_mentor_ux_ui}</td>
      <td style="padding: 8px;">${e.email_mentor_ux_ui}</td>
      <td style="padding: 8px;">${e.telefono_mentor_ux_ui}</td>
      <td style="padding: 8px;">Mentor UX/UI</td>
    </tr>
    <tr>
      <td style="padding: 8px;">${e.nombre_mentor_qa}</td>
      <td style="padding: 8px;">${e.apellido_mentor_qa}</td>
      <td style="padding: 8px;">${e.email_mentor_qa}</td>
      <td style="padding: 8px;">${e.telefono_mentor_qa}</td>
      <td style="padding: 8px;">Mentor QA</td>
    </tr>
  </tbody>
</table>
      `
      const { data, error } = await emailService.sendEmail({
        from: "Polo-IT ",
        to: ["nicoespindola899@gmail.com"], //todos de ese grupo si es true, si es false individual a cada uno
        subject: `Acelerador Polo IT - ${resultTipo[0].tipo}`,
        content: emailBody+tablaGrupos,
      });
  
      if (error) {
        throw new Error(error);
      }
      tablaGrupos = "";
    })
    
    //ver de la caoncatenacion que sea en el medio xd;



    //guardar en la base de datos

    revalidatePath("/mensaje");

    return NextResponse.json(
      createResponse(true, [], "Email enviado correctamente"),
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
