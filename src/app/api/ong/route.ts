import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

export type OngInterface = {
  id?: number;
  nombre: string;
};

export interface OngResponse {
  success: boolean;
  data?: OngInterface[];
  message?: string;
}

const CreateOng = z.object({
  nombre: z
    .string({ message: "seleccione un nombre" }).trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(25, "El nombre debe tener menos de 25 caracteres"),
});

export async function GET(request: Request) {
  try {
    const { rows } = await sql<OngInterface>`SELECT id, nombre FROM ongs`;

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

export async function POST(request: Request) {
  const body = (await request.json()) as OngInterface;

  const validatedFields = CreateOng.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error En Algun Campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { nombre } = validatedFields.data;

  try {
    await sql<OngInterface>`
      INSERT INTO ongs (nombre) VALUES (${nombre}) 
    `;

    return NextResponse.json(
      createResponse(true, [], "Registro de organizacion exitoso"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
