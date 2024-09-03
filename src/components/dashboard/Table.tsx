import Image from "next/image";
// import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
// import { fetchFilteredUsers } from "@/database/database";
import { fetchFilteredEstudiantes } from "@/database/data";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
// import { formatDateToLocal } from "@/lib/libs";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredEstudiantes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{invoice.nombre}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  {/* <InvoiceStatus status={invoice.} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{invoice.apellido}</p>
                    <p>
                      {/* {formatDateToLocal(
                        invoice.fechaNacimiento.toDateString()
                      )} */}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} /> */}
                    <EditButton id={invoice.id.toString()} />
                    <DeleteButton id={invoice.id.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
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
                  ong
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 px-3">
                    {/* <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                      
                    </div> */}
                    {invoice.nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.apellido}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatDateToLocal(invoice.fechaNacimiento)} */}
                    {invoice.telefono}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <InvoiceStatus status={invoice.status} /> */}
                    {/* {invoice.ong} */}
                    {invoice.tecnologias.join(", ")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <InvoiceStatus status={invoice.status} /> */}
                    {/* {invoice.ong} */}
                    {invoice.ong}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex  justify-end gap-3">
                      {/* <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />  */}
                      <EditButton id={invoice.id.toString()} />
                      <DeleteButton id={invoice.id.toString()} />
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
