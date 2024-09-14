// const shimmer =
//   "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function FormEstudianteSkeleton() {
  return (
    <div
      className={`container mt-10 mx-auto p-2 h-full bg-white self-center max-w-xl animate-pulse`}
    >
      <div className=" mt-2 h-6 my-5 w-full max-w-md p-1 rounded bg-gray-100 mx-auto" />
      <div className="flex flex-col space-y-4 gap-5">
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
      </div>
      <div className="flex justify-center items-center mt-5 w-full">
        <div className="h-8  rounded bg-blue-300 w-full " />
      </div>
    </div>
  );
}
export function FormMentorSkeleton() {
  return (
    <div
      className={`container mt-10 mx-auto p-2 h-full bg-white self-center max-w-xl animate-pulse`}
    >
      <div className=" mt-2 h-6 my-5 w-full max-w-md p-1 rounded bg-gray-100 mx-auto" />
      <div className="flex flex-col space-y-4 gap-5">
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
        <div className="mt-2 h-8 w-full p-3 rounded bg-gray-100" />
      </div>
      <div className="flex justify-center items-center mt-5 w-full">
        <div className="h-8  rounded bg-blue-300 w-full " />
      </div>
    </div>
  );
}

export function MobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function TableEstudianteSkeleton() {
  return (
    <div className="mt-6 flow-root animate-pulse">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Apellido
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Correo Electronico
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Teléfono
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tecnologías
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ongs
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Ver</span>
                  <span className="sr-only">Editar</span>
                  <span className="sr-only">Eliminar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export function TableMentorSkeleton() {
  return (
    <div className="mt-6 flow-root animate-pulse">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Apellido
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Correo Electronico
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Teléfono
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tecnologías
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Empresas
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Ver</span>
                  <span className="sr-only">Editar</span>
                  <span className="sr-only">Eliminar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg animate-pulse">
      {/* Customer Name and Image */}
      {/* <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td> */}
      {/* Nombre */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Apellido */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Teléfono */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Tecnologías */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* ongs/empresas */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}
