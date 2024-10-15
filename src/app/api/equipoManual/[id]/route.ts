import { CreateEquipoManualUpdate, EquipoManualUpdate } from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
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

  const body = (await request.json()) as EquipoManualUpdate;

  const validatedFields = CreateEquipoManualUpdate.safeParse({
    ...body,
    id: id,
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
  const {
    tamano,
    fecha_inicio,
    fecha_fin,
    integrantes,
    mentorTecnico,
    mentorUXUI,
    mentorQA,
  } = validatedFields.data;

  const inicio = fecha_inicio.toISOString().split("T")[0];
  const fin = fecha_fin.toISOString().split("T")[0];

  try {
    await sql`
        UPDATE equipos
        SET
        tamano = ${tamano},
        id_mentor = ${mentorTecnico},
        id_mentor_ux_ui = ${mentorUXUI},
        id_mentor_qa = ${mentorQA}
        WHERE id = ${id};
        `;

    await sql`
        UPDATE equipos
        SET
        fecha_inicio = ${inicio},
        fecha_fin = ${fin}
        `;

    await sql`
        DELETE FROM equipos_estudiantes
        WHERE id_equipo = ${id}
        `;

    integrantes.forEach(async (e: number) => {
      await sql`
            INSERT INTO equipos_estudiantes (id_equipo, id_estudiante)
            VALUES (${id}, ${e})
            `;
    });

    revalidatePath("/");
    revalidatePath("/equipos");
    revalidatePath(`/card/equipo/${id}`);
    return NextResponse.json(
      createResponse(true, [], "Actualización de equipo exitosa"),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}