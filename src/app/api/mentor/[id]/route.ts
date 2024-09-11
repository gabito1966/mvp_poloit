import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const UpdateMentor = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
  nombre: z
    .string({ message: "Ingrese un nombre" }).trim()
    .min(3, "El nombre debe de tener al menos 3 caracteres")
    .max(25, "El nombre debe de tener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, { message: "No se permiten numéros o símbolos"}),
  apellido: z
    .string({ message: "Ingrese un apellido" }).trim()
    .min(3, "El apellido debe tener al menos e caracter")
    .max(25, "El apellido debe tener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, { message: "No se permiten numéros o símbolos"}),
  email: z
    .string({ message: "Ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "El email debe tener al menos 6 caracteres"),
  telefono: z
    .string({ message: "Ingrese un teléfono" }).trim()
    .min(6, "El teléfono debe tener al menos 6 números")
    .max(20, "El teléfono debe tener menos de 20 números")
    .regex(/^[0-9]+$/, "No se permiten caracteres"),
  id_empresa: z.coerce.number({
    invalid_type_error: "Seleccione una empresa",
  }),
  tecnologias: z
    .array(z.coerce.number({ invalid_type_error: "Seleccione una tecnología" }))
    .min(1, "Debe seleccionar al menos una tecnología"),
});

type MentorInterface = z.infer<typeof UpdateMentor>;

const GetMentor = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "Debe proporcionar el id del mentor"),
      { status: 400 }
    );
  }

  const validatedFields = GetMentor.safeParse({
    id: id,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "error en algun campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { id: idMentor } = validatedFields.data;

  try {
    const { rows } = await sql<MentorInterface>`SELECT 
      m.id ,
      m.nombre ,
      m.apellido ,
      m.email,
      m.telefono,
      m.estado ,
      e.id AS id_empresa,
      e.nombre AS nombre_empresa,
      ARRAY_AGG(t.nombre) AS tecnologias
    FROM 
      mentores m
    LEFT JOIN 
      mentores_tecnologias mt ON m.id = mt.id_mentor
    LEFT JOIN 
      tecnologias t ON mt.id_tecnologia = t.id
    LEFT JOIN 
      empresas e ON m.id_empresa = e.id
    GROUP BY 
      m.id, m.nombre, m.apellido, m.email, m.telefono, m.estado, e.id, e.nombre
    HAVING 
      m.id = ${idMentor};`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "El mentor no existe"),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createResponse(true, rows[0], "consulta exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "Debe proporcionar un ID del mentor"),
      { status: 400 }
    );
  }

  const body = (await request.json()) as MentorInterface;

  const validatedFields = UpdateMentor.safeParse({
    ...body,
    id: id,
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

  const {
    id: id_mentor,
    nombre,
    apellido,
    email,
    telefono,
    id_empresa,
    tecnologias,
  } = validatedFields.data;

  try {
    await sql`UPDATE mentores SET nombre = ${nombre}, apellido = ${apellido}, email = ${email}, telefono = ${telefono}, id_empresa = ${id_empresa} WHERE id = ${id_mentor}`;

    await sql`DELETE FROM mentores_tecnologias WHERE id_mentor = ${id_mentor}`;

    for (const tecnologia of tecnologias) {
      await sql`INSERT INTO mentores_tecnologias (id_mentor, id_tecnologia) VALUES (${id_mentor}, ${tecnologia})`;
    }

    revalidatePath("/mentor");
    return NextResponse.json(
      createResponse(true, [], "Actualización del mentor exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], "Error en la base de datos"),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "debe proporcionar el id del mentor"),
      { status: 400 }
    );
  }

  try {
    await sql`UPDATE mentores SET estado = false WHERE id = ${id}`;

    return NextResponse.json(
      createResponse(true, [], "Eliminación del mentor exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
