import { createResponse, generarCuerpoEmailGemini } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchemaGemini = z.object({
  tipo: z.coerce.number().int().gt(0, { message: "seleccione tipo" }),
  mensaje: z.string().optional(),
});

type GeminiInterface = z.infer<typeof CreateSchemaGemini>;

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
  const { tipo, mensaje } = validatedFields.data;

  try {
    const message = await generarCuerpoEmailGemini(tipo, mensaje || "");

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
