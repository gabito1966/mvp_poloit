import { EstudianteSinGrupos, MentorSinGrupo } from "@/lib/definitions/frontEndDefinitions";
import { QueryResultRow, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import {
  empresas,
  EquipoEliminadoData,
  EstudianteBajaData,
  EstudianteFetch,
  EstudiantesData,
  MentorBajaData,
  MentorData,
  Ong,
  TecnologiaConEstudiantes,
  TipoEMails,
} from "./definitions";

const ITEMS_PER_PAGE = 7;

export async function fetchFilteredEstudiantes(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const filter: string = query.replaceAll(" ", "");

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
    (e.nombre ILIKE ${`%${filter}%`} OR
    e.apellido ILIKE ${`%${filter}%`} OR
    e.email ILIKE ${`%${filter}%`} OR
    e.telefono ILIKE ${`%${filter}%`} OR
    CONCAT(e.nombre,e.apellido) ILIKE ${`%${filter}%`} OR
    CONCAT(e.apellido,e.nombre) ILIKE ${`%${filter}%`} OR
    CONCAT(e.nombre,' ',e.apellido) ILIKE ${`%${query.trim()}%`} OR
    CONCAT(e.apellido,' ',e.nombre) ILIKE ${`%${query.trim()}%`})
    AND  e.estado = true
GROUP BY 
    e.id, o.id
ORDER BY 
    e.apellido
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

  const filter: string = query.replaceAll(" ", "");

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
    (m.nombre ILIKE ${`%${filter}%`} OR
    m.nombre ILIKE ${`%${query}%`} OR
    m.apellido ILIKE ${`%${filter}%`} OR
    m.apellido ILIKE ${`%${query}%`} OR
    m.email ILIKE ${`%${filter}%`} OR
    m.email ILIKE ${`%${query}%`} OR
    m.telefono ILIKE ${`%${filter}%`} OR
    CONCAT(m.nombre,m.apellido) ILIKE ${`%${filter}%`} OR
    CONCAT(m.apellido,m.nombre) ILIKE ${`%${filter}%`} OR
    CONCAT(m.nombre,' ',m.apellido) ILIKE ${`%${query.trim()}%`} OR
    CONCAT(m.apellido,' ',m.nombre) ILIKE ${`%${query.trim()}%`}) AND
    m.estado = true
GROUP BY 
    m.id, e.id
ORDER BY 
    m.apellido
LIMIT ${ITEMS_PER_PAGE}
OFFSET ${offset};
    `;

    return mentores.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered equipos. Returning all equipos.",
      error
    );
    return [];
  }
}

export async function fetchFilteredEquipos(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
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
        e.nombre ILIKE ${`%${query.trim()}%`})
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
        o.nombre ILIKE ${`%${query}%`} OR
        o.nombre ILIKE ${`%${query.trim()}%`}
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
  const filter: string = query.replaceAll(" ", "");

  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM estudiantes e
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
export async function fetchPagesEstudiantesBaja(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM estudiantes
      WHERE
       ( nombre ILIKE ${`%${query}%`} OR
        apellido ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`})
        AND estado = false
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
export async function fetchPagesMentoresBaja(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM mentores
      WHERE
       ( nombre ILIKE ${`%${query}%`} OR
        apellido ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`})
        AND estado = false
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
export async function fetchPagesEquiposBaja(query: string) {
  try {
    const rows = await sql`
      SELECT COUNT(*)
      FROM auditoria_equipos
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
    const cantMentores = Number(data[1].rows[0].count ?? "0");
    const cantEquipos = Number(data[2].rows[0].count ?? "0");

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

export async function equiposDistribution(
  total_estudiantes: number,
  cant_equipos: QueryResultRow[]
) {
  let index_equipos: number = 0;
  let index_estudiantes: number = 0;

  while (total_estudiantes != 0) {
    const { rows: equipoResult } = await sql`
        SELECT eq.id as id
        FROM equipos eq
        LEFT JOIN equipos_estudiantes ee ON eq.id = ee.id_equipo
        GROUP BY eq.id
        ORDER BY COUNT(ee.id_estudiante) ASC  -- Ordena los equipos por la cantidad de estudiantes en el equipo (de menor a mayor)
        LIMIT 1 
        OFFSET ${index_equipos}
           `;

    const equipoId = equipoResult[0].id;

    await sql`     
           INSERT INTO equipos_estudiantes (id_equipo, id_estudiante)
          SELECT ${equipoId}, (
            SELECT e.id
            FROM estudiantes e
            LEFT JOIN equipos_estudiantes ee ON e.id = ee.id_estudiante
            JOIN estudiantes_tecnologias et ON e.id = et.id_estudiante
            JOIN tecnologias t ON et.id_tecnologia = t.id 
            WHERE ee.id_equipo IS NULL AND e.estado = true
            ORDER BY t.nombre
            LIMIT 1
            OFFSET ${index_estudiantes}
          );
          `;

    await sql`UPDATE 
            equipos 
            SET tamano = tamano + 1
            WHERE id = ${equipoId};
          `;

    total_estudiantes--;
    if (!total_estudiantes) break;
    index_equipos =
      cant_equipos[0].total_equipos - 1 < index_equipos ? index_equipos++ : 0;
  }

  revalidatePath("/");
  revalidatePath("/equipo");
  revalidatePath("/register/equipos");
}

export async function getCantEstudiantesSinGrupo() {
  try {
    const { rows: result } = await sql`SELECT COUNT(*) 
                              FROM estudiantes 
                              WHERE estado = true 
                              AND id NOT IN (
                                  SELECT id_estudiante
                                  FROM equipos_estudiantes
                              )`;

    return result[0].count;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function fetchFilteredMentoresBaja(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const filter: string = query.replaceAll(" ", "");

  try {
    const mentoresBaja = await sql<MentorBajaData>`
      SELECT 
        m.id,
        m.nombre,
        m.apellido,
        m.email,
        am.fecha_baja,
        am.estado
      FROM 
        mentores m
      INNER JOIN 
        auditoria_mentores am ON m.id = am.id_mentor
      WHERE 
        (m.nombre ILIKE ${`%${filter}%`} OR
    m.nombre ILIKE ${`%${query}%`} OR
    m.apellido ILIKE ${`%${filter}%`} OR
    m.apellido ILIKE ${`%${query}%`} OR
    m.email ILIKE ${`%${filter}%`} OR
    m.email ILIKE ${`%${query}%`} OR
    m.telefono ILIKE ${`%${filter}%`} OR
    CONCAT(m.nombre,m.apellido) ILIKE ${`%${filter}%`} OR
    CONCAT(m.apellido,m.nombre) ILIKE ${`%${filter}%`} OR
    CONCAT(m.nombre,' ',m.apellido) ILIKE ${`%${query.trim()}%`} OR
    CONCAT(m.apellido,' ',m.nombre) ILIKE ${`%${query.trim()}%`}) AND
    m.estado = false
      ORDER BY 
        m.apellido
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return mentoresBaja.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered mentores baja. Returning all mentores baja.",
      error
    );
    return [];
  }
}

export async function fetchFilteredEstudiantesBaja(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const filter: string = query.replaceAll(" ", "");

  try {
    const estudiantesBaja = await sql<EstudianteBajaData>`
      SELECT 
        e.id,
        e.nombre,
        e.apellido,
        e.email,
        ae.fecha_baja,
        ae.estado
      FROM 
        estudiantes e
      INNER JOIN 
        auditoria_estudiantes ae ON e.id = ae.id_estudiante
      WHERE 
       (e.nombre ILIKE ${`%${filter}%`} OR
      e.apellido ILIKE ${`%${filter}%`} OR
      e.email ILIKE ${`%${filter}%`} OR
      e.telefono ILIKE ${`%${filter}%`} OR
      CONCAT(e.nombre,e.apellido) ILIKE ${`%${filter}%`} OR
      CONCAT(e.apellido,e.nombre) ILIKE ${`%${filter}%`} OR
      CONCAT(e.nombre,' ',e.apellido) ILIKE ${`%${query.trim()}%`} OR
      CONCAT(e.apellido,' ',e.nombre) ILIKE ${`%${query.trim()}%`}) AND
      e.estado = false
      ORDER BY 
        e.apellido
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return estudiantesBaja.rows;
  } catch (error) {
    console.log(
      "Failed to fetch filtered estudiantes baja. Returning all estudiantes baja.",
      error
    );
    return [];
  }
}

export async function fetchEquiposEliminados(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const equiposEliminados = await sql<EquipoEliminadoData>`
      SELECT 
        ae.id,
        ae.id_equipo,
        ae.nombre,
        ae.cantidad_estudiantes,
        ae.fecha_eliminacion
      FROM 
        auditoria_equipos ae
      WHERE 
        (ae.nombre ILIKE ${`%${query}%`} OR
         ae.nombre ILIKE ${`%${query.trim()}%`})
      ORDER BY 
        ae.id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return equiposEliminados.rows;
  } catch (error) {
    console.log(
      "Failed to fetch equipos eliminados. Returning all equipos eliminados.",
      error
    );
    return [];
  }
}

export async function getEmailsTipo(tipo: string) {
  try {
    const { rows: emailsBienvenida } = await sql`
        SELECT
          c.id AS correo_id,
          c.asunto,
          c.cuerpo,
          c.fecha,
          CONCAT(a.nombre, ' ', a.apellido) AS remitente_nombre,
         e.nombre AS nombres_equipos,
          e.tamano AS cantidad_equipos
        FROM
          correos c
          JOIN tipo_correo tc ON c.tipo_id = tc.id
          JOIN administradores a ON c.remitente_id = a.id
          JOIN correo_equipo ce ON c.id = ce.correo_id
          JOIN equipos e ON ce.equipo_id = e.id
        WHERE
          tc.tipo = ${tipo}
        GROUP BY
          c.id,
          c.asunto,
          c.cuerpo,
          c.fecha,
          a.nombre,
          a.apellido,
          e.tamano,
          e.nombre
        ORDER BY
          c.fecha DESC;`;

    return emailsBienvenida;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getEmailsTipoSeguimiento() {
  try {
    const { rows: emailsBienvenida } = await sql`
        SELECT
          c.id AS correo_id,
          c.asunto,
          c.cuerpo,
          c.fecha,
          CONCAT(a.nombre, ' ', a.apellido) AS remitente_nombre,
          ARRAY_AGG(e.nombre) AS nombres_estudiantes
         
        FROM
          correos c
          JOIN tipo_correo tc ON c.tipo_id = tc.id
          JOIN administradores a ON c.remitente_id = a.id
          JOIN correo_estudiante ce ON c.id = ce.correo_id
          JOIN estudiantes e ON ce.estudiante_id = e.id
        WHERE
          tc.tipo = 'SEGUIMIENTO'
        GROUP BY
          c.id,
          c.asunto,
          c.cuerpo,
          c.fecha,
          a.nombre,
          a.apellido
        ORDER BY
          c.fecha DESC;`;

    return emailsBienvenida;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTipoEmails() {
  try {
    const { rows: resultTipo } = await sql<TipoEMails>`
    SELECT
      *
    FROM
      tipo_correo
    `;
    return resultTipo;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getEstudiantesSinGrupo() {
  try {
    const { rows: resultEstudiantesSinGrupos } = await sql<EstudianteSinGrupos>`

    SELECT e.*, t.nombre AS tecnologia_nombre
    FROM estudiantes e
    LEFT JOIN equipos_estudiantes ee ON e.id = ee.id_estudiante
    LEFT JOIN estudiantes_tecnologias et ON e.id = et.id_estudiante
    LEFT JOIN tecnologias t ON et.id_tecnologia = t.id
    WHERE ee.id_estudiante IS NULL AND e.estado = true
    ORDER BY 
    e.apellido, e.nombre;
        `;
    return resultEstudiantesSinGrupos;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMentoresTecnicosSinGrupos() {
  try {
    const { rows: resultMentoresTecnicosSinGrupos } =
      await sql<MentorSinGrupo>`
    SELECT m.*, ARRAY_AGG(t.nombre) AS tecnologias
    FROM mentores m
    LEFT JOIN mentores_tecnologias mt ON m.id = mt.id_mentor
    LEFT JOIN tecnologias t ON mt.id_tecnologia = t.id
    LEFT JOIN equipos e ON m.id = e.id_mentor OR m.id = e.id_mentor_ux_ui OR m.id = e.id_mentor_qa
    WHERE t.tipo = 'BACKEND'
    AND e.id IS NULL AND m.estado=true
    GROUP BY m.id
    ORDER BY
    m.apellido, m.nombre;
  `;

    return resultMentoresTecnicosSinGrupos;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMentoresQASinGrupos() {
  try {
    const { rows: resultMentoresQASinGrupos } = await sql<MentorSinGrupo>`
    SELECT m.*, ARRAY_AGG(t.nombre) AS tecnologias
    FROM mentores m
    LEFT JOIN mentores_tecnologias mt ON m.id = mt.id_mentor
    LEFT JOIN tecnologias t ON mt.id_tecnologia = t.id
    WHERE t.tipo = 'TESTING'
    AND m.estado=true
    GROUP BY m.id
    ORDER BY
    m.apellido, m.nombre;
  `;

    return resultMentoresQASinGrupos;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMentoresUXUISinGrupos() {
  try {
    const { rows: resultMentoresUXUISinGrupos } =
      await sql<MentorSinGrupo>`
    SELECT m.*, ARRAY_AGG(t.nombre) AS tecnologias
    FROM mentores m
    LEFT JOIN mentores_tecnologias mt ON m.id = mt.id_mentor
    LEFT JOIN tecnologias t ON mt.id_tecnologia = t.id
    WHERE t.tipo = 'INTERFACE'
    AND m.estado=true
    GROUP BY m.id
    ORDER BY
    m.apellido, m.nombre;
  `;

    return resultMentoresUXUISinGrupos;
  } catch (error) {
    console.log(error);
    return [];
  }
}