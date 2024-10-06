
import { fetchGet } from "@/lib/fetchFunctions";
import Link from "next/link";

export default async function EstudianteCard({
    params,
}: {
    params?: { id: string };
}) {
    const { data: estudiante } = await fetchGet(`/api/estudiante/${params?.id}`);

    return (
        <section className="container max-w-5xl">
            <h1 className="text-4xl text-center font-bold p-2 m-10">Card del Estudiante {estudiante.nombre} {estudiante.apellido}</h1>       
            <div className="w-full max-h-124 flex-col p-1  md:p-12 text-black bg-white rounded-lg shadow-lg">
                {<div className="grid grid-cols-1 md:grid-cols-2 ">
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.apellido}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.email}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.telefono}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Tecnologías:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.tecnologias[0].nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Tipo Tecnologia:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.tecnologias[0].tipo}</p>
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">ONG:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.nombre_ong}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Estado:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.estado ? 'Activo' : 'Inactivo'}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-20">
                <Link href="/estudiante">
                    Volver a estudiante
                </Link>
            </div>
        </section>
    )
}
