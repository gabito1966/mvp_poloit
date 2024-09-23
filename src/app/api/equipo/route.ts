import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
      message: "Solo se permiten letras y números",
    }),
  tamano: z.coerce
    .number({
      invalid_type_error: "El tamaño debe ser un número",
      message: "Ingrese un tamaño",
    })
    .gt(4, { message: "Ingrese un numero mayor 4" })
    .lt(12, "El tamaño o debe ser menor a 12"),
  fecha_inicio: z.coerce.date({message:"Ingrese una fecha de inicio"}),
  fecha_fin: z.coerce.date({message:"Ingrese una fecha final de entrega"}),
});

const CreateEquipos = CreateSchemaEquipos.omit({ id: true }).refine((data) => data.fecha_inicio < data.fecha_fin, {
  message: "La fecha de inicio debe ser anterior a la fecha de fin",
  path: ["fecha_fin"], // Esta es la propiedad a la que se le asigna el error
});

type Equipos = z.infer<typeof CreateSchemaEquipos>;
export async function POST(request: Request) {
  const body = (await request.json()) as Equipos;

  console.log(body);

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

  const inicio = fecha_inicio.toISOString().split("T")[0];
  const fin = fecha_fin.toISOString().split("T")[0];

  console.log("fecha inicio", inicio);
  console.log("fecha fin", fin);

  const frontEnd = Math.floor((tamano - 2) * 0.4),
    backend = Math.ceil((tamano - 2) * 0.6);

  try {
    const { rows: cant_estudiantes } = await sql`
      SELECT 
        COUNT(*) AS total_estudiantes
      FROM 
        estudiantes e
      LEFT JOIN 
        equipos_estudiantes ee ON e.id = ee.id_estudiante
      WHERE 
        ee.id_estudiante IS NULL 
        AND e.estado = true;`;

    let total_estudiantes: number = cant_estudiantes[0].total_estudiantes;

    const { rows: cant_grupos } = await sql`
         SELECT COUNT(*) AS total_grupos
         FROM equipos;
        `;

    console.log(cant_grupos);

    if (cant_grupos.length == 0 && total_estudiantes < tamano) {
      return NextResponse.json(
        createResponse(
          false,
          [],
          `No hay suficientes estudiantes para formar equipos`
        ),
        { status: 400 }
      );
    }

    if (cant_grupos[0].total_grupos > 0 && total_estudiantes < tamano) {
      let index_grupos: number = 0;
      let index_estudiantes: number = 0;

      while (total_estudiantes != 0) {
        //veer fecha
        console.log("dentre");

        const { rows: equipoResult } = await sql`
        SELECT eq.id as id
        FROM equipos eq
        LEFT JOIN equipos_estudiantes ee ON eq.id = ee.id_equipo
        GROUP BY eq.id
        ORDER BY COUNT(ee.id_estudiante) ASC  -- Ordena los equipos por la cantidad de estudiantes en el grupo (de menor a mayor)
        LIMIT 1 
        OFFSET ${index_grupos}
           `;

        console.log(equipoResult);

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
        index_grupos =
          cant_grupos[0].total_grupos - 1 < index_grupos ? index_grupos++ : 0;
      }

      revalidatePath("/");
      revalidatePath("/grupo");
      return NextResponse.json(
        createResponse(true, [], "Creación de equipos exitosa"),
        {
          status: 200,
        }
      );
    }

    if (
      cant_grupos[0].total_grupos > 0 &&
      cant_estudiantes[0].total_estudiantes >= tamano
    ) {
      const { rows: result_ultimo_equipo } = await sql`
        SELECT 
          nombre 
        FROM
         equipos
        ORDER BY
          id DESC
        LIMIT
          1;
      `;
      const nombre = result_ultimo_equipo[0].nombre;
      const id = parseInt(nombre.split("-")[1]);
      contador = id + 1;
    }

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
        t.tipo = 'INTERFACE'
        AND estado = true
      GROUP BY 
        m.id
      LIMIT
        1;
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
        t.tipo = 'TESTING'
        AND m.estado = true
      GROUP BY 
        m.id
      LIMIT
        1;
      `;

    console.log("mentor qa ", result_mentor_qa[0]);

    if (result_mentor_qa.length == 0 || result_mentor_ux_ui.length == 0) {
      return NextResponse.json(
        createResponse(
          false,
          [],
          `No hay suficientes mentores de ${
            !result_mentor_qa.length ? "QA" : "UX/UI"
          } para formar equipos`
        ),
        { status: 400 }
      );
    }

    let arr_equipos: number[] = [];

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
        LIMIT
          1;
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
        LIMIT
          1;
          `;

      if (!result_qa.length) break; //ver el length si es igual a cero no por id

      console.log("qa ", result_qa);

      arr_equipos.push(result_qa[0].id);

      //podria ordenar por front end y despues por back end para luego tomar los que faltan siempre
      const { rows: result_frontEnd } = await sql`
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
      console.log(result_frontEnd);

      if (result_frontEnd.length < frontEnd) break; //VER QUE PARA SI NO TENGO DE FRINT END PUEDO LLENAR CON LO QUE FALTA CON LOS DE BACKEND

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
        AND t.nombre = ${result_mentor[0].tecnologias[0].nombre}
        AND t.tipo = 'BACKEND'  
        AND e.estado = true
        LIMIT 
        ${backend}`;

      console.log("bacnkend1", result_backend);
      if (result_backend.length < backend) {
        //VER QUE PARA SI NO TENGO DE FRINT END PUEDO LLENAR CON LO QUE FALTA CON LOS DE BACKEND
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
        AND t.nombre = ${result_mentor[0].tecnologias[1].nombre}
        AND t.tipo = 'BACKEND'  
        AND e.estado = true
        LIMIT 
        ${backend}`;

        if (result_backend.length < backend) {
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
          AND t.tipo = 'BACKEND'  
          AND e.estado = true
        LIMIT 
          ${backend}`;

          if (result_backend.length < backend) break;
          result_backend.forEach((e) => arr_equipos.push(e.id));
        } else {
          result_backend.forEach((e) => arr_equipos.push(e.id));
        }
      } else {
        result_backend.forEach((e) => arr_equipos.push(e.id));
      }

      console.log("bacnkend2", result_backend);

      const name: string = `${nombre}-${contador}`;

      //ver fecha
      const { rows: result_equipo } = await sql`
          INSERT INTO equipos (nombre, tamano, id_mentor, id_mentor_ux_ui, id_mentor_qa, fecha_inicio, fecha_fin)
          VALUES (${name},${tamano}, ${result_mentor[0].id},${result_mentor_ux_ui[0].id},${result_mentor_qa[0].id}, ${inicio}, ${fin})
          RETURNING id;`;

      arr_equipos.forEach(async (e) => {
        await sql`INSERT INTO equipos_estudiantes(id_equipo, id_estudiante)
          VALUES (${result_equipo[0].id},${e})
        `;
      });

      total_estudiantes -= tamano;
      contador++;
      arr_equipos = [];
      console.log(arr_equipos);
    }

    if (total_estudiantes) {
      //agoritmo de distribucion

      const { rows: cant_grupos } = await sql`
          SELECT COUNT(*) AS total_grupos
          FROM equipos;
        `;
      let index_grupos: number = 0;
      let index_estudiantes: number = 0;

      while (total_estudiantes) {
        const { rows: equipoResult } = await sql`
        SELECT eq.id as id
        FROM equipos eq
        LEFT JOIN equipos_estudiantes ee ON eq.id = ee.id_equipo
        GROUP BY eq.id
        ORDER BY COUNT(ee.id_estudiante) ASC  -- Ordena los equipos por la cantidad de estudiantes en el grupo (de menor a mayor)
        LIMIT 1 
        OFFSET ${index_grupos}
           `;

        console.log(equipoResult);

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
        //actializar tabla de prupos sumar al grupo +1 tamnaño

        // await sql`
        //   UPDATE equipos
        //   SET tamano = tamano + 1
        //   WHERE id = ${equipoResult[0].id}
        // `;

        total_estudiantes--;
        if (!total_estudiantes) break;
        index_grupos =
          cant_grupos[0].total_grupos - 1 < index_grupos ? index_grupos++ : 0;
      }
    }

    revalidatePath("/");
    revalidatePath("/grupo");

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
      select * from equipos;
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

export async function DELETE(request: Request) {
  try {
    await sql`
      DELETE FROM equipos_estudiantes;
    `;

    await sql`
      DELETE FROM equipos;
    `;

    revalidatePath("/grupo");
    revalidatePath("/");
    return NextResponse.json(
      createResponse(true, [], "Eliminación de equipos exitosa"),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }
}
