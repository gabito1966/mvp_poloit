import { CreateEmpresa, EmpresaZod } from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as EmpresaZod;
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
