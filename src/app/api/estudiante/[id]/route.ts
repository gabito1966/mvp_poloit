import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { EstudianteInterface } from "../route";

// export interface EstudianteInterface {
//   id: number;
//   nombre: string;
//   apellido: string;
//   email: string;
//   telefono: string;
//   id_ong: number;
// }

export const UpdateEstudiante = z.object({
  id: z.coerce.number({ invalid_type_error: "debe ser un numero" }),
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

// const CreateEstudiante = UpdateEstudiante.omit({ id: true });

export type GetEstudianteResponse = {
  success: boolean;
  data?: EstudianteInterface;
  message?: string;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "debe proporcionar el id del estudiante" },
      { status: 400 }
    );
  }

  try {
    const { rows } =
      await sql<EstudianteInterface>`SELECT e.*, o.nombre nombre_ong FROM estudiantes e  JOIN ongs o ON e.id_ong = o.id WHERE e.id = ${id}`;

    if (rows.length === 0) {
      const res = {
        success: false,
        message: "El estudiante no existe",
      };

      return NextResponse.json(res, { status: 404 });
    }

    const res = {
      success: true,
      data: rows[0],
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "debe proporcionar el id del estudiante" },
      { status: 400 }
    );
  }

  const body = (await request.json()) as EstudianteInterface;

  const validatedFields = UpdateEstudiante.safeParse({
    ...body,
    id: id,
  });

  if (!validatedFields.success) {
    const res = {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };

    return NextResponse.json(res, { status: 400 });
  }

  const {
    id: id_estudiante,
    nombre,
    apellido,
    email,
    telefono,
    id_ong,
  } = validatedFields.data;

  try {
    await sql`UPDATE estudiantes SET nombre = ${nombre}, apellido = ${apellido}, email = ${email}, telefono = ${telefono}, id_ong = ${id_ong} WHERE id = ${id_estudiante}`;

    const res = {
      success: true,
      message: "Actualización del estudiante exitosa",
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "debe proporcionar el id del estudiante" },
      { status: 400 }
    );
  }

  try {
    await sql`DELETE FROM estudiantes WHERE id = ${id}`;

    const res = {
      success: true,
      message: "Eliminación del estudiante exitosa",
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const res = {
      success: false,
      message: "error en la base de datos",
    };

    return NextResponse.json(res, { status: 500 });
  }
}
