import { fetchFilteredEquipos, fetchFilteredEstudiantes } from "@/database/data";
import DeleteButton from "../DeleteButton";
import ViewButton from "../ViewButton";

export default async function TableGrupo({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const grupos = await fetchFilteredEquipos(query, currentPage);
  console.log(grupos);

  return (<>
  </>
    // <div className="mt-6 flow-root">
    //   <div className="inline-block min-w-full align-middle">
    //     <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
    //       <div className="lg:hidden">
    //         {grupos?.map((grupo) => (
    //           <div
    //             key={grupo.id}
    //             className="mb-2 w-full rounded-md bg-white p-4"
    //           >
    //             <div className="flex items-center justify-between border-b pb-4">
    //               <div>
    //                 <div className="mb-2 flex items-center">
    //                   <p>{grupo.nombre}</p>
    //                 </div>
    //                 <p className="text-sm text-gray-500">{grupo.email}</p>
    //               </div>
    //             </div>
    //             <div className="flex w-full items-center justify-between pt-4">
    //               <div>
    //                 <p className="text-xl font-medium">{grupo.apellido}</p>
    //                 <p></p>
    //               </div>
    //               <div className="flex justify-end gap-2">
    //                 <ViewButton
    //                   url={`/edit/estudiante/${grupo.id.toString()}`}
    //                 />
    //                 <DeleteButton
    //                   url={`/api/estudiante/${grupo.id.toString()}`}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //       <table className="hidden min-w-full text-gray-900 lg:table">
    //         <thead className="rounded-lg text-left text-sm font-normal">
    //           <tr>
    //             <th scope="col" className="capitalize px-4 py-5 font-medium ">
    //               nombre grupo
    //             </th>
    //             <th scope="col" className="capitalize px-3 py-5 font-medium">
    //               nombre mentor
    //             </th>
    //             <th scope="col" className="capitalize px-3 py-5 font-medium">
    //               UX/UI
    //             </th>
    //             <th scope="col" className="capitalize px-3 py-5 font-medium">
    //               QA
    //             </th>
    //             <th scope="col" className="capitalize px-3 py-5 font-medium">
    //               Cantidad de integrantes
    //             </th>
    //             <th scope="col" className="capitalize px-3 py-5 font-medium">
    //               fecha
    //             </th>

    //             <th scope="col" className="relative py-3 pl-6 pr-3">
    //               {/* <div className="flex  justify-end gap-3">
    //                 <ViewButton
    //                   url={`/card/estudiante/${estudiante.id.toString()}`}
    //                 />
    //                 <DeleteButton
    //                   url={`/api/estudiante/${estudiante.id.toString()}`}
    //                 />
    //               </div> */}
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white">
    //           {grupos?.map((grupo) => (
    //             <tr
    //               key={grupo.id}
    //               className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    //             >
    //               <td className="whitespace-nowrap py-3 px-3">
    //                 {grupo.nombre}
    //               </td>
    //               <td className="whitespace-nowrap px-3 py-3">
    //                 {grupo.apellido}
    //               </td>
    //               <td className="whitespace-nowrap px-3 py-3">{grupo.email}</td>
    //               <td className="whitespace-nowrap px-3 py-3">
    //                 {grupo.telefono}
    //               </td>
    //               <td className="whitespace-nowrap px-3 py-3">
    //                 {grupo.tecnologias.join(", ")}
    //               </td>
    //               <td className="whitespace-nowrap px-3 py-3">{grupo.ong}</td>
    //               <td className="whitespace-nowrap py-3 pl-6 pr-3">
    //                 <div className="flex  justify-end gap-3">
    //                   <ViewButton url={`/edit/grupo/${grupo.id.toString()}`} />
    //                   <DeleteButton url={`/api/grupo/${grupo.id.toString()}`} />
    //                 </div>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
}
