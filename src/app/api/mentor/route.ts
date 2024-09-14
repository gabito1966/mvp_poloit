import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const CreateSchemaMentor = z.object({
  id: z.coerce.number({
    invalid_type_error: "Debe ser un número",
    message: "Ingrese un ID de mentor",
  }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .trim()
    .min(3, "El nombre debe contener al menos 3 caracteres")
    .max(25, "El nombre debe contener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Solo se permiten catacteres o espacios",
    }),
  apellido: z
    .string({ message: "Ingrese un apellido" })
    .trim()
    .min(3, "El apellido debe contener al menos 3 caracteres")
    .max(25, "El apellido debe contener menos de 25 caracteres")
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Solo se permiten catacteres o espacios",
    }),
  email: z
    .string({ message: "Ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "El email debe contener al menos 6 números")
    .max(25, "El email debe contener menos de 25 números"),
  telefono: z
    .string({ message: "Ingrese un teléfono" })
    .min(6, "El telefono debe contener al menos 6 caracteres")
    .max(20, "El telefono debe contener menos de 20 caracteres")
    .regex(/^[0-9]+$/, "Solo se permiten numéros"),
  id_empresa: z.coerce
    .number({
      message: "Seleccione una organización",
      invalid_type_error: "Seleccione una empresa",
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

export async function POST(request: Request) {
  const body = (await request.json()) as Mentor;

  const validatedFields = CreateMentor.safeParse({
    ...body,
  });

  console.log( validatedFields.data?.tecnologias.length)
  console.log(  validatedFields.data?.tecnologias[0].tipo)

  if (
    !validatedFields.success ||
    (body?.tecnologias.length == 1 &&
      body?.tecnologias[0].tipo == "BACKEND")
  ) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error En Algún Campo",
        body?.tecnologias.length==1 && body?.tecnologias[0].tipo== "BACKEND"?
        {...validatedFields.error?.flatten().fieldErrors ,
          tecnologias2: ["Seleccione una tecnología"]}:
          validatedFields.error?.flatten().fieldErrors,
        
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
    RETURNING *
  `;

    try {
      tecnologias.forEach(async (e) => {
        await sql`INSERT INTO mentores_tecnologias (id_tecnologia, id_mentor)
      VALUES (${e.id},${rows[0].id})
      `;
      });
    } catch (error) {
      console.error(error);
      await sql`DELETE FROM mentores_tecnologias WHERE id_mentor = ${rows[0].id}`;
      await sql`DELETE FROM mentores WHERE id_mentor = ${rows[0].id}`;
      throw error;
    }

    revalidatePath("/mentor");

    return NextResponse.json(createResponse(true, rows, "Registro de mentor exitoso"), {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
