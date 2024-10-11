import { AdministradorLogin, UserLogin } from "@/database/definitions";
import { comparePassword } from "@/lib/bcryptFunctions";
import { CreateLogin } from "@/lib/definitions/validationZodDefinitions";
import { JWTCreate } from "@/lib/server/auth";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as UserLogin;

  const validatedFields = CreateLogin.safeParse({
    email: body.email,
    password: body.password,
  });

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
  try {
    const { email, password } = validatedFields.data;

    const { rows } =
      await sql<AdministradorLogin>`SELECT * from administradores WHERE email = ${email}`;

    if (rows.length === 0) {
      return NextResponse.json(
        createResponse(false, [], "Email no registrado"),
        { status: 500 }
      );
    }

    const user = rows[0];
    const match = await comparePassword(password, user.contrasena || "");

    if (!match) {
      return NextResponse.json(
        createResponse(false, [], "Contraseña Incorrecta"),
        { status: 500 }
      );
    }

    const { contrasena: contrasenia, ...rest } = user;

    const token = await JWTCreate(rest);

    const date = new Date().toISOString().split("T")[0];

    try {
      const result =
        await sql`INSERT INTO sesiones (id_administrador,token,fecha_creacion) VALUES
                            (${rest.id},${token},${date}) RETURNING id`;
      const { rows } = result;

      const session = `${rows[0].id}#${token.slice(0,10)}`
  
      return NextResponse.json(
        {
          ...createResponse(true, rest, "Inicio de sesion Exitoso"),
          session: session,
        },
        { status: 200 }
      );

    } catch (error) {
      return NextResponse.json(
        createResponse(false, [], getErrorMessageFromCode(error)),
        { status: 500 }
      );
    }
   
  } catch (error) {
    NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
       {
      status: 500,
    });
  }
}