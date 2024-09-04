import { sql } from "@vercel/postgres";
import { Estudiante, EstudiantesData } from "./definitions";

const ITEMS_PER_PAGE = 6;

export async function fetchGetAllEstudiantes() {
  try {
    const data = await sql<Estudiante>`SELECT * FROM estudiantes`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchFilteredEstudiantes(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * 10;

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
LIMIT ${10}
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

export async function fetchPages(query: string) {
  try {
    const { rows } = await sql<{ count: string }[]>`
      SELECT COUNT(*)
      FROM estudiantes
      WHERE
        nombre ILIKE ${`%${query}%`} OR
        apellido ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        telefono ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(rows.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}
