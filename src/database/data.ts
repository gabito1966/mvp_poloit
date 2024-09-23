import { sql } from "@vercel/postgres";
import {
  empresas,
  EstudianteFetch,
  EstudiantesData,
  MentorData,
  Ong,
  TecnologiaConEstudiantes,
} from "./definitions";

const ITEMS_PER_PAGE = 7;

export async function fetchFilteredEstudiantes(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const estudiantes = await sql<EstudiantesData>`
      SELECT 
    e.id ,
    e.nombre ,
    e.apellido ,
    e.email ,
    e.telefono ,
    e.estado ,
    o.id AS id_ong,
    o.nombre AS ong,
    ARRAY_AGG(t.nombre) AS tecnologias
FROM 
    estudiantes e
LEFT JOIN 
    estudiantes_tecnologias et ON e.id = et.id_estudiante
LEFT JOIN 
    tecnologias t ON et.id_tecnologia = t.id
INNER JOIN 
    ongs o ON e.id_ong = o.id
WHERE 
    (e.nombre ILIKE ${`%${query}%`} OR
    e.apellido ILIKE ${`%${query}%`} OR
    e.email ILIKE ${`%${query}%`} OR
    e.telefono ILIKE ${`%${query}%`} )AND
    e.estado = true
GROUP BY 
    e.id, o.id
ORDER BY 
    e.id
LIMIT ${ITEMS_PER_PAGE}
OFFSET ${offset};
    `;

    return estudiantes.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered invoices. Returning all invoices.",
      error
    );
    return [];
  }
}

export async function fetchFilteredMentores(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const mentores = await sql<MentorData>`
      SELECT 
    m.id ,
    m.nombre ,
    m.apellido ,
    m.email ,
    m.telefono ,
    m.estado ,
    e.id AS id_empresa,
    e.nombre AS empresa,
    ARRAY_AGG(t.nombre) AS tecnologias
FROM 
    mentores m
LEFT JOIN 
    mentores_tecnologias mt ON m.id = mt.id_mentor
LEFT JOIN 
    tecnologias t ON mt.id_tecnologia = t.id
INNER JOIN 
    empresas e ON m.id_empresa = e.id
WHERE 
    (m.nombre ILIKE ${`%${query}%`} OR
    m.apellido ILIKE ${`%${query}%`} OR
    m.email ILIKE ${`%${query}%`} OR
    m.telefono ILIKE ${`%${query}%`} )AND
    m.estado = true
GROUP BY 
    m.id, e.id
ORDER BY 
    m.id
LIMIT ${ITEMS_PER_PAGE}
OFFSET ${offset};
    `;

    return mentores.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered grupos. Returning all grupos.",
      error
    );
    return [];
  }
}

export async function fetchFilteredEquipos(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    //poner el tipo de dato
    const equipos = await sql`
      SELECT 
        e.id,
        e.nombre,
        e.tamano,
        e.fecha_inicio,
        e.fecha_fin,
        m.id AS id_mentor,
        m.nombre AS mentor,
        m.apellido AS mentor_apellido,
        m.email AS mentor_email,
        m.telefono AS mentor_telefono,
        muxui.id AS id_mentor_ux_ui,
        muxui.nombre AS mentor_ux_ui,
        muxui.apellido AS mentor_ux_ui_apellido,
        muxui.email AS mentor_ux_ui_email,
        muxui.telefono AS mentor_ux_ui_telefono,
        mqa.id AS id_mentor_qa,
        mqa.nombre AS mentor_qa,
        mqa.apellido AS mentor_qa_apellido,
        mqa.email AS mentor_qa_email,
        mqa.telefono AS mentor_qa_telefono,
        ARRAY_AGG(s.nombre) AS estudiantes,
        ARRAY_AGG(t.nombre) AS tecnologias,
        ARRAY_AGG(o.nombre) AS ongs
      FROM 
        equipos e
      LEFT JOIN 
        equipos_estudiantes ces ON e.id = ces.id_equipo
      LEFT JOIN 
        estudiantes s ON ces.id_estudiante = s.id
      LEFT JOIN 
        estudiantes_tecnologias est ON s.id = est.id_estudiante
      LEFT JOIN 
        tecnologias t ON est.id_tecnologia = t.id
      LEFT JOIN 
        ongs o ON s.id_ong = o.id
      LEFT JOIN 
        mentores m ON e.id_mentor = m.id
      LEFT JOIN 
        mentores muxui ON e.id_mentor_ux_ui = muxui.id
      LEFT JOIN 
        mentores mqa ON e.id_mentor_qa = mqa.id
      WHERE 
        (e.nombre ILIKE ${`%${query}%`} OR
        s.nombre ILIKE ${`%${query}%`} OR
        s.apellido ILIKE ${`%${query}%`} OR
        s.email ILIKE ${`%${query}%`} OR
        s.telefono ILIKE ${`%${query}%`} )
      GROUP BY 
        e.id, m.id, muxui.id, mqa.id
      ORDER BY 
        e.id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return equipos.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered equipos. Returning all equipos.",
      error
    );
    return [];
  }
}

export async function fetchFilteredEmpresas(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const empresas = await sql<empresas>`
      SELECT 
        e.id,
        e.nombre
      FROM 
        empresas e
      WHERE 
        e.nombre ILIKE ${`%${query}%`}
      ORDER BY 
        e.id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return empresas.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered empresas. Returning all empresas.",
      error
    );
    return [];
  }
}

