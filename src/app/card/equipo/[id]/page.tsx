import { fetchGet } from "@/lib/fetchFunctions";
import Link from "next/link";

export default async function EquipoCard({
  params,
}: {
  params?: { id: string };
}) {
  const { data: equipo } = await fetchGet(`/api/equipo/${params?.id}`);
  const fecha_inicial = new Date(equipo.fecha_inicio).toLocaleDateString(
    "es-ES",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  const fecha_final = new Date(equipo.fecha_fin).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <section className="container flex flex-col max-w-5xl">
        <h2 className="text-4xl text-left font-bold p-2 m-5 ">
          Card del Equipo: {equipo.nombre}
        </h2>
        <div className="  rounded-xl bg-gray-50 shadow-md p-4">
          <div className="w-full mb-5 max-h-36 flex-col p-1  md:p-2 text-black  bg-white rounded-lg ">
            {
              <div className="grid grid-cols-2 md:grid-cols-4 ">
                <div className="flex-auto">
                  <div className="ml-16 max-md:ml-0 ">
                    <h4 className="block mb-1 text-md text-gray-500 font-medium">
                      Nombre:
                    </h4>
                    <p className="bg-transparent text-xl mb-2 font-semibold">
                      {equipo.nombre}
                    </p>
                  </div>
                </div>
                <div className="flex-auto">
                  <div className="ml-16 max-md:ml-0 ">
                    <h4 className="block mb-1 text-md text-gray-500 font-medium ">
                      Integrantes:
                    </h4>
                    <p className="bg-transparent text-xl mb-2 ml-8 font-semibold">
                      {equipo.tamano}
                    </p>
                  </div>
                </div>
                <div className="flex-auto">
                  <div className="ml-16 max-md:ml-0 ">
                    <h4 className="block mb-1 text-md text-gray-500 font-medium">
                      Fecha Inicio:
                    </h4>
                    <p className="bg-transparent text-xl mb-2 font-semibold">
                      {fecha_inicial}
                    </p>
                  </div>
                </div>
                <div className="flex-auto">
                  <div className="ml-16 max-md:ml-0 ">
                    <h4 className="block mb-1 text-md text-gray-500 font-medium">
                      Finaliza:
                    </h4>
                    <p className="bg-transparent text-xl mb-2 font-semibold">
                      {fecha_final}
                    </p>
                  </div>
                </div>
              </div>
            }
            </div>   
            <div className="w-full mb-5 border-2 border-gray-200 flex-col p-1 md:p-2 bg-white rounded-lg shadow-md text-black ">
                <h2 className="text-center font-bold pt-2 pb-5 underline text-xl">Mentores</h2>
            {
                    <div className="grid grid-cols-1 md:grid-cols-4 ">
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-black text-left font-semibold bg-gray-100">Apellido y Nombre</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_apellido}, {equipo.mentor}</p>
                            </div>
                        </div>                      
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-black text-left font-semibold bg-gray-100">Email:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-1 text-md text-black text-left font-semibold bg-gray-100">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-black text-left font-semibold bg-gray-100">Mentor</h4>
                            <p className="bg-transparent text-base mb-3">Tecnologias</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">                              
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa_apellido}, {equipo.mentor_qa}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">   
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">                           
                                <p className="bg-transparent text-base mb-3">{equipo.mentor_qa_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <p className="bg-transparent text-base mb-3">QA</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">
                               <p className="bg-transparent text-base mb-3">{equipo.mentor_ux_ui_apellido}, {equipo.mentor_ux_ui}</p>
                            </div>
                        </div>
                        
                        <div className="flex-auto">
                            <div className="ml-10 max-md:ml-0 ">

                                <p className="bg-transparent text-base mb-3">{equipo.mentor_ux_ui_email}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <p className="bg-transparent text-base mb-3 ">{equipo.mentor_ux_ui_telefono}</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <p className="bg-transparent text-base mb-3">UX/UI</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
                <div className="w-full  max-h-124 flex-col p-1  md:p-2 text-black border-2 border-gray-200 bg-white rounded-lg shadow-md">
                <h2 className="text-center font-bold pt-2 pb-4 underline text-xl">Integrantes</h2>
                    {
                   <div className="overflow-x-auto">
                   <table className="table-auto w-full">
                     <thead className="text-left bg-gray-100">
                       <tr>
                         <th className="px-4 py-2">Apellido y Nombre</th>
                         <th className="px-4 py-2">Email</th>
                         <th className="px-4 py-2">Teléfono</th>
                         <th className="px-4 py-2">Tecnología</th>
                       </tr>
                     </thead>
                     <tbody>
                       {equipo.nombres_estudiantes.map((e:any, i:number) => (
                         <tr key={`${e}-${i}`} className="hover:bg-gray-100">
                           <td className="px-4 py-2">{equipo.apellidos_estudiantes[i]}, {e} </td>
                           <td className="px-4 py-2">{equipo.emails_estudiantes[i]}</td>
                           <td className="px-4 py-2">{equipo.telefonos_estudiantes[i]}</td>
                           <td className="px-4 py-2">{equipo.tecnologias[i]}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
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
