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
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
          <div className="lg:hidden">
            {estudiantes?.map((estudiante) => (
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
                  <div className="flex justify-end gap-2">
                    <ViewButton
                      url={`/card/estudiante/${estudiante.id.toString()}`}
                    />
                    <EditButton
                      url={`/edit/estudiante/${estudiante.id.toString()}`}
                    />
                    <DeleteButton
                      url={`/api/estudiante/${estudiante.id.toString()}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  apellido
                </th>
                <th scope="col" className="capitalize px-4 py-5 font-medium ">
                  nombre
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
            <tbody className="bg-white">
              {estudiantes?.map((estudiante) => (
                <tr
                  key={estudiante.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {estudiante.apellido.length < 10
                      ? estudiante.apellido
                      : estudiante.apellido.slice(0, 7) + "..."}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    {estudiante.nombre.length < 10
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
