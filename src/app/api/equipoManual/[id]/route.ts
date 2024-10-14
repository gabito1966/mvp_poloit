import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export const CreateSchemaEquipoManual = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe contener menos de 30 caracteres")
    .regex(/^[a-zA-Z0-9\sñÑ-]+$/, {
      message: "Solo se permiten letras y números",
    }),
  tamano: z.coerce
    .number({
      invalid_type_error: "El tamaño debe ser un número",
      message: "Ingrese un tamaño",
    })
    .gt(5, { message: "Seleccione por lo menos 6 integrantes" }),
  fecha_inicio: z.coerce.date({ message: "Ingrese una fecha de inicio" }),
  fecha_fin: z.coerce.date({ message: "Ingrese una fecha final de entrega" }),
  integrantes: z
    .array(z.number().gt(0, { message: "Seleccione un estudiante" }))
    .min(6, "Debe tener al menos 6 integrante"),
  mentorTecnico: z.number().gt(0, { message: "Seleccione un mentor técnico" }),
  mentorUXUI: z.number().gt(0, { message: "Seleccione un mentor UX/UI" }),
  mentorQA: z.number().gt(0, { message: "Seleccione un mentor QA" }),
});

export const CreateEquipoManual = CreateSchemaEquipoManual.refine(
  (data) => data.fecha_inicio < data.fecha_fin,
  {
    message: "La fecha de inicio debe ser anterior a la fecha de fin",
    path: ["fecha_fin"],
  }
);

export type EquipoManual = z.infer<typeof CreateSchemaEquipoManual>;

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

  const body = (await request.json()) as EquipoManual;

  const validatedFields = CreateEquipoManual.safeParse({
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
        mentor_tecnico = ${mentorTecnico},
        WHERE id = ${id}
        `;

    await sql`
        UPDATE equipos
        SET
        fecha_inicio = ${inicio},
        fecha_fin = ${fin},
        mentor_uxui = ${mentorUXUI},
        mentor_qa = ${mentorQA}
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
