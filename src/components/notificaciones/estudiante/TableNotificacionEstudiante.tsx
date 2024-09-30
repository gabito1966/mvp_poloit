import { fetchFilteredEstudiantesBaja } from '@/database/data';

export default async function TableNotificationEstudiante({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const auditoriaEstudiantes = await fetchFilteredEstudiantesBaja(query, currentPage);

    return (
        <>
        <div className=" flow-root mt-4">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
            <div className="lg:hidden">
              {auditoriaEstudiantes?.map((estudiante) => (
                <div
                  key={estudiante.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{estudiante.nombre}</p>
                      </div>
                      <p className="text-sm text-gray-500">{estudiante.email}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{estudiante.apellido}</p>
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
                    apellido, nombre
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    Correo electrónico
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
                {auditoriaEstudiantes?.map((estudiante) => (
                  <tr
                    key={estudiante.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {(estudiante.apellido.length + estudiante.nombre.length) < 30
                        ? `${estudiante.apellido}, ${estudiante.nombre}`
                        : estudiante.apellido.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {estudiante.email.length < 30
                        ? estudiante.email
                        : estudiante.email.slice(0, 30) + "..."}
                    </td>
                    
                    <td className="whitespace-nowrap px-3 py-3">
                    {`${estudiante.fecha_baja.toLocaleDateString("es-ES")}`}
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
