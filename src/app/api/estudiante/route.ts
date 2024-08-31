import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const { rows } = await sql`
    SELECT 
    s.id,
    s.nombre,
    s.apellido,
    s.email,
    s.telefono,
    s.estado,
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
    s.id, s.nombre, s.apellido, s.email, s.telefono, s.estado, o.id;
`;

    return NextResponse.json(createResponse(true, rows, "Consulta Exitosa"), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

interface EstudianteInterface {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: boolean;
  id_ong: number;
  tecnologias: number[];
}

type Estudiante = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: boolean;
  id_ong: number;
};

interface EstudianteResponse {
  success: boolean;
  errors?: [];
  data?: [];
  message?: string;
}

const CreateSchemaEstudiante = z.object({
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(4, "el nombre debe de tener al menos 4 caracteres"),
  apellido: z
    .string({ message: "ingrese un apellido" })
    .min(3, "el apellido debe tener al menos 3 caracter"),
  email: z
    .string({ message: "ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "el email debe tener al menos 6 caracteres"),
  telefono: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  id_ong: z.coerce.number({
    invalid_type_error: "seleccione una organización",
  }),
  tecnologias: z
    .array(z.coerce.number({ invalid_type_error: "seleccione una tecnologia" }))
    .min(1, "Debe seleccionar al menos una tecnología"),
});

const CreateEstudiante = CreateSchemaEstudiante.omit({});

export async function POST(request: Request) {
  const body = (await request.json()) as EstudianteInterface;

  const validatedFields = CreateEstudiante.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error En Algun Campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { nombre, apellido, email, telefono, id_ong, tecnologias } =
    validatedFields.data;

  try {
    const { rows } =
      await sql`INSERT INTO estudiantes ( nombre, apellido, email, telefono, id_ong ) VALUES
     (${nombre},${apellido}, ${email}, ${telefono}, ${id_ong}) RETURNING *`;

    try {
      tecnologias.forEach(async (e) => {
        await sql`INSERT INTO estudiantes_tecnologias (id_tecnologia, id_estudiante)
        VALUES (${e},${rows[0].id})
        `;
      });
    } catch (error) {
      await sql`DELETE FROM estudiante_tecnologias WHERE id_estudiante = ${rows[0].id}`;
      await sql`DELETE FROM estudiantes WHERE id = ${rows[0].id}`;
      throw error;
    }

    return NextResponse.json(
      createResponse(true, rows, "Registro de estudiante exitoso"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en la base de datos",
        getErrorMessageFromCode(error)
      ),
      { status: 500 }
    );
  }
}
