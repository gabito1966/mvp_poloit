import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { CreateMentor, Mentor } from "@/lib/definitions/validationZodDefinitions";

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
    VALUES (${nombre.toLowerCase()}, ${apellido.toLowerCase()}, ${email}, ${telefono}, ${id_empresa})
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
