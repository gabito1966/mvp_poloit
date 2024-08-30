import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createResponse, JWTCreate } from "@/lib/utils";
import { z } from "zod";
import { comparePassword, generateHash } from "@/lib/bcryptFunctions";

export interface UserLogin {
  email: string;
  password: string;
}

export type DataZ = {
  email: string;
  password: string;
};

export interface UserLoginResponse {
  success: boolean;
  data?: Administrador;
  message?: string;
}

export type Administrador = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasena?: string;
};

const CreateLogin = z.object({
  email: z
    .string()
    .email("Debe ser un email válido")
    .min(6, "el email de tener al menos 6 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// const CreateLogin = FormSchema.omit({});

export async function POST(request: Request) {
  const body = (await request.json()) as UserLogin;
  let token = "";
  const validatedFields = CreateLogin.safeParse({
    email: body.email,
    password: body.password,
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
  try {
    const { email, password } = validatedFields.data;

    const { rows } =
      await sql<Administrador>`SELECT * from administradores WHERE email = ${email}`;

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

    token = await JWTCreate(rest);

    const date = new Date().toISOString().split("T")[0];

    let sessionId: string = "";

    try {
      const result =
        await sql`INSERT INTO sesiones (id_administrador,token,fecha_creacion) VALUES
                            (${rest.id},${token},${date}) RETURNING id`;
      const { rows } = result;
      console.log("idSession id", rows);
      sessionId = await generateHash(rows[0].id);
    } catch (error) {
      return NextResponse.json(
        createResponse(false, [], "Error en la base de datos"),
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ...createResponse(true, user, "Consulta Exitosa"),
        session: sessionId,
      },
      { status: 200 }
    );
  } catch (error) {
    const res = {
      success: false,
      message: "error en la base de datos",
    };

    NextResponse.json(res, {
      status: 500,
    });
  }
}
