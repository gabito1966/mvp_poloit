import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { OngInterface, OngResponse } from "../route";

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
      { success: false, message: "debe proporcionar el id de la organizacion" },
      { status: 400 }
    );
  }

  const body = (await request.json()) as OngInterface;

  const validatedFields = UpdateOng.safeParse({
    id: id,
    ...body,
  });

  if (!validatedFields.success) {
    const res = {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };

    return NextResponse.json(res, { status: 400 });
  }

  const { id: idOng, nombre } = validatedFields.data;

  try {
    await sql`UPDATE ongs SET nombre = ${nombre} WHERE id = ${idOng}`;

    const res: OngResponse = {
      success: true,
      message: "Actualización de organización exitosa",
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res: OngResponse = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "debe proporcionar el id de la organizacion" },
      { status: 400 }
    );
  }

  try {
    await sql`DELETE FROM ongs WHERE id = ${id}`;

    const res: OngResponse = {
      success: true,
      message: "Eliminación de organización exitosa",
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res: OngResponse = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "debe proporcionar el id de la organizacion" },
      { status: 400 }
    );
  }

  try {
    const { rows } =
      await sql<OngInterface>`SELECT id, nombre FROM ongs WHERE id = ${id}`;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "La organizacion no existe" },
        { status: 404 }
      );
    }

    const res = {
      success: true,
      data: rows[0],
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res: OngResponse = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}
