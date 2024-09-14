import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";


const CreateSchemaEstudiante = z.object({
  id: z.coerce.number({
    invalid_type_error: "Debe ser un número",
    message: "Ingrese un ID de mentor",
  }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .trim()
    .min(3, "El nombre debe de contener al menos 3 caracteres").trim()
    .max(25, "El nombre debe contener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Solo se permiten catacteres o espacios",
    }),
  apellido: z
    .string({ message: "Ingrese un apellido" })
    .trim()
    .min(3, "El apellido debe contener al menos 3 caracteres")
    .max(25, "El apellido debe contener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, "Solo se permiten catacteres o espacios"),
  email: z
    .string({ message: "Ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "El email debe contener al menos 6 caracteres")
    .max(25, "El email debe contener menos de 25 números"),
  telefono: z
    .string({ message: "Ingrese un teléfono" })
    .min(6, "El teléfono debe contener al menos 6 números")
    .max(20, "El teléfono debe contener menos de 20 números")
    .regex(/^[0-9]+$/, "Solo se permiten numéros"),
  id_ong: z.coerce
    .number({
      message: "Seleccione una organización",
      invalid_type_error: "Seleccione una organización",
    })
    .gt(0, { message: "Seleccione una organización" }),
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

const CreateEstudiante = CreateSchemaEstudiante.omit({id:true});

type EstudianteInterface = z.infer<typeof CreateSchemaEstudiante>;

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
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        getErrorMessageFromCode(error)
      ),
      { status: 500 }
    );
  }
}
