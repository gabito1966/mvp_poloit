import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { comparePassword, hashPassword, JWTCreate } from "@/lib/utils";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  return NextResponse.json({ message: "hola mundo" });
}

export interface UserLogin {
  email: string;
  password: string;
}

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

export async function POST(request: Request) {
  const data = (await request.json()) as UserLogin;
  const { email, password } = data;

  if (!email || !password) {
    const res: UserLoginResponse = {
      success: false,
      message: "Falta el email o la contraseña",
    };

    return NextResponse.json(res, { status: 400 });
  }

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
    //return new Response("Usuario o password incorrectos", { status: 401 });
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

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const token: String = await JWTCreate(user);

  cookies().set("JWTCookie", token.toString(), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // NextResponse.next().cookies.set("JWTCookie", token.toString(), {
  //   httpOnly: true,
  //   secure: true,
  //   expires: expiresAt,
  //   sameSite: "lax",
  //   path: "/",
  // });

  return NextResponse.json(res, { status: 200 });
}
