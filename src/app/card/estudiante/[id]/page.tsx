
import { fetchGet } from "@/lib/fetchFunctions";

export default async function EstudianteCard({
    params,
}: {
    params?: { id: string };
}) {
    const { data: estudiante } = await fetchGet(`/api/estudiante/${params?.id}`);

    return (
        <section className="container">
            <h1 className="text-4xl text-center font-bold p-2 mt-10">Card de Estudiante </h1>

            <div className="w-full m-2 md:m-48 max-h-124 flex-col p-1  md:p-12 text-black border-2 border-black bg-neutral-200">
                {<div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Nombre:</h4>
                        <p className="bg-transparent text-base mb-6">{estudiante.nombre}</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Apellido:</h4>
                        <p className="bg-transparent text-base mb-6">{estudiante.apellido}</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Email:</h4>
                        <p className="bg-transparent text-base mb-6">{estudiante.email}</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Teléfono:</h4>
                        <p className="bg-transparent text-base mb-6">{estudiante.telefono}</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Tecnologías:</h4>
                        <p className="bg-transparent text-base mb-6">{estudiante.tecnologias}</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">ONG:</h4>
                        <p className="bg-transparent text-base mb-6">{estudiante.nombre_ong}</p>
                    </div>
                </div>
                }
            </div>
        </section>
    )
}
