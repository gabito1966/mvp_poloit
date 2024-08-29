import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GetTecnologia = z.object({
    id: z.coerce.number({ invalid_type_error: "debe ser un numero" }),
});

export type Tecnologia = {
    id: number;
    nombre: string;
};

export const UpdateTecnologia = z.object({
    id: z.coerce.number({ invalid_type_error: "debe ser un numero" }),
    nombre: z
        .string({ message: "ingrese un nombre" })
        .min(2, "el nombre debe tener al menos 2 caracteres"),
});

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    data: [],
                    message: "debe proporcionar el id de la tecnologia",
                },
                { status: 400 }
            );
        }

        const { rows } =
            await sql<Tecnologia>`SELECT * FROM tecnologias WHERE id = ${id}`;

        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, data: [], message: "tecnologia no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: [],
                message: "error en la base de datos",
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    data: [],
                    message: "debe proporcionar el id de la tecnologia",
                },
                { status: 400 }
            );
        }

        const body = (await request.json()) as Tecnologia;

        const validatedFields = UpdateTecnologia.safeParse({
            ...body,
            id: id,
        });

        if (!validatedFields.success) {
            const res = {
                success: false,
                data: [],
                message: "Error en algun campo",
                errors: validatedFields.error.flatten().fieldErrors,
            };

            return NextResponse.json(res, { status: 400 });
        }

        const { id: id_tecnologia, nombre } = validatedFields.data;

        const { rows } =
            await sql<Tecnologia>`UPDATE tecnologias SET nombre = ${nombre} WHERE id = ${id_tecnologia} RETURNING *`;

        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, data: [], message: "tecnologia no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: [], message: "error en la base de datos" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    data: [],
                    message: "debe proporcionar el id de la tecnologia",
                },
                { status: 400 }
            );
        }

        await sql`DELETE FROM tecnologias WHERE id = ${id}`;

        return NextResponse.json(
            { success: true, data: [], message: "tecnologia eliminada" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, data: [], message: "error en la base de datos" },
            { status: 500 }
        );
    }
}