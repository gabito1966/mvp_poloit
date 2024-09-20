import { fetchFilteredEquipos } from '@/database/data';
import DeleteButton from "../DeleteButton";
import ViewButton from "../ViewButton";
export default async function TableGrupos({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const grupos = await fetchFilteredEquipos(query, currentPage);
    return (
      <div className=" flow-root mt-4">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
            <div className="lg:hidden">
              {grupos?.map((grupo) => (
                <div
                  key={grupo.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{grupo.nombre}</p>
                      </div>
                      <p className="text-sm text-gray-500">{grupo.tamano}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{grupo.mentor} {grupo.apellido}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <ViewButton
                        url={`/card/equipo/${grupo.id.toString()}`}
                      />
                      <DeleteButton
                        url={`/api/equipo/${grupo.id.toString()}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 lg:table">
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
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Editar</span>
                    <span className="sr-only">Eliminar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {grupos?.map((grupo) => (
                  <tr
                    key={grupo.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 px-3" title={grupo.nombre}>
                      {grupo.nombre.length < 15
                        ? grupo.nombre
                        : grupo.nombre.slice(0, 13) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={grupo.tamano} >
                      {grupo.tamano}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${grupo.mentor} ${grupo.mentor_apellido}`} >
                      {(grupo.mentor.length+ grupo.mentor_apellido.length) < 25
                        ? `${grupo.mentor} ${grupo.mentor_apellido}`
                        : `${grupo.mentor} ${grupo.mentor_apellido}`.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${grupo.mentor_ux_ui} ${grupo.mentor_ux_ui_apellido}`} >
                    {(grupo.mentor_ux_ui.length+ grupo.mentor_ux_ui_apellido.length) < 25
                        ? `${grupo.mentor_ux_ui} ${grupo.mentor_ux_ui_apellido}`
                        : `${grupo.mentor_ux_ui} ${grupo.mentor_ux_ui_apellido}`.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3" title={`${grupo.mentor_qa} ${grupo.mentor_qa_apellido}`} >
                    {(grupo.mentor_qa.length+ grupo.mentor_qa_apellido.length) < 25
                        ? `${grupo.mentor_qa} ${grupo.mentor_qa_apellido}`
                        : `${grupo.mentor_qa} ${grupo.mentor_qa_apellido}`.slice(0, 20) + "..."}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex  justify-end gap-3">
                        <ViewButton
                          url={`/card/equipo/${grupo.id.toString()}`}
                        />
                        <DeleteButton
                          url={`/api/equipo/${grupo.id.toString()}`}
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
    );
  }
  