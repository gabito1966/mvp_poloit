import {
  CreateEquipoManual,
  EquipoManual,
} from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as EquipoManual;

  const validatedFields = CreateEquipoManual.safeParse({
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

  const {
    nombre,
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
    const { rows: resultNombre } = await sql`
            SELECT * FROM equipos WHERE nombre = ${nombre};`;

    if (resultNombre.length > 0) {
      return NextResponse.json(
        createResponse(false, [], `El equipo con nombre "${nombre}" ya existe`,
         { nombre: ["El nombre ya existe"] } 
        ),
        { status: 500 }
      );
    }

    const { rows: resultEquipo } = await sql`
             INSERT INTO equipos (nombre, tamano, id_mentor, id_mentor_ux_ui, id_mentor_qa, fecha_inicio, fecha_fin)
            VALUES (${nombre},${tamano},${mentorTecnico},${mentorUXUI},${mentorQA},${inicio},${fin}) RETURNING id;
        `;
    integrantes.forEach(async (e: number) => {
      await sql`
                INSERT INTO equipos_estudiantes (id_equipo, id_estudiante)
                VALUES (${resultEquipo[0].id}, ${e});
            `;
    });

    revalidatePath("/");
    revalidatePath("/equipo");
    revalidatePath("/register/equipos");

    return NextResponse.json(
      createResponse(true, [], "Creación de equipo exitosa"),
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
