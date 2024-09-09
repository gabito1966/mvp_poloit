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
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "No se permiten símbolos, solo letras y números",
    }),
  tamano: z
    .number({ message: "Ingrese un tamaño" })
    .int("Debe ser un número entero")
    .min(5, "El tamaño o debe ser mayor a 0")
    .max(12, "El tamaño o debe ser menor a 12"),
  fecha_inicio: z.date().optional(),
  fecha_fin: z.date().optional(),
});

const CreateEquipos = CreateSchemaEquipos.omit({ id: true });

type Equipos = z.infer<typeof CreateSchemaEquipos>;
export async function GET(request: Request) {
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

  try {
    /* estudiante que no tienen equipo hacer limit para obtener el primero con cierta tecnologia
   SELECT 
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
  } catch (error) {
    return NextResponse.json(
      createResponse(false, [], getErrorMessageFromCode(error)),
      { status: 500 }
    );
  }

  NextResponse.json(createResponse(true, [], "consulta exitosa"), {
    status: 200,
  });
}
