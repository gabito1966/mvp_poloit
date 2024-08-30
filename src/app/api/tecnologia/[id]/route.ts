import { createResponse, getErrorMessageFromCode } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GetTecnologia = z.object({
    id: z.coerce.number({ invalid_type_error: "El ID debe ser un número" }),
});

export type Tecnologia = {
    id: number;
    nombre: string;
};

export const UpdateTecnologia = z.object({
    id: z.coerce.number({ invalid_type_error: "El ID debe ser un número" }),
    nombre: z
        .string({ message: "Ingrese un nombre" })
        .min(2, "El nombre debe tener al menos 2 caracteres"),
});

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                createResponse(false, [], "Debe proporcionar el ID de la tecnología"),
                { status: 400 }
            );
        }

        const { rows } =
            await sql<Tecnologia>`SELECT * FROM tecnologias WHERE id = ${id}`;

        if (rows.length === 0) {
            return NextResponse.json(
                createResponse(false, [], "tecnología no encontrada"),
                { status: 404 }
            );
        }

        return NextResponse.json(
            createResponse(true, rows[0], "Tecnología encontrada"),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            createResponse(false, [], getErrorMessageFromCode(error)),
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
                createResponse(false, [], "Debe proporcionar el id de la tecnología"),
                { status: 400 }
            );
        }

        const body = (await request.json()) as Tecnologia;

        const validatedFields = UpdateTecnologia.safeParse({
            ...body,
            id: id,
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

        const { id: id_tecnologia, nombre } = validatedFields.data;

        const { rows } =
            await sql<Tecnologia>`UPDATE tecnologias SET nombre = ${nombre} WHERE id = ${id_tecnologia} RETURNING *`;

        if (rows.length === 0) {
            return NextResponse.json(
                createResponse(false, [], "Tecnología no encontrada"),
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            createResponse(false, [], getErrorMessageFromCode(error)),
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
                createResponse(false, [], "Debe proporcionar el ID de la tecnología"),
                { status: 400 }
            );
        }

        await sql`DELETE FROM tecnologias WHERE id = ${id}`;

        return NextResponse.json(createResponse(true, [], "tecnología eliminada"), {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            createResponse(false, [], getErrorMessageFromCode(error)),
            { status: 500 }
        );
    }
}