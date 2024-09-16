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
    .regex(/^[a-zA-Z0-9\s]+$/, {
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

    console.log("cant frontEnd: ", frontEnd)
    console.log("cant backend: ", backend)
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
    const { rows: cant_estudiantes } = await sql` SELECT 
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

    const { rows: result_mentor_ux_ui } = await sql`
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
      `;

    console.log("mentor ux ", result_mentor_ux_ui[0]);

    const { rows: result_mentor_qa } = await sql`
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
      AND m.estado = true
      GROUP BY 
      m.id
      LIMIT 1;
      `;

    console.log("mentor qa ", result_mentor_qa[0]);

    let total_estudiantes: number = cant_estudiantes[0].total_estudiantes;

    const arr_equipos: number[] = [];

    while (total_estudiantes >= tamano) {
      const { rows: result_mentor } = await sql`
        SELECT 
        m.id,
        COALESCE(
              ARRAY_AGG(
                JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
              ) FILTER (WHERE t.id IS NOT NULL), 
              '{}'  -- Si no hay tecnologías, devuelve un array vacío
              ) AS tecnologias
              FROM 
              mentores m
              JOIN 
              mentores_tecnologias mt ON m.id = mt.id_mentor
              JOIN 
              tecnologias t ON mt.id_tecnologia = t.id
              LEFT JOIN 
            equipos e ON m.id = e.id_mentor 
        WHERE 
        t.tipo = 'BACKEND' 
        AND e.id IS NULL 
        AND m.estado = true
        GROUP BY 
        m.id
        LIMIT 1;
        `;

      console.log("mentor ", result_mentor[0]);

      if (!result_mentor.length) break;

      const { rows: result_ux_ui } = await sql`
      SELECT 
      e.id
      FROM 
      estudiantes e
      JOIN 
                estudiantes_tecnologias et ON e.id = et.id_estudiante
                JOIN 
                tecnologias t ON et.id_tecnologia = t.id
              LEFT JOIN 
                equipos_estudiantes ee ON e.id = ee.id_estudiante
              WHERE 
              ee.id_equipo IS NULL 
              AND t.tipo = 'INTERFACE'
              AND e.estado = true
              LIMIT
              1;
              `;

      console.log("ux_ui ", result_ux_ui[0]);

      if (!result_ux_ui.length) break;

      arr_equipos.push(result_ux_ui[0].id);

      const { rows: result_qa } = await sql`
      SELECT 
      e.id
          FROM 
            estudiantes e
          JOIN 
          estudiantes_tecnologias et ON e.id = et.id_estudiante
          JOIN 
          tecnologias t ON et.id_tecnologia = t.id
          LEFT JOIN 
          equipos_estudiantes ee ON e.id = ee.id_estudiante
          WHERE 
          ee.id_equipo IS NULL 
          AND t.tipo = 'TESTING'
          AND e.estado = true
          LIMIT 1;
          `;

      if (!result_qa.length) break; //ver el length si es igual a cero no por id

      console.log("qa ", result_qa);

      arr_equipos.push(result_qa[0].id);

      //podria ordenar por front end y despues por back end para luego tomar los que faltan siempre
      const {rows:result_frontEnd} = await sql`
          SELECT 
          e.id
          FROM 
          estudiantes e
          JOIN 
          estudiantes_tecnologias et ON e.id = et.id_estudiante
          JOIN 
          tecnologias t ON et.id_tecnologia = t.id
              LEFT JOIN 
              equipos_estudiantes ee ON e.id = ee.id_estudiante
              WHERE 
              ee.id_equipo IS NULL   
                AND t.tipo = 'FRONTEND'  
                AND e.estado = true
              LIMIT 
              ${frontEnd}
              `;

      if (!result_frontEnd.length) break; //VER QUE PARA SI NO TENGO DE FRINT END PUEDO LLENAR CON LO QUE FALTA CON LOS DE BACKEND

      console.log(result_frontEnd);
      console.log("here");

      result_frontEnd.forEach((e) => arr_equipos.push(e.id));

      //podria ordenar pór backend y front end para luego tomar los que me faltan en backend pero es bac hay que tener cuidado, luego ver sino hay de la tecnologia del mentor.
      //ver despues si no encuentra la cantidad de la tecnoligía principal asociada al mentor
      const { rows: result_backend } = await sql`
        SELECT 
          e.id
        FROM 
          estudiantes e
        JOIN 
          estudiantes_tecnologias et ON e.id = et.id_estudiante
        JOIN 
          tecnologias t ON et.id_tecnologia = t.id
        LEFT JOIN 
          equipos_estudiantes ee ON e.id = ee.id_estudiante
        WHERE 
          ee.id_equipo IS NULL  
          AND t.nombre = 'NODE'  
          AND t.tipo = 'BACKEND'  
          AND e.estado = true
        LIMIT 
          ${backend}`;

      if (!result_backend.length) break; //VER QUE PARA SI NO TENGO DE FRINT END PUEDO LLENAR CON LO QUE FALTA CON LOS DE BACKEND

      console.log("bacnkend",result_backend);
      result_backend.forEach((e) => arr_equipos.push(e.id));

      //despues ver lo de la fecha
      // const { rows: result_equipo } = await sql`
      //       INSERT INTO equipos (nombre, tamano, fecha_inicio, fecha_fin, id_mentor, id_mentor_ux_ui, id_mentor_qa)
      //       VALUES ("${nombre}-${contador}",${tamano}, ${new Date().toISOString()},${new Date().toISOString()},
      //       ${result_mentor[0].id},${result_mentor_ux_ui[0].id},${
      //   result_mentor_qa[0].id
      // })
      //       RETURNING id
      //     `;

      // arr_equipos.forEach(async (e) => {
      //   await sql`INSERT INTO equipos_estudiantes(id_equipo, id_estudiante)
      //     VALUES (${result_equipo[0].id},${e})
      //   `;
      // });

      total_estudiantes -= tamano;
      contador++;
      //reiniciar el array
      console.log(arr_equipos);
      arr_equipos.push(99);
    }

    return NextResponse.json(
      createResponse(true, [], "Creación de equipos exitosa"),
      {
        status: 200,
      }
    );

    if (total_estudiantes) {
      //agoritmo de distribucion

      try {
        const { rows: estudiantes_sin_grupos } = await sql`
        SELECT 
        e.id AS id_estudiante
        FROM 
            estudiantes e
            LEFT JOIN 
            equipos_estudiantes ee ON e.id = ee.id_estudiante
            JOIN 
            estudiantes_tecnologias et ON e.id = et.id_estudiante
        JOIN 
            tecnologias t ON et.id_tecnologia = t.id
        WHERE 
            ee.id_equipo IS NULL  -- Asegura que no están asociados a ningún equipo
        ORDER BY 
            t.nombre;  -- Ordena los resultados por tecnología
            `;

        //SI SON 1MILLON DE GRUPOS NO LOS TRAERIA A MEMORIA SINO LOS AGREGARIA/TRAERIA CON UN OFFSET Y UN LIMIRT DE A UNO
        const { rows: total_grupos } = await sql`
            SELECT 
              eq.id AS id_equipo
            FROM 
              equipos eq
            JOIN 
              mentores m ON eq.id_mentor = m.id
            JOIN 
              mentores_tecnologias mt ON m.id = mt.id_mentor
            JOIN 
              tecnologias t ON mt.id_tecnologia = t.id
            ORDER BY 
              t.nombre DESC;  -- Ordena los equipos por el nombre de la tecnología del mentor
            `;

        for (let i = 0; i < total_estudiantes; i++) {
          //VER SI HACERLO CON WHILE PARA PODER DESTRIBUIR CON TA TIPO DE TECNOLOGIA PARA CADA ESTUDIANTE EN CADA EQUIPO, SINO REPARTILOS ASI NOMAS PRIMERO LYEGO VER
        }
      } catch (error) {
        return NextResponse.json(
          createResponse(false, [], getErrorMessageFromCode(error)),
          {
            status: 500,
          }
        );
      }
    }

    return NextResponse.json(
      createResponse(true, [], "Creación de equipos exitosa"),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { rows: result_mentor } = await sql`
    SELECT 
    m.id,
    COALESCE(
        ARRAY_AGG(
            JSON_BUILD_OBJECT('id', t.id, 'nombre', t.nombre, 'tipo', t.tipo)
        ) FILTER (WHERE t.id IS NOT NULL), 
        '{}'  -- Si no hay tecnologías, devuelve un array vacío
    ) AS tecnologias
FROM 
    mentores m
JOIN 
    mentores_tecnologias mt ON m.id = mt.id_mentor
JOIN 
    tecnologias t ON mt.id_tecnologia = t.id
LEFT JOIN 
    equipos e ON m.id = e.id_mentor 
WHERE 
    t.tipo = 'BACKEND' 
    AND e.id IS NULL 
    AND m.estado = true
GROUP BY 
    m.id;
              `;

    console.log(result_mentor);

    return NextResponse.json(
      createResponse(true, [result_mentor], "consulta exitosa"),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
