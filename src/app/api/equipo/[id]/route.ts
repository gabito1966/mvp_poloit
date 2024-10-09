import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const GetEquipo = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numéro" }),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "Debe proporcionar el ID del equipo"),
      { status: 400 }
    );
  }

  const validatedFields = GetEquipo.safeParse({
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

  const { id: idequipo } = validatedFields.data;

  revalidatePath(`/card/equipo/${idequipo}`);

  try {
    const { rows } = await sql`
  SELECT 
    e.id,
    e.nombre,
    e.tamano,
    e.fecha_inicio,
    e.fecha_fin,
    m.id AS id_mentor,
    m.nombre AS mentor,
    m.apellido AS mentor_apellido,
    m.email AS mentor_email,
    m.telefono AS mentor_telefono,
    muxui.id AS id_mentor_ux_ui,
    muxui.nombre AS mentor_ux_ui,
    muxui.apellido AS mentor_ux_ui_apellido,
    muxui.email AS mentor_ux_ui_email,
    muxui.telefono AS mentor_ux_ui_telefono,
    mqa.id AS id_mentor_qa,
    mqa.nombre AS mentor_qa,
    mqa.apellido AS mentor_qa_apellido,
    mqa.email AS mentor_qa_email,
    mqa.telefono AS mentor_qa_telefono,
    ARRAY_AGG(s.nombre) AS nombres_estudiantes,
    ARRAY_AGG(s.apellido) AS apellidos_estudiantes,
    ARRAY_AGG(s.email) AS emails_estudiantes,
    ARRAY_AGG(s.telefono) AS telefonos_estudiantes,
    ARRAY_AGG(s.estado) AS estados_estudiantes,
    ARRAY_AGG(t.nombre) AS tecnologias,
    ARRAY_AGG(o.nombre) AS ongs
  FROM 
    equipos e
  LEFT JOIN 
    equipos_estudiantes ces ON e.id = ces.id_equipo
  LEFT JOIN 
    estudiantes s ON ces.id_estudiante = s.id
  LEFT JOIN 
    estudiantes_tecnologias est ON s.id = est.id_estudiante
  LEFT JOIN 
    tecnologias t ON est.id_tecnologia = t.id
  LEFT JOIN 
    ongs o ON s.id_ong = o.id
  LEFT JOIN 
    mentores m ON e.id_mentor = m.id
  LEFT JOIN 
    mentores muxui ON e.id_mentor_ux_ui = muxui.id
  LEFT JOIN 
    mentores mqa ON e.id_mentor_qa = mqa.id
  WHERE 
    e.id = ${idequipo}
  GROUP BY 
    e.id, m.id, muxui.id, mqa.id
`;

    

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "Debe proporcionar el ID del equipo"),
      { status: 400 }
    );
  }

  try {
    const validatedFields = GetEquipo.safeParse({
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

    const { id: idequipo } = validatedFields.data;

    await sql`
    DELETE FROM 
      equipos_estudiantes
    WHERE
      id_equipo = ${idequipo};
        `;

    await sql`
    DELETE FROM correo_equipo
  WHERE equipo_id = ${idequipo};
        `;

    await sql`
      DELETE FROM
        equipos
      WHERE
        id = ${idequipo}
        `;

    revalidatePath('/');
    revalidatePath(`/equipo`);
    revalidatePath("/notificaciones/equipo");
    revalidatePath("/mensaje");

    return NextResponse.json(createResponse(true, [], "Equipo eliminado"), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
