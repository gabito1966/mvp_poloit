import { sql } from "@vercel/postgres";
import { empresas, EstudiantesData, MentorData, Ong } from "./definitions";

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
      "Failed to fetch filtered invoices. Returning all invoices.",
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

export async function fetchFilteredOngs(
  query: string,
  currentPage: number
) {
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
    console.log(
      "Failed to fetch filtered ongs. Returning all ongs.",
      error
    );
    return [];
  }
}


export async function fetchPagesEstudiantes(query: string) {
  try {

    const  rows  = await sql`
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

    const  rows  = await sql`
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

    await new Promise((resolve) => setTimeout(resolve, 1500));
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

