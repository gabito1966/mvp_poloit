import Link from "next/link"

function pageMentor() {
    return (
        <div className="container h-screen p-10">
            <h1 className="text-4xl font-semibold mb-4 text-center underline">Lista de Mentores</h1>
            <div className="container flex flex-row p-5 justify-around text-center">
                <div>
                    <input type="text" className="mb-5 border-2 border-gray-500 p-2 text-xl rounded-xl" placeholder="Buscar mentores" value="" />
                </div>
                <div>
                    <Link href="/register/mentores">
                        <button
                            type="submit"
                            className="px-6 py-3 text-xl min-w-40 rounded-lg bg-blue-400 text-white shadow-sm hover:bg-blue-700"
                        >
                            Añadir Mentor
                        </button>
                    </Link>
                </div>
            </div>

            <table className="space-y-4 mb-8 w-full items-center justify-center divide-y divide-gray-200 p-20">
                <thead className="bg-white">
                    <tr className="text-center">
                        <th className="px-6 py-3 border-2 border-gray-400 min-w-40 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 border-2 border-gray-400 min-w-40 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 border-2 border-gray-400 min-w-40 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 border-2 border-gray-400 min-w-40 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 border-2 border-gray-400 min-w-40 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Empresa</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default pageMentor