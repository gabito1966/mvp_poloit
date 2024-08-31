import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

const UpdateMentor = z.object({
  id: z.coerce.number({ invalid_type_error: "debe ser un numero" }),
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(4, "el nombre debe de tener al menos 4 caracteres"),
  apellido: z
    .string({ message: "ingrese un apellido" })
    .min(3, "el apellido debe tener al menos 4 caracter"),
  email: z
    .string({ message: "ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "el email debe tener al menos 6 caracteres"),
  telefono: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  id_empresa: z.coerce.number({
    invalid_type_error: "seleccione una empresa",
  }),
});

type MentorInterface = z.infer<typeof UpdateMentor>;

const GetMentor = z.object({
  id: z.coerce.number({ invalid_type_error: "debe ser un numero" }),
});

export type GetMentorResponse = {
  success: boolean;
  data?: MentorInterface;
  message?: string;
  errors?: [];
};

export async function GET(
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
        "error en algun campo",
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
  } = validatedFields.data;

  try {
    await sql`UPDATE mentores SET nombre = ${nombre}, apellido = ${apellido}, email = ${email}, telefono = ${telefono}, id_empresa = ${id_empresa} WHERE id = ${id_mentor}`;

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
