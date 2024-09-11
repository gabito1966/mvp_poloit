import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
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

const CreateSchemaEstudiante = z.object({
  nombre: z
    .string({ message: "Ingrese un nombre" }).trim()
    .min(3, "El nombre debe de tener al menos 3 caracteres")
    .max(25, "El nombre debe tener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, { message: "No se permiten numéros o símbolos" }),
  apellido: z
    .string({ message: "Ingrese un apellido" }).trim()
    .min(3, "El apellido debe tener al menos 3 caracter")
    .max(25, "El apellido debe tener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, "No se permiten numéros o símbolos"),
  email: z
    .string({ message: "Ingrese un email" }).trim()
    .email("Debe ser un email válido")
    .min(6, "El email debe tener al menos 6 caracteres"),
  telefono: z
    .string({ message: "Ingrese un teléfono" }).trim()
    .min(6, "El teléfono debe tener al menos 6 números")
    .max(20, "El teléfono debe tener menos de 20 números")
    .regex(/^[0-9]+$/, "No se permiten caracteres"),
  id_ong: z.coerce.number({
    invalid_type_error: "Seleccione una organización",
  }),
  tecnologias: z
    .array(
      z.object({
        id: z.coerce.number().gt(0, { message: "Seleccione una tecnología" }),
        nombre: z.string(),
        tipo: z.string(),
      })
    )
    .min(1, "Debe seleccionar una tecnología"),
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

      await sql`INSERT INTO estudiantes_tecnologias (id_tecnologia, id_estudiante)
      VALUES (${tecnologias[0].id},${rows[0].id})
      `;

    } catch (error) {

      await sql`DELETE FROM estudiante_tecnologias WHERE id_estudiante = ${rows[0].id}`;
      await sql`DELETE FROM estudiantes WHERE id = ${rows[0].id}`;
      throw error;
    }
    revalidatePath("/estudiante");

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
