
import { fetchGet } from "@/lib/fetchFunctions";
import Link from "next/link";

export default async function EquipoCard({
    params,
}: {
  params?: { id: string };
}) {
    const { data: equipo } = await fetchGet(`/api/equipo/${params?.id}`);

    return (
        <>
            <section className="container max-w-5xl">
                <h2 className="text-3xl text-center font-bold p-2 mt-5 underline">Card del Equipo: { equipo.nombre}</h2>
                <div className="w-full m-5 max-h-36 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                {   
                <div className="grid grid-cols-2 md:grid-cols-4 ">
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">{ equipo.nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Tamaño:</h4>
                                <p className="bg-transparent text-base mb-3">{ equipo.tamano }</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Fecha Inicio:</h4>
                                <p className="bg-transparent text-base mb-3">{ equipo.fecha_inicio}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Finaliza:</h4>
                            <p className="bg-transparent text-base mb-3">{ equipo.fecha_fin}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium"></h4>
                                <p className="bg-transparent text-base mb-3"></p>
                        </div>
                    </div>                   
                </div>
            }
            </div>   
                <div className="w-full m-5 max-h-48 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    {
                    <div className="grid grid-cols-2 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_apellido}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Mentor</h4>
                                <p className="bg-transparent text-base mb-3">Tecnologias</p>
                        </div>
                    </div>
                    </div>
                }
                </div>
                <div className="w-full m-5 max-h-48 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    {
                    <div className="grid grid-cols-2 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa_apellido}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Mentor</h4>
                                <p className="bg-transparent text-base mb-3">QA</p>
                            </div>
                        </div>
                        
                    </div>
}
                </div>
                <div className="w-full m-5 max-h-124 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    {
                    <div className="grid grid-cols-2 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-6">{equipo.mentor_ux_ui}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-6">{equipo.mentor_ux_ui_apellido}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-6">{equipo.mentor_ux_ui_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-6">{equipo.mentor_ux_ui_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Mentor</h4>
                                <p className="bg-transparent text-base mb-3">UX/UI</p>
                            </div>
                        </div>
                    </div>
}
                </div>
                <div className="w-full m-5 max-h-124 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    {
                    <div className="grid grid-cols-1 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">Nombre del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3">Apellido del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3">Email del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">Telefono del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Tecnologia:</h4>
                                <p className="bg-transparent text-base mb-3">Tecnologia del estudiante</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-5">
                    <Link href="/equipo">
                        Volver a equipo
                    </Link>
                </div>
            </section></>
    )
}
