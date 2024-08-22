import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { comparePassword, hashPassword, JWTCreate } from "@/lib/utils";
import { cookies } from "next/headers";
import { z } from "zod";

export async function GET(request: Request) {
  return NextResponse.json({ message: "hola mundo" });
}

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
  userData?: Administrador;
  message?: string;
}

export type Administrador = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
};

const FormSchema = z.object({
  email: z
    .string()
    .email("Debe ser un email válido")
    .min(6, "el email de tener al menos 6 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const CreateLogin = FormSchema.omit({});

export async function POST(request: Request) {
  const body = (await request.json()) as UserLogin;

  try {
    const { email, password } = CreateLogin.parse({
      email: body.email,
      password: body.password,
    });

    const { rows } =
      await sql<Administrador>`SELECT * from administradores WHERE email = ${email}`;

    if (rows.length === 0) {
      const res: UserLoginResponse = {
        success: false,
        message: "El administrador no esta registrado",
      };

      return NextResponse.json(res, { status: 500 });
    }

    const user = rows[0];
    const match = await comparePassword(password, user.contrasena);

    if (!match) {
      const res: UserLoginResponse = {
        success: false,
        message: "Error en el email o la contraseña",
      };

      return NextResponse.json(res, { status: 500 });
    }

    const res: UserLoginResponse = {
      success: true,
      userData: user,
      message: "Login Exitoso",
    };

    const token: String = await JWTCreate(user);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const res = {
        success: false,
        message: error.errors.map((err) => err.message).join(", "),
      };

      return NextResponse.json(res, { status: 400 });
    }

    const res = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}
