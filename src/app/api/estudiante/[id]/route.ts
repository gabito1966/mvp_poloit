import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateEstudiante = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .min(4, "El nombre debe de tener al menos 4 caracteres")
    .regex(/^[a-zA-Z]+$/, { message: "No se permiten numéros o símbolos" }),
  apellido: z
    .string({ message: "Ingrese un apellido" })
    .min(3, "El apellido debe tener al menos 4 caracter")
    .regex(/^[a-zA-Z]+$/, { message: "No se permiten numéros o símbolos" }),
  email: z
    .string({ message: "Ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "El email debe tener al menos 6 caracteres"),
  telefono: z
    .string({ message: "Ingrese un telefono" })
    .min(6, "El telefono debe tener al menos 6 caracteres")
    .regex(/^[0-9]+$/, "No se permiten caracteres"),
  id_ong: z.coerce.number({
    invalid_type_error: "Seleccione una organización",
  }),
  tecnologias: z
    .array(z.coerce.number({ invalid_type_error: "Seleccione una tecnologia" }))
    .min(1, "Debe seleccionar al menos una tecnología"),
});

type EstudianteInterface = z.infer<typeof UpdateEstudiante>;

const GetEstudiante = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numéro" }),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "Debe proporcionar el ID del estudiante"),
      { status: 400 }
    );
  }

  const validatedFields = GetEstudiante.safeParse({
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

  const { id: idEstudiante } = validatedFields.data;

  try {
    const { rows } = await sql<EstudianteInterface>`SELECT 
      s.id,
      s.nombre ,
      s.apellido ,
      s.email ,
      s.telefono ,
      s.estado ,
      o.id AS id_ong,
      o.nombre AS nombre_ong,
      ARRAY_AGG(t.nombre) AS tecnologias
    FROM 
      estudiantes s
    LEFT JOIN 
      estudiantes_tecnologias st ON s.id = st.id_estudiante
    LEFT JOIN 
      tecnologias t ON st.id_tecnologia = t.id
    LEFT JOIN 
      ongs o ON s.id_ong = o.id
    GROUP BY 
      s.id, s.nombre, s.apellido, s.email, s.telefono, s.estado, o.id, o.nombre
    HAVING 
      s.id =${idEstudiante};`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "El estudiante no existe"),
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
      createResponse(false, [], "Debe proporcionar un ID del estudiante"),
      { status: 400 }
    );
  }

  const body = (await request.json()) as EstudianteInterface;

  const validatedFields = UpdateEstudiante.safeParse({
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
    id: id_estudiante,
    nombre,
    apellido,
    email,
    telefono,
    id_ong,
    tecnologias,
  } = validatedFields.data;
 
  try {
    await sql`UPDATE estudiantes SET nombre = ${nombre}, apellido = ${apellido}, email = ${email}, telefono = ${telefono}, id_ong = ${id_ong} WHERE id = ${id_estudiante}`;

    await sql`DELETE FROM estudiantes_tecnologias WHERE id_estudiante = ${id_estudiante}`;

    for (const tecnologia of tecnologias) {
      await sql`INSERT INTO estudiantes_tecnologias (id_estudiante, id_tecnologia) VALUES (${id_estudiante}, ${tecnologia})`;
    }

    revalidatePath("/estudiante");
    return NextResponse.json(
      createResponse(true, [], "Actualización del estudiante exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
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
      createResponse(false, [], "debe proporcionar el id del estudiante"),
      { status: 400 }
    );
  }

  try {
    await sql`UPDATE estudiantes SET estado = false WHERE id = ${id}`;

    return NextResponse.json(
      createResponse(true, [], "Eliminación del estudiante exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
