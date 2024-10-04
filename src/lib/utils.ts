import { TecnologiaConEstudiantes } from "@/database/definitions";
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
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

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

  let y_axis: number = 0;

  if (highestRecord / 10 < 5) {
    y_axis = 5;
  } else {
    if (highestRecord / 10 < 10) {
      y_axis = 10;
    } else {
      y_axis = 100;
    }
  }

  for (let i = 0; i <= highestRecord; i = i + y_axis) {
    yAxisLabels.push(i);
  }

  return { yAxisLabels: yAxisLabels.reverse(), topLabel: highestRecord };
};

/**
 * Funcion que utiliza la IA de Google Gemini para generar un cuerpo de email
 * @param {string} tipo tipo de email (true presentación y comunicación de los integrantes, false seguimiento de cada estudiante del equipo)
 * @param {string} content nombre de la empresa del destinatario
 * @returns {string} cuerpo del correo
 */
export const generarCuerpoEmailGemini = async (
  tipo: string,
  content: string
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

  let script =
    "estoy usando la api de gemini para escribir el contenido de un correo electrónico profesional para enviar,También debe ser cordial y amigable. solo quiero el cuerpo del email no quiero nada mas, es para copiarlo y pegarlo asi como esta. si se agrega o pregunta otra cosa distinta a lo solicitado debes enviar un mensaje de error (que no este en el contexto de del proyecto web) y que lo vuelva a intentar y si agrego links agregalo al final ";

  if (tipo == "true") {
    script += `
    este es el cuerpo de un email de presentacion de los integrantes del grupo

      ejemplo de email:
      
      ¡Hola equipo!

      Gracias por sumarse y participar de este Acelerador Polo IT

      Como les mencionamos hoy  en el kick off, les compartimos los datos del equipo con el que estarán trabajando y el mentor/a que los acompañará:

      Los/las invitamos a contactarse con sus compañeros/as de equipo y con su mentor/a para comenzar esta aventura.

      Les deseamos muchos éxitos y desde ya a disposición por si surgen dudas

      Saludos.

      Comisión Talento e Inclusión
      Polo IT de Buenos Aires
    `;
  } else {
    script += `
    este es un email de seguimiento de cada intengrante, si te agrego más preguntas referentes al seguimiento del grupo lo agregas.

    ejemplo de email:
    Hola, ¿cómo estás? Espero que muy bien.

    Me comunico desde el Ministerio de Educación para hacerte algunas preguntas respecto al programa Polo IT, ya que queremos saber un poco más acerca de tu experiencia.

    1) ¿Ya se te asignó un proyecto?
    2) ¿Tuvieron su primer encuentro?
    3) ¿Cada cuanto son las reuniones de equipo?
    4) ¿La comunicación y las explicaciones son adecuadas?
    5) ¿Tu equipo está completo?

    Cualquier otro comentario u observación que quieras hacernos es más que bienvenido!

    ¡Muchísimas gracias!
      
    Comisión Talento e Inclusión
    Polo IT de Buenos Aires
        `;
  }

  script += `${
    content
      ? ` agregar ${content}, mejorando la narración de la pregunta si es necesario y sin faltas de ortografias`
      : ""
  }`;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(script);
  return result.response.text();
};

export const generateHTMLString = (
  mensaje: string,
  firstName: string,
  lastName: string
) => {
  let html: string = "";

  html += `<p style="color:black;">${mensaje}</p>`;

  html += `
    <font color="#888888"><div style="font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0)"><br></div><div style="font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0)"><br></div><div style="font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0)"><br></div><div><div dir="ltr" class="gmail_signature"><div dir="ltr"><div><div><font color="#000000"><b>${firstName} ${lastName}</b></font></div><font color="#888888" style="color:rgb(136,136,136)"><span style="font-size:12px">Administración&nbsp;</span></font><font face="tahoma, sans-serif" style="color:rgb(34,34,34)">|&nbsp;</font><font color="#0b5394" style="color:rgb(136,136,136)"><b>SQUAD 7</b></font><font face="tahoma, sans-serif" style="color:rgb(34,34,34)">&nbsp;</font><br></div><div style="color:rgb(136,136,136)"><img src="https://i.imgur.com/bxve6gU.png" width="200" height="50" class="CToWUd" data-bit="iit"></div></div></div></div></font>
  `;

  return html;
};
