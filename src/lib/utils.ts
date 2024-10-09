import {
  TecnologiaConEstudiantes,
  TipoCorreoInterface,
} from "@/database/definitions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sql } from "@vercel/postgres";

export function getErrorMessageFromCode(error: any) {
  try {
    let mensaje = "";

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
  tipo: number,
  content: string,
  session: any
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

  let script = `mi nombre es ${session.nombre} y mi apellido es ${session.apellido} estoy usando la api de gemini para escribir el contenido de un correo electrónico profesional para enviar,También debe ser cordial y amigable. solo quiero el cuerpo del email no quiero nada mas, es para copiarlo y pegarlo asi como esta. si no se agrega o pregunta otra cosa distinta a lo solicitado debes enviar un mensaje de error (que no este en el contexto de del proyecto web) y que lo vuelva a intentar y solo si yo te agrego/comparto links(una url) agregalo al final, solo los link colocamelos entre una etiqueta 'a' (<a></a>), estilos en linea:color azul, hover subrayado y atributos target="__black".
    Esta es la decripción del el proyecto:
    Proyecto: Gestión de Inscripciones

    El proyecto consiste en armar un MVP de un sistema para armado de cursos para iniciativas como la que estamos llevando adelante desde el POLO IT con el Acelerador.
    
    Tenemos ONG o Programa de enseñanza que dictan distintos cursos de formación técnica como ser Programación en desarrollo WEB, Full Stack, QA, UX, Marketing digital, entre otros.
    
    De cada formación dictada (fecha de inicio y fin), egresan una cantidad importante de estudiantes que salen con conocimientos en las distintas temáticas una vez que cumplan la cursada.
    
    Por otro lado, las empresas socias del polo IT tienen colaboradores que se proponen para realizar mentorías con conocimientos en una tecnología principal y otras secundarias.e
    
    El objetivo del MVP es poder mostrar un proyecto de un sistema de gestión de inscripciones para actividades como el acelerador, que ocurrirá entre un tiempo determinado y podra vincular de forma automática Mentores Técnicos con Egresados en base a distintos parámetros de configuración de equipos (Tamaño de equipos máximos, perfiles de egresados por equipos, mentores técnicos por tecnología). También podrán tener la posibilidad de manejar la comunicación vía e-mails entre los candidatos/mentores y hacer el seguimiento durante la mentoría de los egresados.
    
    Ustedes podrán armar los ABM necesarios para la carga de los datos y la generación de procesos formales usando buenas prácticas de UX/UI y teniendo en cuenta técnicas de QA necesarios.
    
    El stack tecnológico que se pide para realizar el proyecto es:
    
    HTML,CSS, JAVASCRIPT, REACT,  NODE /JAVA, MONGO o MYSQL. Según sepan los distintos integrantes del SQUAD.
    
    El método de comunicación lo definirán con el equipo y mentor.
    
    Sugerimos utilizar ambientes de desarrollo, testing y productivos para poder tener mejor control del proyecto y recomendamos utilizar un sistema de control de código.
    
        `;

  const { rows: resultTipo } = await sql<TipoCorreoInterface>`
    SELECT 
      * 
    FROM 
      tipo_correo 
    WHERE
      id = ${tipo}`;

  switch (tipo) {
    case 1:
      script += resultTipo[0].descripcion;
      break;
    case 2:
      script += resultTipo[0].descripcion;
      break;
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
  lastName: string,
  e: any
) => {
  let html: string = "";

  html += `<p style="color:black;">${mensaje}</p>`;

  if (e) {
    html += `     <br>
                <h2 style="color:black;">Estudiantes</h2>
                <table border="1" style="border-collapse: collapse; width: fit-content; text-align: left;">
            <thead>
            <tr>
              <th style="padding: 1px; color:black;">Nombre</th>
              <th style="padding: 1px; color:black;">Apellido</th>
              <th style="padding: 1px; color:black;">Email</th>
              <th style="padding: 1px; color:black;">Teléfono</th>
              <th style="padding: 1px; color:black;">Estado</th>
              <th style="padding: 1px; color:black;">Tecnología</th>
              <th style="padding: 1px; color:black;">ONG</th>
            </tr>
            </thead>
            <tbody>
            ${e.nombres_estudiantes
              .map(
                (nombre: string, index: number) => `
              <tr>
                <td style="padding: 1px; color:black;">${nombre}</td>
                <td style="padding: 1px; color:black;">${
                  e.apellidos_estudiantes[index]
                }</td>
                <td style="padding: 1px; color:black;">${
                  e.emails_estudiantes[index]
                }</td>
                <td style="padding: 1px; color:black;">${
                  e.telefonos_estudiantes[index]
                }</td>
                <td style="padding: 1px; color:black;">${
                  e.estados_estudiantes[index] ? "Activo" : "Inactivo"
                }</td>
                <td style="padding: 1px; color:black;">${
                  e.tecnologias[index]
                }</td>
                <td style="padding: 1px; color:black;">${e.ongs[index]}</td>
              </tr>
            `
              )
              .join("")}
            </tbody>
            </table>
              <br>
              `;

    html += `
                <h2 style="color:black;">Mentores</h2>
                <table border="1" style="border-collapse: collapse; width: fit-content; text-align: left;">
            <thead>
            <tr>
              <th style="padding: 1px; color:black;">Nombre</th>
              <th style="padding: 1px; color:black;">Apellido</th>
              <th style="padding: 1px; color:black;">Email</th>
              <th style="padding: 1px; color:black;">Teléfono</th>
              <th style="padding: 1px; color:black;">Rol</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style="padding: 1px; color:black;">${e.nombre_mentor}</td>
              <td style="padding: 1px; color:black;">${e.apellido_mentor}</td>
              <td style="padding: 1px; color:black;">${e.email_mentor}</td>
              <td style="padding: 1px; color:black;">${e.telefono_mentor}</td>
              <td style="padding: 1px; color:black;">Mentor Técnico</td>
            </tr>
            <tr>
              <td style="padding: 1px; color:black;">${e.nombre_mentor_ux_ui}</td>
              <td style="padding: 1px; color:black;">${e.apellido_mentor_ux_ui}</td>
              <td style="padding: 1px; color:black;">${e.email_mentor_ux_ui}</td>
              <td style="padding: 1px; color:black;">${e.telefono_mentor_ux_ui}</td>
              <td style="padding: 1px; color:black;">Mentor UX/UI</td>
            </tr>
            <tr>
              <td style="padding: 1px; color:black;">${e.nombre_mentor_qa}</td>
              <td style="padding: 1px; color:black;">${e.apellido_mentor_qa}</td>
              <td style="padding: 1px; color:black;">${e.email_mentor_qa}</td>
              <td style="padding: 1px; color:black;">${e.telefono_mentor_qa}</td>
              <td style="padding: 1px; color:black;">Mentor QA</td>
            </tr>
            </tbody>
            </table>
            `;
  }

  html += `
    <font color="#888888"><div style="font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0)"><br></div><div style="font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0)"><br></div><div style="font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0)"><br></div><div><div dir="ltr" class="gmail_signature"><div dir="ltr"><div><div><font color="#000000"><b>${firstName} ${lastName}</b></font></div><font color="#888888" style="color:rgb(136,136,136)"><span style="font-size:12px">ADMINISTRACIÓN&nbsp;</span></font><font face="tahoma, sans-serif" style="color:rgb(34,34,34)">|&nbsp;</font><font color="#0b5394" style="color:rgb(136,136,136)"><b>SQUAD 7</b></font><font face="tahoma, sans-serif" style="color:rgb(34,34,34)">&nbsp;</font><br></div><div style="color:rgb(136,136,136)"><img src="https://i.imgur.com/bxve6gU.png" width="200" height="50" class="CToWUd" data-bit="iit"></div></div></div></div></font>
  `;

  return html;
};

export const formatDate = (
  date: Date,
  locale: string,
  options?:any 
) => {

  return Intl.DateTimeFormat(locale,options).format(date);

};
