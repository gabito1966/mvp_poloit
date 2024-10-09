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
        <div className="inline-block min-w-full align-middle ">
          <div className="rounded-lg bg-gray-100 dark:bg-gray-600 p-2  md:pt-0">
            <div className="lg:hidden grid grid-cols-1 gap-4">
              {auditoriaEstudiantes?.map((estudiante) => (
                <div
                  key={estudiante.id}
                  className="rounded-md bg-white dark:bg-gray-700 p-4"
                >
                  <div className="grid grid-cols-2 gap-2">
                    
                      <div className="col-span-2 mb-2 items-center flex justify-between">
                        <p className="text-lg font-medium">{estudiante.apellido}{estudiante.nombre}</p>
                        <p className="text-md ">{estudiante.email}</p>               
                    </div>
                    <div className="col-span-2 mb-2 items-center flex justify-between">
                        <p className="text-md">{`${estudiante.fecha_baja.toLocaleDateString("es-ES")}`}</p>
                        <p className="text-md ">Baja</p>               
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className=" hidden min-w-full bg-white dark:bg-gray-600 lg:table">
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
              <tbody className="bg-white dark:bg-gray-700">
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
                        Baja
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
