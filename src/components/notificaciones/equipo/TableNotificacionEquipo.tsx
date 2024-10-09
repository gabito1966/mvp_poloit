import { fetchEquiposEliminados } from '@/database/data';

export default async function TableNotificacionEquipo({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const auditoriaEquipos = await fetchEquiposEliminados(query, currentPage);

  return (
    <>
      <div className="flow-root mt-4">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 dark:bg-gray-600 p-2 lg:pt-0">
            <div className="lg:hidden grid grid-cols-1 gap-4">
              {auditoriaEquipos?.map((equipo) => (
                <div
                  key={equipo.id}
                  className="rounded-md bg-white dark:bg-gray-700 p-4"
                >
                  <div className="grid grid-cols-2  gap-2">
                    <div className="col-span-2 mb-2 items-center flex justify-between">
                      <p className="text-lg font-medium">{equipo.nombre}</p>
                      <p className="text-md">{equipo.cantidad_estudiantes} Estudiantes</p>
                    </div>
                    <div className="col-span-2 mb-2 items-center flex justify-between">
                      <p className="text-md">{new Date(equipo.fecha_eliminacion).toLocaleDateString("es-ES")}</p>
                      <p className="text-md">Baja</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full bg-white dark:bg-gray-600 lg:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="capitalize px-4 py-5 font-medium">nombre</th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">Cantidad Estudiantes</th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">Fecha baja</th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">estado</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 dark:text-white">
                {auditoriaEquipos?.map((equipo) => (
                  <tr
                    key={equipo.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {equipo.nombre.length < 30 ? equipo.nombre : equipo.nombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">{equipo.cantidad_estudiantes}</td>
                    <td className="whitespace-nowrap px-3 py-3">{new Date(equipo.fecha_eliminacion).toLocaleDateString("es-ES")}</td>
                    <td className="whitespace-nowrap px-3 py-3">Baja</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
