import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { GetMentor, MentorInterface, UpdateMentor } from "@/lib/definitions/validationZodDefinitions";

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
    const { rows } = await sql<MentorInterface>`
        SELECT 
          m.id,
          m.nombre,
          m.apellido,
          m.email,
          m.telefono,
          m.estado,
          e.id AS id_empresa,
          e.nombre AS nombre_empresa,
          COALESCE(
              ARRAY_AGG(
              JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
              ) FILTER (WHERE t.id IS NOT NULL), 
              '{}'
              ) AS tecnologias
        FROM 
          mentores m
        LEFT JOIN 
          mentores_tecnologias et ON m.id = et.id_mentor
        LEFT JOIN 
          tecnologias t ON et.id_tecnologia = t.id
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

    if (!rows[0].estado) {
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
    estado: true,
  });

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
      await sql`INSERT INTO mentores_tecnologias (id_mentor, id_tecnologia) VALUES (${id_mentor}, ${tecnologia.id})`;
    }

    revalidatePath("/");
    revalidatePath("/mentor");
    revalidatePath(`/card/mentor/${id_mentor}`);
    revalidatePath("/notificaciones/mentor");
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
