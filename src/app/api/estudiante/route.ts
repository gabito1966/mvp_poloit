import { CreateEstudiante, EstudianteInterface } from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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
        "Error en algún campo",
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
     (${nombre.toLowerCase()},${apellido.toLowerCase()}, ${email}, ${telefono}, ${id_ong}) RETURNING *`;

    try {
      await sql`INSERT INTO estudiantes_tecnologias (id_tecnologia, id_estudiante)
      VALUES (${tecnologias[0].id},${rows[0].id})
      `;
    } catch (error) {
      await sql`DELETE FROM estudiante_tecnologias WHERE id_estudiante = ${rows[0].id}`;
      await sql`DELETE FROM estudiantes WHERE id = ${rows[0].id}`;
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/register/equipos");
    revalidatePath("/estudiante");
    revalidatePath("/equipo");
    
    return NextResponse.json(
      createResponse(true, rows, "Registro de estudiante exitoso"),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
