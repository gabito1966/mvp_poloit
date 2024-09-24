
import { fetchGet } from "@/lib/fetchFunctions";
import Link from "next/link";

export default async function EquipoCard({
    params,
}: {
  params?: { id: string };
}) {
    const { data: equipo } = await fetchGet(`/api/equipo/${params?.id}`);
    const fecha_inicial =  new Date(equipo.fecha_inicio)
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const fecha_final =  new Date(equipo.fecha_fin)
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    

    return (
        <>
            <section className="container max-w-5xl">
                <h2 className="text-4xl text-center font-bold p-2 m-5 underline">Card del Equipo: { equipo.nombre}</h2>
                <div className="border-2 border-gray-200 rounded-xl bg-gray-100 shadow-md p-4">         
                <div className="w-full mb-5 max-h-36 flex-col p-1  md:p-2 text-black border-2 border-gray-200 bg-white rounded-lg shadow-md">
                {   
                <div className="grid grid-cols-2 md:grid-cols-4 ">
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-xl mb-2 font-semibold">{ equipo.nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium ">Integrantes:</h4>
                                <p className="bg-transparent text-xl mb-2 ml-8 font-semibold">{ equipo.tamano }</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Fecha Inicio:</h4>
                                <p className="bg-transparent text-xl mb-2 font-semibold">{ fecha_inicial}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Finaliza:</h4>
                            <p className="bg-transparent text-xl mb-2 font-semibold">{ fecha_final}</p>
                        </div>
                    </div>                 
                </div>
            }
            </div>   
            <div className="w-full mb-5 border-2 border-gray-200 flex-col p-1 md:p-2 bg-white rounded-lg shadow-md text-black ">
                <h2 className="text-center font-bold pt-2 pb-5 underline text-xl">Mentores</h2>
            {
                    <div className="grid grid-cols-2 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_apellido}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Mentor</h4>
                            <p className="bg-transparent text-base mb-3 font-semibold">Tecnologias</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">                              
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_qa}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_qa_apellido}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">   
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_qa_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">                           
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_qa_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                
                                <p className="bg-transparent text-base mb-3 font-semibold">QA</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                               <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_ux_ui}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                               <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_ux_ui_apellido}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">

                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_ux_ui_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <p className="bg-transparent text-base mb-3 font-semibold">{equipo.mentor_ux_ui_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <p className="bg-transparent text-base mb-3 font-semibold">UX/UI</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
                <div className="w-full  max-h-124 flex-col p-1  md:p-2 text-black border-2 border-gray-200 bg-white rounded-lg shadow-md">
                <h2 className="text-center font-bold pt-2 pb-5 underline text-xl">Integrantes</h2>
                    {
                    <div className="grid grid-cols-1 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">Nombre del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">Apellido del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">Email del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">Telefono del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Tecnologia:</h4>
                                <p className="bg-transparent text-base mb-3 font-semibold">Tecnologia del estudiante</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                </div>
                <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-xl text-center text-white p-4 mt-10">
                    <Link href="/equipo">
                        Volver a equipo
                    </Link>
                </div>
            </section></>
    )
}
