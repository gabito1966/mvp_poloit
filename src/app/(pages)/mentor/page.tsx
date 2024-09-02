
function pageMentor() {
    return (
        <div className="h-screen p-10">
            <h2 className="text-2xl font-semibold mb-4 text-center underline">Lista de Mentores</h2>
            <table className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center divide-y divide-gray-200 p-20">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default pageMentor