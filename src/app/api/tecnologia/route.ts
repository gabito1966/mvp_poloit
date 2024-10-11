import { CreateTecnologia, Tecnologia } from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as Tecnologia;
  try {
    const validatedFields = CreateTecnologia.safeParse({
      ...body,
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

    const { nombre, tipo} = validatedFields.data;
    
    const { rows } =
      await sql<Tecnologia>`INSERT INTO tecnologias (nombre,tipo) VALUES (${nombre}, ${tipo}) RETURNING *`;

    return NextResponse.json(
      createResponse(true, rows[0], "Registro exitoso"),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { rows } =
      await sql<Tecnologia>`SELECT * FROM tecnologias ORDER BY id`;

    return NextResponse.json(createResponse(true, rows, "Consulta exitosa"), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
