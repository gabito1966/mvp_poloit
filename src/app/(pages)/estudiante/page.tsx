

function pageEstudiante() {
    return (
        <div className="h-screen p-10">
            <h2 className="text-2xl font-semibold mb-4 text-center underline">Lista de Estudiantes</h2>
            <div className="container justify-between p-5 text-center">
                <input type="text" className="mb-5 p-2 text-xl rounded-xl" placeholder="Buscar estudiantes" value="" />
                <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gray-500 text-white shadow-sm hover:bg-gray-600"
                >
                    Registrar Alumno
                </button>
            </div>

            <table className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center divide-y divide-gray-200 p-20">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ONG</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tecnologias</th>
                    </tr>
                </thead>
            </table>
        </div >
    )
}

export default pageEstudiante