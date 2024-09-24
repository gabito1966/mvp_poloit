import { Estudiante, TecnologiaConEstudiantes } from "@/database/definitions";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const generateYAxis = (
  estudianteTecnologia: TecnologiaConEstudiantes[]
) => {
  const yAxisLabels: number[] = [];
  const highestRecord = Math.max(
    ...estudianteTecnologia.map((e) => e.cantidad_estudiantes)
  );
  for (let i = highestRecord; i >= 0; i--) {
    yAxisLabels.push(i);
  }

  return { yAxisLabels, topLabel: highestRecord };
};



/**
 * Funcion que utiliza la IA de Google Gemini para generar un cuerpo de email
 * @param {string} destinatario nombre del destinatario
 * @param {string} empresa nombre de la empresa del destinatario
 * @param {string} tema tema del correo
 * @param {string} informacion informacion especifica a incluir
 * @returns {string} cuerpo del correo
 */
export const generarCuerpoEmailGemini = async (
  destinatario: string,
  empresa: string,
  tema: string,
  informacion: string
) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || "");

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
       parts: [{text: `Escribe un correo electrónico profesional para enviar a ${destinatario} en ${empresa}. El correo debe tratar sobre ${tema}. Incluye la siguiente información: ${informacion}. También debe ser un correo cordial y amigable.`}],
      },
      {
        role: "model",
       parts: [{text: "Claro, dime qué información quieres incluir para el correo electrónico."}], 
      },
    ],
  });

  const result = await chatSession.sendMessage("");
  return result.response.text();
};