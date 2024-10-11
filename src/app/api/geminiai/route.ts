import { CreateSchemaGemini, GeminiInterface } from "@/lib/definitions/validationZodDefinitions";
import { JWTValidate } from "@/lib/server/auth";
import { createResponse, generarCuerpoEmailGemini } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as GeminiInterface;

  const validatedFields = CreateSchemaGemini.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en algún campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }
  const { tipo, mensaje,session } = validatedFields.data;

  try {
    const { rows: resultAdmin } = await sql`SELECT * FROM sesiones WHERE id = ${
      session.split("#")[0]
    }`;

    if (!resultAdmin.length) {
      return NextResponse.json(createResponse(false, [], "Sesión invalida"), {
        status: 500,
      });
    }

    const validateJWT = await JWTValidate(resultAdmin[0].token);

    if (!validateJWT) {
      return NextResponse.json(createResponse(false, [], "Sesión invalida"), {
        status: 500,
      });
    }

    const message = await generarCuerpoEmailGemini(tipo, mensaje || "", session);

    return NextResponse.json(
      createResponse(
        true,
        [{ message }],
        "Email Generado con IA correctamente"
      ),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error al conectarme con la IA" },
      { status: 500 }
    );
  }
}
