import { fetchFilteredEquipos } from '@/database/data';
import DeleteButton from "../DeleteButton";
import ViewButton from "../ViewButton";

export default async function TableEquipos({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const equipo = await fetchFilteredEquipos(query, currentPage);

    if(equipo.length == 0){
      return (
        <div className="mt-4 flex items-center justify-center text-lg">
          <p className="text-gray-500">No se encontraron resultados</p>
        </div>
      )
    }

    return (<>
      <div className=" flow-root mt-4">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 dark:bg-gray-600 p-2 dark:text-white lg:pt-0">
            <div className="lg:hidden grid grid-cols-1 gap-4">
              {equipo?.map((equipo) => (
                <div
                  key={equipo.id}
                  className="rounded-md bg-white dark:bg-gray-700 p-4"
                >
                  <div className="col-span-2 mb-2 items-center flex justify-between">
                        <p className='text-lg font-medium'>{equipo.nombre}</p>
                        <p className="text-sm">{equipo.tamano} Estudiantes</p>
                  </div>
                  <div className="col-span-2 mb-2 items-center flex justify-between">
                    <p className="text-md">{equipo.fecha_inicio.toLocaleDateString("es-ES")} - {equipo.fecha_fin.toLocaleDateString("es-ES")}</p>
                    <div className="flex justify-end gap-2"> 
                      <ViewButton url={`/card/equipo/${equipo.id.toString()}`} />
                      <DeleteButton url={`/api/equipo/${equipo.id.toString()}`} />
                    </div>
                  </div>
                  <div className="col-span-2 mb-2 items-center flex justify-between">
                      <p className="text-md">{equipo.mentor} {equipo.mentor_apellido}</p>
                      <p className="text-sm">Mentor Tecnologias</p>
                  </div>
                  <div className="col-span-2 mb-2 items-center flex justify-between">
                    <p className="text-md">{equipo.mentor_ux_ui} {equipo.mentor_ux_ui_apellido}</p>
                    <p className="text-sm">Mentor UX-UI</p>
                  </ div>
                  <div className="col-span-2 mb-2 items-center flex justify-between">
                    <p className="text-md">{equipo.mentor_qa} {equipo.mentor_qa_apellido}</p>
                    <p className="text-sm">Mentor QA</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 dark:bg-gray-600 rounded-lg dark:text-white lg:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="capitalize px-4 py-5 font-medium ">
                    nombre
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    tamaño
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    mentor SQUAD
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    mentor UX-UI
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    mentor QA
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    Fecha inicio
                  </th>
                  <th scope="col" className="capitalize px-3 py-5 font-medium">
                    Fecha fin
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Editar</span>
                    <span className="sr-only">Eliminar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700">
                {equipo?.map((equipo) => (
                  <tr
                    key={equipo.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 px-3" title={equipo.nombre}>
                      {equipo.nombre.length < 15
                        ? equipo.nombre
                        : equipo.nombre.slice(0, 13) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={equipo.tamano} >
                      {equipo.tamano}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${equipo.mentor} ${equipo.mentor_apellido}`} >
                      {(equipo.mentor.length+ equipo.mentor_apellido.length) < 25
                        ? `${equipo.mentor} ${equipo.mentor_apellido}`
                        : `${equipo.mentor} ${equipo.mentor_apellido}`.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${equipo.mentor_ux_ui} ${equipo.mentor_ux_ui_apellido}`} >
                    {(equipo.mentor_ux_ui.length+ equipo.mentor_ux_ui_apellido.length) < 25
                        ? `${equipo.mentor_ux_ui} ${equipo.mentor_ux_ui_apellido}`
                        : `${equipo.mentor_ux_ui} ${equipo.mentor_ux_ui_apellido}`.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${equipo.mentor_qa} ${equipo.mentor_qa_apellido}`} >
                    {(equipo.mentor_qa.length+ equipo.mentor_qa_apellido.length) < 25
                        ? `${equipo.mentor_qa} ${equipo.mentor_qa_apellido}`
                        : `${equipo.mentor_qa} ${equipo.mentor_qa_apellido}`.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${equipo.fecha_inicio.toLocaleDateString("es-ES")}}`} >
                         {`${equipo.fecha_inicio.toLocaleDateString("es-ES")}`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${equipo.fecha_fin.toLocaleDateString("es-ES")}`} >
                    {`${equipo.fecha_fin.toLocaleDateString("es-ES")}`}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex  justify-end gap-3">
                        <ViewButton
                          url={`/card/equipo/${equipo.id.toString()}`}
                        />
                        <DeleteButton
                          url={`/api/equipo/${equipo.id.toString()}`}
                        />
                      </div>
                    </td>
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
  