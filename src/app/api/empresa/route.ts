import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

const CreateSchemaEmpresa = z.object({
  id: z.coerce.number({
    invalid_type_error: "Debe ser de tipo número",
    message: "Ingrese un ID",
  }),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

const CreateEmpresa = CreateSchemaEmpresa.omit({ id: true });

export async function POST(request: Request) {
  const body = (await request.json()) as z.infer<typeof CreateEmpresa>;
  const validatedFields = CreateEmpresa.safeParse(body);

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

  try {
    const { rows } =
      await sql`INSERT INTO empresas (nombre) VALUES (${nombre}) RETURNING *`;

    return NextResponse.json(
      createResponse(true, rows[0], "Empresa creada correctamente"),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en algún campo",
        getErrorMessageFromCode(error)
      ),
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { rows } = await sql`SELECT * FROM empresas ORDER BY id`;

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
