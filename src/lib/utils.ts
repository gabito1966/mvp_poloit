import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { Administrador } from "@/app/api/login/route";

export const hashPassword = async (password: string) => {
  //   const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function JWTCreate(payload: Administrador) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function JWTValidate(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Falló la validacion del JWT");
    return null;
  }
}
