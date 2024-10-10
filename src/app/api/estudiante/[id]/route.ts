import { EstudianteInterfaceZod, GetEstudiante, UpdateEstudiante } from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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
    const { rows } = await sql<EstudianteInterfaceZod>`
        SELECT 
          s.id,
          s.nombre,
          s.apellido,
          s.email,
          s.telefono,
          s.estado,
          o.id AS id_ong,
          o.nombre AS nombre_ong,
          COALESCE(
              ARRAY_AGG(
              JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
              ) FILTER (WHERE t.id IS NOT NULL), 
              '{}'
              ) AS tecnologias
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
          s.id =${idEstudiante} ;`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "El estudiante no existe"),
        { status: 404 }
      );
    }

    if (!rows[0].estado) {
      return NextResponse.json(
        createResponse(false, [], "El estudiante no fue eliminado"),
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

  const body = (await request.json()) as EstudianteInterfaceZod;

  const validatedFields = UpdateEstudiante.safeParse({
    ...body,
    id: id,
    estado: true,
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

    await sql`INSERT INTO estudiantes_tecnologias (id_estudiante, id_tecnologia) VALUES (${id_estudiante}, ${tecnologias[0].id})`;

    revalidatePath("/");
    revalidatePath("/estudiante");
    revalidatePath(`/card/estudiante/${id_estudiante}`);
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
    
    await sql`DELETE FROM correo_estudiante
              WHERE estudiante_id = ${id};`;
    

    revalidatePath("/");
    revalidatePath("/mensaje");
    revalidatePath("/estudiante");
    revalidatePath("/notificaciones/estudiante");

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
