
import { fetchGet } from "@/lib/fetchFunctions";
import Link from "next/link";

export default async function GrupoCard({
    params,
}: {
    params?: { id: string };
}) {
    const { data: grupo } = await fetchGet(`/api/equipo/${params?.id}`);

    return (
        <section className="container max-w-5xl">

            <h1 className="text-4xl text-center font-bold p-2 mt-10">Card del Grupo: Nombre del grupo</h1>

            {/*<div className="w-full m-5 max-h-124 flex-col p-1  md:p-12 text-black border-2 border-grey-200 bg-white rounded-lg ">
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre Grupo:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.apellido}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.email}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.telefono}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Tecnologías:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.tecnologias[0].nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Tipo Tecnologia:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.tecnologias[0].tipo}</p>
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">

                            <h4 className="block mb-2 text-md text-gray-500 font-medium">ONG:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.nombre_ong}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">

                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Estado:</h4>
                            <p className="bg-transparent text-base mb-6">{grupo.estado ? 'Activo' : 'Inactivo'}</p>
                        </div>

                    </div>

                </div>
                
            </div>*/}
            <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-20">
                <Link href="/grupo">
                    Volver a grupos
                </Link>
            </div>
        </section>
    )
}
