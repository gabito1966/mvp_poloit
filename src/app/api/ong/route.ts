import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";

export type OngInterface = {
  id?: number;
  nombre: string;
};

export interface OngResponse {
  success: boolean;
  data?: OngInterface[];
  message?: string;
}

export const CreateOng = z.object({
  nombre: z
    .string({ message: "seleccione un nombre" })
    .min(2, "el telefono debe tener al menos 6 caracteres"),
});

export async function GET(request: Request) {
  try {
    const { rows } = await sql<OngInterface>`SELECT id, nombre FROM ongs`;

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error en la base de datos" },
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
    const res = {
      success: false,
      data: [],
      message: validatedFields.error.flatten().fieldErrors,
    };

    return NextResponse.json(res, { status: 400 });
  }

  const { nombre } = validatedFields.data;

  try {
    const result = await sql<OngInterface>`
      INSERT INTO ongs (nombre) VALUES (${nombre}) RETURNING id, nombre
    `;

    const res: OngResponse = {
      success: true,
      message: "Registro de organizacion exitoso",
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
