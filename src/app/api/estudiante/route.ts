import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { createResponse, getErrorMessageFromCode } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    //faltaria las tecnologias de cada estudiante despues veo que onda
    const { rows } =
      await sql<Estudiante>`SELECT e.*, o.nombre nombre_ong FROM estudiantes e join  ongs o on  e.id_ong = o.id where e.estado = true ORDER BY e.id`;

    return NextResponse.json(createResponse(true, rows, "Consulta Exitosa"), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: [], message: "error en la base de datos" },
      { status: 500 }
    );
  }
}

export interface EstudianteInterface {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: boolean;
  id_ong: number;
  tecnologias: number[];
}

export type Estudiante = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: boolean;
  id_ong: number;
};

export interface EstudianteResponse {
  success: boolean;
  errors?: [];
  data?: [];
  message?: string;
}

const CreateSchemaEstudiante = z.object({
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(4, "el nombre debe de tener al menos 4 caracteres"),
  apellido: z
    .string({ message: "ingrese un apellido" })
    .min(3, "el apellido debe tener al menos 3 caracter"),
  email: z
    .string({ message: "ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "el email debe tener al menos 6 caracteres"),
  telefono: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  id_ong: z.coerce.number({
    invalid_type_error: "seleccione una organización",
  }),
  tecnologias: z
    .array(z.coerce.number({ invalid_type_error: "seleccione una tecnologia" }))
    .min(1, "Debe seleccionar al menos una tecnología"),
});

const CreateEstudiante = CreateSchemaEstudiante.omit({});

export async function POST(request: Request) {
  const body = (await request.json()) as EstudianteInterface;

  const validatedFields = CreateEstudiante.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error En Algun Campo",
        validatedFields.error.flatten().fieldErrors
      ),
      { status: 400 }
    );
  }

  const { nombre, apellido, email, telefono, id_ong, tecnologias } =
    validatedFields.data;

  try {
    const result =
      await sql`INSERT INTO estudiantes ( nombre, apellido, email, telefono, id_ong ) VALUES
     (${nombre},${apellido}, ${email}, ${telefono}, ${id_ong}) RETURNING id`;

    console.log(result);

    try {
      tecnologias.forEach(async (e) => {
        await sql`INSERT INTO estudiantes_tecnologias (id_tecnologia, id_estudiante)
        VALUES (${e},${result.rows[0].id})
        `;
      });
    } catch (error) {
      //hacer un "role back " eliminar el estudiante con los id de las tecnologias
      throw error;
    }

    return NextResponse.json(
      createResponse(true, [], "Registro de estudiante exitoso"),
      { status: 200 }
    );
  } catch (error) {
    // const res: EstudianteResponse = {
    //   success: false,
    //   data: [],
    //   // message: getErrorMessageFromCode(error.code, error.constraint),
    // };

    //arreglar el mensaje de la base de datos si es 500

    // if(error instanceof )

    return NextResponse.json(
      createResponse(
        false,
        [],
        "Error en la base de datos"
        // getErrorMessageFromCode(error.code, error.constraint)
      ),
      { status: 500 }
    );
  }
}
