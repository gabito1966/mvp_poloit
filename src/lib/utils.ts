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

export function getErrorMessageFromCode(error: any) {
  try {
    let mensaje = "";

    console.log(error);

    if ((error.code = "23505")) {
      if (!error.constraint) {
        return "Error en sintaxis de la consulta a la base de datos";
      }

      const arr = error.constraint.split("_");

      mensaje = arr.splice(1, arr.length - 2).join("");
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
    return errorMessagesCodes[error.code] || "Error en la base de datos";
  } catch (error) {
    return "Error en la base de datos";
  }
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


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};