import { Administrador } from "@/app/api/login/route";
import { SignJWT, jwtVerify } from "jose";

export async function JWTCreate(payload: Administrador) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecretKey());
}

export function getJwtSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

export async function JWTValidate(session: string | undefined = "") {

  try {
    const { payload } = await jwtVerify(session, getJwtSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("fallo la validacion de JWT");
    return null;
  }
}