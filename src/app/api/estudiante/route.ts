import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    //faltaria las tecnologias de cada estudiante despues veo que onda
    const { rows } =
      await sql<Estudiante>`SELECT e.*, o.nombre nombre_ong FROM estudiantes e join  ongs o on  e.id_ong = o.id where e.estado = true`;

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error en la base de datos" },
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
}
/*ver la tecnologia*/

export type Estudiante = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: boolean;
  id_ong: number;
};

export interface UserLoginResponse {
  success: boolean;
  userData?: Estudiante;
  message?: string;
}

export interface EstudianteResponse {
  success: boolean;
  errors?: [];
  message?: string;
}

const CreateSchemaEstudiante = z.object({
  nombre: z
    .string({ message: "ingrese un nombre" })
    .min(4, "el nombre debe de tener al menos 4 caracteres"),
  apellido: z
    .string({ message: "ingrese un apellido" })
    .min(3, "el apellido debe tener al menos 4 caracter"),
  email: z
    .string({ message: "ingrese un email" })
    .email("Debe ser un email válido")
    .min(6, "el email debe tener al menos 6 caracteres"),
  telefono: z.string().min(6, "el telefono debe tener al menos 6 caracteres"),
  id_ong: z.coerce.number({
    invalid_type_error: "seleccione una organización",
  }),
});

const CreateEstudiante = CreateSchemaEstudiante.omit({});

export async function POST(request: Request) {
  const body = (await request.json()) as EstudianteInterface;

  const validatedFields = CreateEstudiante.safeParse({
    ...body,
  });

  if (!validatedFields.success) {
    const res = {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };

    return NextResponse.json(res, { status: 400 }); //cambiar el status
  }

  const { nombre, apellido, email, telefono, id_ong } = validatedFields.data;

  try {
    const result =
      await sql`INSERT INTO estudiantes ( nombre, apellido, email, telefono, id_ong ) VALUES
     (${nombre},${apellido}, ${email}, ${telefono}, ${id_ong}) RETURNING id`;

    console.log(result);

    // if (tecnologias && tecnologias.length > 0) {
    //   for (const tecnologiaId of tecnologias) {
    //     await sql`
    //       INSERT INTO ong_tecnologias (id_tecnologia, id_ong)
    //       VALUES (${tecnologiaId}, ${id_ong});
    //     `;
    //   }
    // }

    const res: EstudianteResponse = {
      success: true,
      message: "Registro de estudiante exitoso",
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res: EstudianteResponse = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}
