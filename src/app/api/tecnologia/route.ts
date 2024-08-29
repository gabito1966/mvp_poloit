import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

export const CreateSchemaTecnologia = z.object({
  id: z.coerce.number({ message: "ingrese un id" }),
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(2, "el nombre debe tener al menos 2 caracteres"),
});

const CreateTecnologia = CreateSchemaTecnologia.omit({ id: true });

export type Tecnologia = z.infer<typeof CreateTecnologia>;

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

    const { nombre } = validatedFields.data;

    const { rows } =
      await sql<Tecnologia>`INSERT INTO tecnologias (nombre) VALUES (${nombre}) RETURNING *`;

    return NextResponse.json(
      createResponse(true, rows[0], "Registro exitoso"),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], "error en la base de datos"),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { rows } =
      await sql<Tecnologia>`SELECT * FROM tecnologias ORDER BY id`;

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
