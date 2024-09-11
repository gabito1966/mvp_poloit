import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchemaTecnologia = z.object({
  id: z.coerce.number({ message: "ingrese un ID" }),
  nombre: z
    .string({ message: "Ingrese un nombre" }).trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(25, "El nombre debe tener menos de 25 caracteres"),
  tipo:z.string()
});

const CreateTecnologia = CreateSchemaTecnologia.omit({ id: true });

type Tecnologia = z.infer<typeof CreateTecnologia>;

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
