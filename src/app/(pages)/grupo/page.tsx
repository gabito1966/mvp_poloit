import DeleteButton from "@/components/dashboard/DeleteButton";
import EditButton from "@/components/dashboard/EditButton";
import ViewButton from "@/components/dashboard/ViewButton";

function page() {
    return (
        <div className="w-full flex-grow p-6  md:p-12" >
            <h1 className="text-4xl font-semibold mb-8 text-center underline">Generación de equipos</h1>
            <div className="border-2 border-gray-300 rounded-lg">
                <h3 className="text-2xl m-3">Crear nuevo Equipo</h3>
                <div className="flex flex-row p-6 gap-10 justify-around">
                    <input
                        type="text"
                        id="nombreGrupo"
                        name="nombreGrupo"
                        placeholder="Ingrese el nombre del equipo"
                        className="basis-1/3 mt-2 text-black block border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                    />
                    <input
                        type="text"
                        id="integrantes"
                        name="integrantes"
                        placeholder="Cantidad de integrantes"
                        className="basis-1/3 mt-2 text-black block border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-64"
                    >
                        Generar Equipo
                    </button>
                </div>
            </div>
            <div className="mt-10 border-2 border-gray-300 rounded-lg" >
                <h3 className="text-2xl m-5">Equipos Generados</h3>
                <table>
                    <thead className="bg-white">
                        <tr className="justify-between">
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">Nombre Equipo</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">Nombre Mentor</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">UX/UI</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">QA</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">Cantidad de integrantes</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">Fecha Inicio</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">Fecha Entrega</th>
                            <th className="w-64 px-6 py-2 text-center text-md text-gray-900">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">Equipo</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">Mentor</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">UX/UI</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">QA</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">Integrantes</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">Fecha Inicio</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">Fecha Entrega</td>
                            <td className="w-64 px-6 py-1 text-center text-sm text-gray-900">Estado</td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex  justify-end gap-3">
                                    <ViewButton url={'/'} />
                                    <EditButton url={'/'} />
                                    <DeleteButton url={'/'} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page