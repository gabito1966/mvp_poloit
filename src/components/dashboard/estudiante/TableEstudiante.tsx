import { fetchFilteredEstudiantes } from "@/database/data";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import ViewButton from "../ViewButton";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const estudiantes = await fetchFilteredEstudiantes(query, currentPage);

  return (
    <div className=" flow-root mt-4">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-600 p-2 lg:pt-0">
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {estudiantes?.map((estudiante) => (
              <div
                key={estudiante.id}
                className="rounded-md bg-white dark:bg-gray-600 p-4"
              >
                <div className="col-span-2 mb-2 items-center flex justify-between">
                  <p className="text-lg font-medium"> {estudiante.apellido} {estudiante.nombre} </p>
                </div>
                <div className="col-span-2 mb-2 items-center flex justify-between gap-4">
                    <p className="text-md ">{estudiante.email}</p>
                    <p className="text-md">{estudiante.telefono}</p>
                </div>  
                <div className="col-span-2 mb-2 items-center flex justify-between gap-4">
                    <p className="text-md ">{estudiante.tecnologias}</p>
                    <p className="text-md">{estudiante.ong}</p>
                <div className="flex justify-end gap-2">
                    <ViewButton
                      url={`/card/estudiante/${estudiante.id.toString()}`}
                    />
                    <EditButton
                      url={`/edit/estudiante/${estudiante.id.toString()}`}
                    />
                    <DeleteButton
                      url={`/api/estudiante/${estudiante.id.toString()}`}
                      validarRuta="/estudiante"
                 
                    />
                </div>
                </div>
              </div>
              
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg lg:table">
            <thead className="rounded-lg text-left text-sm font-normal dark:bg-gray-600">
              <tr>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  apellido y nombre
                </th>
                <th scope="col" className="capitalize px-5 py-5 font-medium">
                  Correo electrónico
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  teléfono
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  tecnologías
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  ong
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700">
              {estudiantes?.map((estudiante) => (
                <tr
                  key={estudiante.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {estudiante.apellido.length < 20
                      ? estudiante.apellido
                      : estudiante.apellido.slice(0, 7) + "..."} , {" "} 
                    {estudiante.nombre.length < 15
                      ? estudiante.nombre
                      : estudiante.nombre.slice(0, 7) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {estudiante.email.length < 20
                      ? estudiante.email
                      : estudiante.email.slice(0, 19) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {estudiante.telefono.length < 10
                      ? estudiante.telefono
                      : estudiante.telefono.slice(0, 7) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {estudiante.tecnologias.join(", ").length < 15
                      ? estudiante.tecnologias.join(", ")
                      : estudiante.tecnologias.join(", ").slice(0, 10) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {estudiante.ong.length < 15
                      ? estudiante.ong
                      : estudiante.ong.slice(0, 7) + "..."}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex  justify-end gap-3">
                      <ViewButton
                        url={`/card/estudiante/${estudiante.id.toString()}`}
                      />
                      <EditButton
                        url={`/edit/estudiante/${estudiante.id.toString()}`}
                      />
                      <DeleteButton
                        url={`/api/estudiante/${estudiante.id.toString()}`}
                        validarRuta="/estudiante"
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
