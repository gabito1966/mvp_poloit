import { equiposDistribution } from "@/database/data";
import { CreateEquipos, Equipos } from "@/lib/definitions/validationZodDefinitions";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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

  const inicio = fecha_inicio.toISOString().split("T")[0];
  const fin = fecha_fin.toISOString().split("T")[0];

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

    const { rows: cant_equipos } = await sql`
         SELECT COUNT(*) AS total_equipos
         FROM equipos;
        `;

    if (cant_equipos.length == 0 && total_estudiantes < tamano) {
      return NextResponse.json(
        createResponse(
          false,
          [],
          `No hay suficientes estudiantes para formar equipos`
        ),
        { status: 400 }
      );
    }

    if (cant_equipos[0].total_equipos > 0 && total_estudiantes < tamano) {

      await equiposDistribution(total_estudiantes, cant_equipos);

      return NextResponse.json(
        createResponse(true, [], "Distribución de estudiantes exitosa"),
        {
          status: 200,
        }
      );
    }

    if (
      cant_equipos[0].total_equipos > 0 &&
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
        AND m.estado = true
      GROUP BY 
        m.id
      LIMIT
        1;
      `;

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

    if (result_mentor_qa.length == 0 || result_mentor_ux_ui.length == 0) {
      return NextResponse.json(
        createResponse(
          false,
          [],
          `No hay suficientes mentores de ${!result_mentor_qa.length ? "QA" : "UX/UI"
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

      if (!result_qa.length) break;

      arr_equipos.push(result_qa[0].id);

      
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

      if (result_frontEnd.length < frontEnd) break; 

      result_frontEnd.forEach((e) => arr_equipos.push(e.id));

      
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

      const name: string = `${nombre}-${contador}`;

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
      revalidatePath("/register/equipos")

    }

    if (total_estudiantes) {

      await equiposDistribution(total_estudiantes, cant_equipos);

      return NextResponse.json(
        createResponse(true, [], "Creación y distribucion de equipos exitosa"),
        {
          status: 200,
        }
      );

    }

    revalidatePath("/");
    revalidatePath("/equipo");

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

    return NextResponse.json(
      createResponse(true, [result_mentor], "Consulta exitosa"),
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
    DELETE FROM correo_equipo;
        `;
        
    await sql`
    DELETE FROM correo_estudiante;
        `;
    
    await sql`
      DELETE FROM equipos;
    `;
    
    await sql`
      DELETE FROM correos;
    `;
    
    revalidatePath("/");
    revalidatePath("/equipo");
    revalidatePath("/register/equipos");
    revalidatePath("/notificaciones/equipo");
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
