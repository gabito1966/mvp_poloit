import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { tree } from "next/dist/build/templates/app-page";

export const CreateTecnologia = z.object({
  id: z.coerce.number({ message: "ingrese un id" }),
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(2, "el nombre debe tener al menos 2 caracteres"),
});

export interface TecnologiaResponse {
  success: boolean;
  data?: Tecnologia[];
  message?: string;
  fieldsError?: {};
}

export type Tecnologia = z.infer<typeof CreateTecnologia>;

export async function POST(request: Request) {
  const body = (await request.json()) as Tecnologia;
  try {
    const validatedFields = CreateTecnologia.safeParse({
      ...body,
    });

    if (!validatedFields.success) {
      const res: TecnologiaResponse = {
        success: false,
        data: [],
        message: "Error en algun campo",
        fieldsError: validatedFields.error.flatten().fieldErrors,
      };

      return NextResponse.json(res, { status: 400 });
    }

    const { nombre } = validatedFields.data;

    const { rows } =
      await sql<Tecnologia>`INSERT INTO tecnologias (nombre) VALUES (${nombre}) RETURNING *`;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    const res: TecnologiaResponse = {
      success: false,
      data: [],
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await sql<Tecnologia>`SELECT * FROM tecnologias`;

    const res: TecnologiaResponse = {
      success: true,
      data: rows,
      message: "Consulta Exitosa",
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res: TecnologiaResponse = {
      success: false,
      data: [],
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}
