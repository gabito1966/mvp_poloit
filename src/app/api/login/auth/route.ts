import { JWTValidate } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method === "POST") {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json(
        { success: false, message: "jwt es requerido" },
        { status: 400 }
      );
    }
    const payload: any = await JWTValidate(token);
    console.log(payload);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "jwt invalido" },
        { status: 400 }
      );
    }
    const { id } = payload;

    const { rows } = await sql`SELECT * FROM sesiones WHERE id = ${id}`;

    console.log(rows);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "la sesión no existe" },
        { status: 400 }
      );
    }
    const sesion = rows[0];
    if (sesion.id_usuario !== id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID de sesión no coincide con ID de usuario",
        },
        { status: 400 }
      );
    }
  }
}
