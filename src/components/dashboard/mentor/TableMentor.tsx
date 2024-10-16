import { fetchFilteredMentores } from "@/database/data";
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
  const mentores = await fetchFilteredMentores(query, currentPage);

  return (
    <div className=" flow-root mt-4">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-gray-100 dark:bg-gray-600 p-2 lg:pt-0">
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {mentores?.map((mentor) => (
              <div
                key={mentor.id}
                className="rounded-md bg-white dark:bg-gray-600 p-4"
              >
                <div className="col-span-2 mb-2 items-center flex justify-between" title={`${mentor.apellido} ${mentor.nombre}`}>
                    <p className="text-lg font-medium">{mentor.apellido} {mentor.nombre}</p>
                </div>
                <div className="col-span-2 mb-2 items-center flex justify-between gap-4">
                    <p className="text-md" title={mentor.email}>{mentor.email}</p>
                    <p className="text-md font-medium" title={mentor.telefono}>{mentor.telefono}</p>
                  </div>
                  <div className="col-span-2 mb-2 items-center flex justify-between gap-4">
                    <p className="text-md" title={mentor.tecnologias.toString()}>{mentor.tecnologias.toString()}</p>
                    <p className="text-md font-medium capitalize" title={mentor.empresa}>{mentor.empresa}</p>
                    <div className="flex justify-end gap-2">
                      <ViewButton url={`/card/mentor/${mentor.id.toString()}`} />
                      <EditButton url={`/edit/mentor/${mentor.id.toString()}`} />
                      <DeleteButton url={`/api/mentor/${mentor.id.toString()}`} validarRuta="/mentor"/>
                    </div> 
                  </div>
                </div>
            ))}
          </div>
          <table className=" hidden min-w-full text-gray-900 dark:bg-gray-700 rounded-lg dark:text-white lg:table">
            <thead className="rounded-lg text-left text-sm font-normal dark:bg-gray-600">
              <tr>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  apellido y nombre
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  Correo electrónico
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  teléfono
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  tecnologías
                </th>
                <th scope="col" className="capitalize px-3 py-5 font-medium">
                  empresas
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700">
              {mentores?.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3 capitalize" title={`${mentor.apellido}, ${mentor.nombre}`}>
                    {(mentor.apellido.length + mentor.nombre.length) < 26
                      ? `${mentor.apellido}, ${mentor.nombre}`
                      : `${mentor.apellido} ${mentor.nombre}`.slice(0, 23) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3" title={mentor.email}>
                    {mentor.email.length < 25
                      ? mentor.email
                      : mentor.email.slice(0, 22) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3" title={mentor.telefono}>
                    {mentor.telefono.length < 10
                      ? mentor.telefono
                      : mentor.telefono.slice(0, 7) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3" title={mentor.tecnologias.join(", ")}>
                    {mentor.tecnologias.join(", ").length < 15
                      ? mentor.tecnologias.join(", ")
                      : mentor.tecnologias.join(", ").slice(0, 12) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 capitalize" title={mentor.empresa}>
                    {mentor.empresa.length < 15
                      ? mentor.empresa
                      : mentor.empresa.slice(0, 12) + "..."}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex  justify-end gap-3">
                      <ViewButton
                        url={`/card/mentor/${mentor.id.toString()}`}
                      />
                      <EditButton
                        url={`/edit/mentor/${mentor.id.toString()}`}
                      />
                      <DeleteButton
                        url={`/api/mentor/${mentor.id.toString()}`}
                        validarRuta="/mentor"
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
