
import BackButton from "@/components/dashboard/BackButton";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function EstudianteCard({
    params,
}: {
    params?: { id: string };
}) {
    const { data: estudiante } = await fetchGet(`/api/estudiante/${params?.id}`);

    return (<> 
        <section className="container max-w-5xl pt-20 ml-14 lg:ml-0">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-5">
                <h1 className="text-4xl text-center font-bold m-5" >Card del Estudiante {estudiante.nombre} {estudiante.apellido}</h1>       
                <div className="w-full max-h-124 flex-col p-1 lg:p-12">
                    <hr />
                {<div className="grid grid-cols-1 justify-center  items-center md:grid-cols-2  mt-5">
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Apellido:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.apellido}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Nombre:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Email:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.email}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Teléfono:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.telefono}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Tecnologías:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.tecnologias[0].nombre}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Tipo Tecnologia:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.tecnologias[0].tipo}</p>
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">ONG:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.nombre_ong}</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 dark:text-gray-400 font-medium">Estado:</h4>
                            <p className="bg-transparent text-base mb-6 font-semibold">{estudiante.estado ? 'Activo' : 'Inactivo'}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
        <BackButton url="/estudiante" />
      </div>
        </section>
        </>
    )
}
