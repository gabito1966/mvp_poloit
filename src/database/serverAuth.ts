"use server";

import { JWTValidate } from "@/lib/server/auth";
import { createResponse } from "@/lib/utils";
import { sql } from "@vercel/postgres";

export async function ValidateIDSession(value: string) {

  const session = value.split(";")[0];

  try {
    const { rows } = await sql` SELECT * FROM sesiones WHERE id = ${session} `;

    if (!rows.length) {
      return createResponse(false, [], "JWT INVALIDO");
    }

    const validateJWT = await JWTValidate(rows[0].token);

    if (!validateJWT) {
      await sql` DELETE FROM sesiones WHERE id = ${session} `;
      return createResponse(false, [], "JWT INVALIDO");
    }

    return createResponse(true, validateJWT, "JWT VALIDO");
  } catch (error) {
    console.log(error);

    return createResponse(false, [], "error en la base de datos");
  }
}
