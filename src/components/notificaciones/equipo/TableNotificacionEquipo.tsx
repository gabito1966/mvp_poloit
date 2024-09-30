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
        <div className=" flow-root mt-4">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
            <div className="lg:hidden">
              {auditoriaEquipos?.map((equipo) => (
                <div
                  key={equipo.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{equipo.nombre}</p>
                      </div>
                      <p className="text-sm text-gray-500">{equipo.cantidad_estudiantes}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{new Date (equipo.fecha_eliminacion).toLocaleDateString("es-ES")}</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className=" hidden min-w-full text-gray-900 lg:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="capitalize px-4 py-5 font-medium ">
                    nombre
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    Cantidad Estudiantes
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    Fecha baja
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {auditoriaEquipos?.map((equipo) => (
                  <tr
                    key={equipo.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {(equipo.nombre.length) < 30
                        ? ` ${equipo.nombre}`
                        : equipo.nombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {equipo.cantidad_estudiantes < 30
                        ? equipo.cantidad_estudiantes
                        : equipo.cantidad_estudiantes}
                    </td>
                    
                    <td className="whitespace-nowrap px-3 py-3">
                    {`${equipo.fecha_eliminacion.toLocaleDateString("es-ES")}`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        baja
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
  )
}
