import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

const CreateSchemaMentor = z.object({
  id: z.coerce.number({
    invalid_type_error: "Debe ser un número",
    message: "Ingrese un ID de mentor",
  }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .min(4, "El nombre debe tener al menos 4 caracteres")

    .regex(/^[a-zA-Z]+$/, { message: "No se permiten numéros" }),
  apellido: z
    .string({ message: "Ingrese un apellido" })
    .min(3, "El apellido debe tener al menos 3 caracteres")

    .regex(/^[a-zA-Z]+$/, { message: "No se permiten numéros" }),
  email: z
    .string({ message: "Ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "El email debe tener al menos 6 caracteres"),
  telefono: z
    .string()
    .min(6, "El telefono debe tener al menos 6 caracteres")
    .regex(/^[0-9]+$/, "No se permiten caracteres"),
  id_empresa: z.coerce.number({
    invalid_type_error: "Seleccione una empresa",
  }),
  tecnologias: z
    .array(z.coerce.number({ invalid_type_error: "Seleccione una tecnología" }))
    .min(1, "Debe seleccionar al menos una tecnología"),
});

const CreateMentor = CreateSchemaMentor.omit({ id: true });

type Mentor = z.infer<typeof CreateSchemaMentor>;

export async function GET(request: Request) {
  try {
    const { rows } = await sql<Mentor[]>`
  SELECT 
    m.id,
    m.nombre,
    m.apellido,
    m.email,
    m.telefono,
    m.estado,
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
    m.id, m.nombre, m.apellido, m.email, m.telefono, m.estado, e.id, e.nombre;
                        `;

    return NextResponse.json(createResponse(true, rows, "Consulta exitosa"), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

export interface MentorInterface {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_empresa: number;
  tecnologias: number[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as MentorInterface;

  const validatedFields = CreateMentor.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error En Algún Campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { nombre, apellido, email, telefono, id_empresa, tecnologias } =
    validatedFields.data;

  try {
    const { rows } = await sql`
    INSERT INTO mentores (nombre, apellido, email, telefono, id_empresa)
    VALUES (${nombre}, ${apellido}, ${email}, ${telefono}, ${id_empresa})
    RETURNING nombre, apellido, email, id_empresa
  `;

    try {
      tecnologias.forEach(async (e) => {
        await sql`INSERT INTO mentores_tecnologias (id_tecnologia, id_mentor)
      VALUES (${e},${rows[0].id})
      `;
      });
    } catch (error) {
      await sql`DELETE FROM mentores_tecnologias WHERE id_mentor = ${rows[0].id}`;
      await sql`DELETE FROM mentores WHERE id_mentor = ${rows[0].id}`;
      throw error;
    }

    return NextResponse.json(createResponse(true, rows, "Se creó el mentor"), {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
