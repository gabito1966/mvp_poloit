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

export function getErrorMessageFromCode(
  code: string,
  contraint: string
): string {
  let mensaje = "";

  if ((code = "23505")) {
    const arr = contraint.split("_");

    mensaje = arr.splice(1, arr.length).join("");
  }

  const errorMessagesCodes: { [code: string]: string } = {
    "23505": `${mensaje} ya existe`,
    "23502": "No se puede insertar un valor NULL en esta columna",
    "23503": "La clave externa no es válida",
    "22001": "Valor demasiado largo para la columna",
    "22008": "Valor no válido para la columna",
    "22012": "Valor NULL no permitido en la columna",
    "22019": "Valor no válido para la columna",
    "28000": "Error de autenticación",
    "3D000": "Error de sintaxis en la consulta",
    "42P01": "Error de sintaxis en la definición de la tabla",
    "42P02": "Error de sintaxis en la definición de la columna",
  };
  return errorMessagesCodes[code] || "Error en la base de datos";
}

export function createResponse(
  success: boolean,
  data?: any[any],
  message?: string,
  errors?: {}
) {
  return {
    success,
    data,
    message,
    errors,
  };
}
