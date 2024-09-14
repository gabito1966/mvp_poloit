import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

const CreateSchemaEquipos = z.object({
  id: z.coerce.number({
    invalid_type_error: "El ID debe ser de tipo número",
    message: "Ingrese un ID",
  }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "No se permiten símbolos, solo letras y números",
    }),
  tamano: z.coerce
    .number({
      invalid_type_error: "El tamaño debe ser un número",
      message: "Ingrese un tamaño",
    })
    .gt(0, { message: "Ingrese un numero mayor 0" })
    .lt(12, "El tamaño o debe ser menor a 12"),
  fecha_inicio: z.date().optional(),
  fecha_fin: z.date().optional(),
});

const CreateEquipos = CreateSchemaEquipos.omit({ id: true });

type Equipos = z.infer<typeof CreateSchemaEquipos>;
export async function POST(request: Request) {
  const body = (await request.json()) as Equipos;

  const validatedFields = CreateEquipos.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en algún campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { nombre, tamano, fecha_inicio, fecha_fin } = validatedFields.data;

  let contador: number = 1;

  const frontEnd = Math.floor((tamano - 2) * 0.4),
    backend = Math.ceil((tamano - 2) * 0.6);

  try {
    /* estudiante que no tienen equipo hacer limit para obtener el primero con cierta tecnologia
   SELECT 
    e.id,
    e.nombre,
    e.apellido,
    e.email,
    e.telefono,
    e.estado,
    ongs.id AS id_ong,
    ongs.nombre AS nombre_ong,
    COALESCE(
        ARRAY_AGG(tecnologias.nombre) 
        FILTER (WHERE tecnologias.id IS NOT NULL), 
        '{}'
    ) AS tecnologias
FROM 
    estudiantes e
LEFT JOIN 
    equipos_estudiantes ee ON e.id = ee.id_estudiante
LEFT JOIN 
    ongs ON e.id_ong = ongs.id
LEFT JOIN 
    estudiantes_tecnologias et ON e.id = et.id_estudiante
LEFT JOIN 
    tecnologias ON et.id_tecnologia = tecnologias.id
WHERE 
    ee.id_estudiante IS NULL 
    AND e.estado = true
GROUP BY 
    e.id, ongs.id;
    */

    /* mentores que no tienen equipos hacer limit para obtener el primer mentor que con cierta tecnologia
 SELECT 
    mentores.id,
    mentores.nombre,
    mentores.apellido,
    mentores.email,
    mentores.telefono,
    empresas.id AS id_empresa,
    empresas.nombre AS nombre_empresa,
    COALESCE(
        ARRAY_AGG(tecnologias.nombre) 
        FILTER (WHERE tecnologias.id IS NOT NULL), 
        '{}'
    ) AS tecnologias
FROM 
    mentores
LEFT JOIN 
    equipos ON mentores.id = equipos.id_mentor
JOIN 
    empresas ON mentores.id_empresa = empresas.id
LEFT JOIN 
    mentores_tecnologias ON mentores.id = mentores_tecnologias.id_mentor
LEFT JOIN 
    tecnologias ON mentores_tecnologias.id_tecnologia = tecnologias.id
WHERE 
    equipos.id IS NULL 
    AND mentores.estado = true
GROUP BY 
    mentores.id, empresas.id;
    */

    /*cantidad de estudiantes que no tienen equipo
    SELECT 
    COUNT(*) AS total_estudiantes_sin_equipos
FROM 
    estudiantes e
LEFT JOIN 
    equipos_estudiantes ee ON e.id = ee.id_estudiante
WHERE 
    ee.id_estudiante IS NULL 
    AND e.estado = true;
    */

    /* cantidad e mentores que no tienen equipo
    SELECT 
    COUNT(*) AS total_mentores_sin_equipo
FROM 
    mentores m
LEFT JOIN 
    equipos e ON m.id = e.id_mentor
WHERE 
    e.id_mentor IS NULL 
    AND m.estado = true;
    */

    /* total equipos
    SELECT 
    COUNT(*) AS total_equipos
FROM 
    equipos
    */

    ///DESSESTRUCTURAR Y cambiar nombre al mismo tiempo----
    const { rows:cant_estudiantes } = await sql` SELECT 
        COUNT(*) AS total_estudiantes
      FROM 
        estudiantes e
      LEFT JOIN 
        equipos_estudiantes ee ON e.id = ee.id_estudiante
      WHERE 
        ee.id_estudiante IS NULL 
      AND e.estado = true;`;

    //if (!rows[0].total_estudiantes) return;
    //si la cantidad de estudiantes sin grupos es menor al tamano y la cantidad de grupos es cero, no se pueden armar grupos, no hay suficientes estudiantes o la cantidad de grupos es cero y la cantidad de mentores es cero entoces no se pueden armar grupos por que no hay suficientes mentores.

    //si ya hay equipos sacar el ultimo valor del ultimo equipo agregado y spasarlo a number y sumarlo en las iteraciones. o setearlo en cero para que no sume nada al final de cada iteracion que sea una variable aparte.

    const {rows: result_mentor_ux_ui} = await sql`
      SELECT 
        m.id,
        ARRAY_AGG(
            JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
        ) AS tecnologias
      FROM 
        mentores m
      JOIN 
        mentores_tecnologias mt ON m.id = mt.id_mentor
      JOIN 
        tecnologias t ON mt.id_tecnologia = t.id
      WHERE 
        t.tipo = 'TESTING'
        AND estado = true
      GROUP BY 
        m.id
      LIMIT 1;
        `
    const {rows: result_mentor_qa} = await sql`
      SELECT 
        m.id,
        ARRAY_AGG(
        JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
        ) AS tecnologias
      FROM 
        mentores m
      JOIN 
        mentores_tecnologias mt ON m.id = mt.id_mentor
      JOIN 
        tecnologias t ON mt.id_tecnologia = t.id
      WHERE 
        t.tipo = 'INTERFACE' AND
        m.estado = true
      GROUP BY 
        m.id
      LIMIT 1;
    `


    let total_estudiantes: number =cant_estudiantes[0].total_estudiantes;

    //tomar 1 mentor de qa, 1 mentor de ux_ui

    const arr_equipos: number[] = [];

    while (total_estudiantes >= tamano) {
      const {rows:result_mentor} = await sql`
        SELECT 
            m.id,
            COALESCE(
                ARRAY_AGG(
                    JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
                ) FILTER (WHERE t.id IS NOT NULL),
                '{}'
            ) AS tecnologias
        FROM 
            mentores m
        LEFT JOIN 
            mentores_tecnologias mt ON m.id = mt.id_mentor
        LEFT JOIN 
            tecnologias t ON mt.id_tecnologia = t.id
        LEFT JOIN 
            equipos e ON m.id = e.id_mentor 
                        OR m.id = e.id_mentor_ux_ui 
                        OR m.id = e.id_mentor_qa
        WHERE 
            e.id IS NULL  -- Mentores que no están asociados a ningún equipo
        GROUP BY 
            m.id
        HAVING 
            m.estado = true
        LIMIT 1;
              `;

      if (!result_mentor.length) break;

      const {rows:result_ux_ui} = await sql`
          SELECT 
            e.id,
            COALESCE(
            ARRAY_AGG(tecnologias.nombre) 
            FILTER (WHERE tecnologias.id IS NOT NULL), 
            '{}'
            ) AS tecnologias
          FROM 
            estudiantes e
          LEFT JOIN 
            equipos_estudiantes ee ON e.id = ee.id_estudiante
          LEFT JOIN 
            estudiantes_tecnologias et ON e.id = et.id_estudiante
          LEFT JOIN 
            tecnologias ON et.id_tecnologia = tecnologias.id
          WHERE 
            ee.id_estudiante IS NULL 
            AND e.estado = true
            AND tecnologias.nombre ILIKE '%UX/UI%'
          GROUP BY 
            e.id
          LIMIT 1;
            `;

      if (!result_ux_ui.length) break;

      arr_equipos.push(result_ux_ui[0].id);

      const result_qa = await sql`
          SELECT 
            e.id,
            COALESCE(
            ARRAY_AGG(tecnologias.nombre) 
            FILTER (WHERE tecnologias.id IS NOT NULL), 
            '{}'
            ) AS tecnologias
          FROM 
              estudiantes e
          LEFT JOIN 
              equipos_estudiantes ee ON e.id = ee.id_estudiante
          LEFT JOIN 
              estudiantes_tecnologias et ON e.id = et.id_estudiante
          LEFT JOIN 
              tecnologias ON et.id_tecnologia = tecnologias.id
          WHERE 
              ee.id_estudiante IS NULL 
              AND e.estado = true
              AND tecnologias.nombre ILIKE '%QA%'
          GROUP BY 
              e.id
          LIMIT 1;
          `;

      if (!result_qa.rows.length) break; //ver el length si es igual a cero no por id

      arr_equipos.push(result_qa.rows[0].id);

      //podria ordenar por front end y despues por back end para luego tomar los que faltan siempre
      const result_frontEnd = await sql`
          SELECT 
            e.id,
            COALESCE(
            ARRAY_AGG(tecnologias.nombre) 
            FILTER (WHERE tecnologias.id IS NOT NULL), 
            '{}'
            ) AS tecnologias
          FROM 
              estudiantes e
          LEFT JOIN 
              equipos_estudiantes ee ON e.id = ee.id_estudiante
          LEFT JOIN 
              estudiantes_tecnologias et ON e.id = et.id_estudiante
          LEFT JOIN 
              tecnologias ON et.id_tecnologia = tecnologias.id
          WHERE 
              ee.id_estudiante IS NULL 
              AND e.estado = true
              AND tecnologias.tipo ILIKE '%FRONTEND%'
          GROUP BY 
              e.id
          LIMIT ${frontEnd};
          `;

      if (!result_frontEnd.rows.length) break;//VER QUE PARA SI NO TENGO DE FRINT END PUEDO LLENAR CON LO QUE FALTA CON LOS DE BACKEND

      result_frontEnd.rows.forEach(e=> arr_equipos.push(e.id))

      
      //podria ordenar pór backend y front end para luego tomar los que me faltan en backend pero es bac hay que tener cuidado, luego ver sino hay de la tecnologia del mentor.
      //ver despues si no encuentra la cantidad de la tecnoligía principal asociada al mentor
      const result_backend = await sql`
          SELECT 
            e.id,
            COALESCE(
            ARRAY_AGG(tecnologias.nombre) 
            FILTER (WHERE tecnologias.id IS NOT NULL), 
            '{}'
            ) AS tecnologias
          FROM 
              estudiantes e
          LEFT JOIN 
              equipos_estudiantes ee ON e.id = ee.id_estudiante
          LEFT JOIN 
              estudiantes_tecnologias et ON e.id = et.id_estudiante
          LEFT JOIN 
              tecnologias ON et.id_tecnologia = tecnologias.id
          WHERE 
              ee.id_estudiante IS NULL 
              AND e.estado = true
              AND tecnologias.nombre ILIKE '%${result_mentor[0].tecnologia[0].nombre}%'
          GROUP BY 
              e.id
          LIMIT ${backend};
          `;

          if (!result_backend.rows.length) break;//VER QUE PARA SI NO TENGO DE FRINT END PUEDO LLENAR CON LO QUE FALTA CON LOS DE BACKEND

          result_backend.rows.forEach(e=> arr_equipos.push(e.id))


          //despues ver lo de la fecha
        const {rows:result_equipo}=   await sql`
            INSERT INTO equipos (nombre, tamano, fecha_inicio, fecha_fin, id_mentor, id_mentor_ux_ui, id_mentor_qa)
            VALUES ("${nombre}-${contador}",${tamano}, ${new Date().toISOString()},${new Date().toISOString()},${result_mentor[0].id},${result_mentor_ux_ui[0].id},${result_mentor_qa[0].id})
            RETURNING id
          `

      arr_equipos.forEach(async (e) => {
        await sql`insert into equipos_estudiantes(id_equipo, id_estudiante)
          VALUES (${e}, ${result_equipo[0].id})
        `;
      });

      total_estudiantes -= tamano;
      contador++;
    }

    if (total_estudiantes) {
      //agoritmo de distribucion

      

    }

    
      return NextResponse.json(createResponse(true, [], "consulta exitosa"), {
        status: 200,
      });
    
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const {rows:result_mentor} = await sql`
            SELECT 
            m.id,
            COALESCE(
                ARRAY_AGG(
                    JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
                ) FILTER (WHERE  tecnologias.id IS NOT NULL),
                '{}'
            ) AS tecnologias
        FROM 
            mentores m
        LEFT JOIN 
            mentores_tecnologias mt ON m.id = mt.id_mentor
        LEFT JOIN 
            tecnologias t ON mt.id_tecnologia = t.id
        LEFT JOIN 
            equipos e ON m.id = e.id_mentor 
        WHERE 
            e.id IS NULL  -- Mentores que no están asociados a ningún equipo
            AND tecnologias.tipo = 'BACKEND'
        GROUP BY 
            m.id
              `;

    console.log(result_mentor);
    
      return NextResponse.json(createResponse(true, [result_mentor], "consulta exitosa"), {
        status: 200,
      });
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
