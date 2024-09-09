import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateEmpresa = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un número" }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(25, "El nombre debe tener menos de 25 caracteres"),
});

type Empresa = z.infer<typeof UpdateEmpresa>;

const GetEmpresa = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un número" }),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        createResponse(false, [], "Debe proporcionar el ID de la empresa"),
        { status: 400 }
      );
    }

    const { rows } =
      await sql<Empresa>`SELECT * from empresas WHERE id = ${id}`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "No se encontró la empresa"),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createResponse(true, rows[0], "Consulta Exitosa"),
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
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        createResponse(false, [], "Debe proporcionar el ID de la empresa"),
        { status: 400 }
      );
    }

    const body = (await request.json()) as Empresa;

    const validatedFields = UpdateEmpresa.safeParse({
      ...body,
      id: id,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        createResponse(
          false,
          [],
          "Error En Algún Campo",
          validatedFields.error.flatten().fieldErrors
        ),
        { status: 400 }
      );
    }

    const { nombre } = validatedFields.data;

    const { rows } =
      await sql<Empresa>`UPDATE empresas SET nombre = ${nombre} WHERE id = ${id} RETURNING *`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "No se encontró la empresa"),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createResponse(true, rows[0], "Actualización Exitosa"),
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
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        createResponse(false, [], "Debe proporcionar el ID de la empresa"),
        { status: 400 }
      );
    }

    const validatedFields = GetEmpresa.safeParse({
      id: id,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        createResponse(
          false,
          [],
          "Error En Algún Campo",
          validatedFields.error.flatten().fieldErrors
        ),
        { status: 400 }
      );
    }

    await sql<Empresa>`DELETE FROM empresas WHERE id = ${id}`;

    return NextResponse.json(createResponse(true, [], "Eliminación Exitosa"), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
