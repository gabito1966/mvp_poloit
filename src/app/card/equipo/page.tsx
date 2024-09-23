
import Link from "next/link";
import React from "react";

export default async function GrupoCard({
    params,
}: {
    params?: { id: string };
}) {
    {/*const { data: equipo } = await fetchGet(`/api/equipo/${params?.id}`);*/ }

    return (
        <section className="container max-w-5xl">

            <h1 className="text-4xl text-center font-bold p-2 mt-10">Card del Grupo: Nombre del grupo</h1>

            
            <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-20">
                <Link href="/grupo">
                    Volver a grupos
                </Link>
            </div>
        </section>
    )
}
