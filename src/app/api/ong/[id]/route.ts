import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { OngInterface, OngResponse } from "../route";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

export const UpdateOng = z.object({
  id: z.coerce.number({ invalid_type_error: "seleccione una organizacion" }),
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(2, "el telefono debe tener al menos 6 caracteres"),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "debe proporcionar el id de la organización"),
      { status: 400 }
    );
  }

  const body = (await request.json()) as OngInterface;

  const validatedFields = UpdateOng.safeParse({
    ...body,
    id: id,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en algun campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { id: idOng, nombre } = validatedFields.data;

  try {
    await sql`UPDATE ongs SET nombre = ${nombre} WHERE id = ${idOng}`;

    return NextResponse.json(
      createResponse(true, [], "Actualización de organización exitosa"),
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
      createResponse(false, [], "debe proporcionar el id de la organización"),
      { status: 400 }
    );
  }

  try {
    await sql`DELETE FROM ongs WHERE id = ${id}`;

    return NextResponse.json(
      createResponse(true, [], "Eliminación de organización exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      createResponse(false, [], "debe proporcionar el id de la organización"),
      { status: 400 }
    );
  }

  try {
    const { rows } =
      await sql<OngInterface>`SELECT id, nombre FROM ongs WHERE id = ${id}`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "La organizacion no existe"),
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