export async function fetchFilteredOngs(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const ongs = await sql<Ong>`
      SELECT 
        o.id,
        o.nombre
      FROM 
        ongs o
      WHERE 
        o.nombre ILIKE ${`%${query}%`}
      ORDER BY 
        o.id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return ongs.rows;
  } catch (error) {
    console.log("Failed to fetch filtered ongs. Returning all ongs.", error);
    return [];
  }
}

export async function fetchPagesEstudiantes(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM estudiantes
      WHERE
       ( nombre ILIKE ${`%${query}%`} OR
        apellido ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`})
        AND estado = true
    `;

    const totalPages = Math.ceil(Number(rows.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function fetchPagesMentores(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM mentores
      WHERE
       ( nombre ILIKE ${`%${query}%`} OR
        apellido ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`})
        AND estado = true
    `;

    const totalPages = Math.ceil(Number(rows.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function fetchPagesEmpresas(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM empresas
      WHERE
        (nombre ILIKE ${`%${query}%`})
        AND id IS NOT NULL
    `;

    const totalPages = Math.ceil(Number(rows.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function fetchPagesOngs(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM ongs
      WHERE
        (nombre ILIKE ${`%${query}%`})
        AND id IS NOT NULL
    `;

    const totalPages = Math.ceil(Number(rows.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function fetchPagesEquipos(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM equipos
      WHERE
        nombre ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(rows.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}

export async function fetchCardData() {
  try {
    const estudiantesCountPromise = sql`SELECT COUNT(*) FROM estudiantes`;
    const estudiantesInactivosCountPromise = sql`SELECT COUNT(*) FROM estudiantes WHERE estado = FALSE`;
    const mentoresInactivosCountPromise = sql`SELECT COUNT(*) FROM mentores WHERE estado = FALSE`;
    const equiposCountPromise = sql`SELECT COUNT(*) FROM equipos`;

    const data = await Promise.all([
      estudiantesCountPromise,
      estudiantesInactivosCountPromise,
      mentoresInactivosCountPromise,
      equiposCountPromise,
    ]);

    const totalEstudiantes = Number(data[0].rows[0].count ?? "0");
    const totalEstudiantesInactivos = Number(data[1].rows[0].count ?? "0");
    const totalMentoresInactivos = Number(data[2].rows[0].count ?? "0");
    const totalEquipos = Number(data[3].rows[0].count ?? "0");

    // await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      totalEstudiantes,
      totalEstudiantesInactivos,
      totalMentoresInactivos,
      totalEquipos,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}
export async function fetchNotificationData() {
  try {
    const estudiantesCountPromise = sql`SELECT COUNT(*) FROM auditoria_estudiantes`;
    const mentoresCountPromise = sql`SELECT COUNT(*) FROM auditoria_mentores`;
    const equiposCountPromise = sql`SELECT COUNT(*) FROM auditoria_equipos`;

    const data = await Promise.all([
      estudiantesCountPromise,
      mentoresCountPromise,
      equiposCountPromise,
    ]);

    const cantEstudiantes = Number(data[0].rows[0].count ?? "0");
    const cantMentores = Number(data[2].rows[0].count ?? "0");
    const cantEquipos = Number(data[2].rows[0].count ?? "0");

    // await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      cantEstudiantes,
      cantMentores,
      cantEquipos,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch notification data.");
  }
}

export async function fetchLatestStudents() {
  try {
    const data = await sql<EstudianteFetch>`
      SELECT 
         e.id, e.nombre, e.apellido, e.email, e.telefono, o.nombre AS nombre_ong
      FROM 
        estudiantes e
      JOIN ongs o ON o.id = e.id_ong
          ORDER BY 
        e.id DESC
      LIMIT 5`;

    const latestStudents = data.rows.map((student) => ({
      ...student,
    }));
    return latestStudents;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest students.");
  }
}

export async function fetchTecnologiasConEstudiantes() {
  try {
    const tecnologiasConEstudiantesPromise = sql<TecnologiaConEstudiantes>`
      SELECT 
        t.nombre as nombre, 
        COUNT(et.id_estudiante) AS cantidad_estudiantes
      FROM 
        tecnologias t
      LEFT JOIN 
      estudiantes_tecnologias et ON t.id = et.id_tecnologia
      GROUP BY 
        t.nombre
      ORDER BY
        cantidad_estudiantes DESC
        `;

    const cantTotalEstudiantesPromise = sql`
        SELECT
         COUNT(*)
        FROM
          estudiantes
      `;
    const data = await Promise.all([
      tecnologiasConEstudiantesPromise,
      cantTotalEstudiantesPromise,
    ]);

    const tecnologiasConEstudiantes: TecnologiaConEstudiantes[] = data[0].rows;
    const cantTotalEstudiantes: number = Number(data[1].rows[0].count ?? "0");

    return { tecnologiasConEstudiantes, cantTotalEstudiantes };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tecnologias con estudiantes data.");
  }
}
