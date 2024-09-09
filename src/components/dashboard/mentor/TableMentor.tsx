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
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
                    <div className="lg:hidden">
                        {mentores?.map((mentor) => (
                            <div
                                key={mentor.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{mentor.nombre}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{mentor.email}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">{mentor.apellido}</p>
                                        <p>
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <ViewButton url={`/card/mentor/${mentor.id.toString()}`} />
                                        <EditButton url={`/edit/mentor/${mentor.id.toString()}`} />
                                        <DeleteButton url={`/api/mentor/${mentor.id.toString()}`} />
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
                                    apellido
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
                        <tbody className="bg-white">
                            {mentores?.map((mentor) => (
                                <tr
                                    key={mentor.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 px-3">
                                        {mentor.nombre.length < 10 ? mentor.nombre : mentor.nombre.slice(0, 7) + "..."}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {mentor.apellido.length < 10 ? mentor.apellido : mentor.apellido.slice(0, 7) + "..."}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {mentor.email.length < 20 ? mentor.email : mentor.email.slice(0, 19) + "..."}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {mentor.telefono.length < 10 ? mentor.telefono : mentor.telefono.slice(0, 7) + "..."}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {mentor.tecnologias.join(", ").length < 15 ? mentor.tecnologias.join(", ") : mentor.tecnologias.join(", ").slice(0, 10) + "..."}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {mentor.empresa.length < 15 ? mentor.empresa : mentor.empresa.slice(0, 8) + "..."}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex  justify-end gap-3">
                                            <ViewButton url={`/card/mentor/${mentor.id.toString()}`} />
                                            <EditButton url={`/edit/mentor/${mentor.id.toString()}`} />
                                            <DeleteButton url={`/api/mentor/${mentor.id.toString()}`} />
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
