const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

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

export function FormEquiposSkeleton() {
  return (
    <div
      className={`container mt-10  px-16 py-4 h-full bg-white  max-w-7xl  justify-between`}
    >
      <div className=" mt-2 h-8 my-5 w-full max-w-80 lg:max-w-2xl  p-1 animate-pulse flex-start rounded bg-gray-100 " />
      <div className="flex flex-col  lg:flex-row  justify-between shadow-sm pb-4 shadow-blue-50  w-full animate-pulse gap-5">
        <div className="grid grid-cols-1  justify-items-center lg:justify-items-start sm:grid-cols-2 mt-5 lg:min-w-[500px] gap-5">
          <div className="mt-2 h-8 w-56 lg:w-full p-3 rounded bg-gray-100" />
          <div className="mt-2 h-8 w-56 lg:w-full p-3 rounded bg-gray-100" />
          <div className="mt-2 h-8 w-56 lg:w-full p-3 rounded bg-gray-100" />
          <div className="mt-2 h-8 w-56 lg:w-full p-3 rounded bg-gray-100" />
        </div>
        <div className="flex  justify-center sm:justify-end items-center  mt-auto w-full">
          <div className="h-9  rounded bg-blue-300 w-56 lg:w-64 " />
        </div>
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
          <div className="h-[20px] w-[20px] rounded bg-gray-100"></div>
          <div className="h-[20px] w-[20px] rounded bg-gray-100"></div>
          <div className="h-[20px] w-[20px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="ml-24 w-full mt-14">
      <div
        role="status"
        className=" w-full p-4 border max-w-screen-lg border-gray-100 rounded-lg shadow animate-pulse md:p-6 md:w-auto "
      >
        <div className="h-8 bg-gray-100 rounded-full mx-auto mb-5 my-4 max-w-xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32  "></div>
              <div className="h-4  bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
          <div className="flex  justify-center">
            <div>
              <div className="h-4  mb-4 bg-gray-100 rounded-full  w-32 "></div>
              <div className="h-4   bg-gray-100 rounded-full  w-32  mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LatestInscriptosSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 animate-pulse`}
    >
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="flex flex-row justify-between items-center">
          <div className="mb-4 h-6 w-60 rounded-md bg-gray-200" />
          <div className="mb-4 h-5 w-14 rounded-md bg-gray-200" />
        </div>
        <div className="bg-white px-6 ">
          <InscriptosSkeleton />
          <InscriptosSkeleton />
          <InscriptosSkeleton />
          <InscriptosSkeleton />
          <InscriptosSkeleton />
        </div>
      </div>
    </div>
  );
}

export function AlumnosTecnologiasChartSkeleton() {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden md:col-span-4 animate-pulse`}
    >
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="flex items-center p-2">
          <div className=" h-7 w-96 rounded-md bg-gray-200" />
        </div>
        <div className="mt-0 grid h-[300px] grid-cols-5 items-end justify-items-center gap-6 rounded-md bg-white p-4 sm:grid-cols-6 md:gap-2">
          <div className=" h-full w-7 lg:flex-col justify-between gap 2 rounded-xl hidden lg:flex">
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
            <div className=" bg-gray-200 h-4 w-4" />
          </div>
          <div className="bg-blue-100 h-full w-9 rounded-xl" />
          <div className="bg-blue-100 h-4/5 w-9 rounded-xl" />
          <div className="bg-blue-100 h-1/2 w-9 rounded-xl" />
          <div className="bg-blue-100 h-1/2 w-9 rounded-xl" />
          <div className="bg-blue-100 h-1/4 w-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function InscriptosSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-2">
      <div className="flex items-center">
        <div className="min-w-0">
          <div className="h-4 w-14 rounded-md bg-gray-200" />
          <div className="mt-2 h-3 w-40 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-28 rounded-md bg-gray-200" />
    </div>
  );
}

export function CardItemSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm animate-pulse`}
    >
      <div className="flex items-center justify-center  rounded-xl bg-white p-0">
        <div className="h-10 w-10 rounded-md bg-gray-200" />
        <div className="flex p-4 flex-col gap-2">
          <div className=" h-4 w-20 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="h-6 w-6 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function CardsWrapperSkeleton() {
  return (
    <>
      <CardItemSkeleton />
      <CardItemSkeleton />
      <CardItemSkeleton />
      <CardItemSkeleton />
    </>
  );
}

export function NotificationSkeleton() {
  return (
    <div className={`${shimmer} relative w-full h-full inline animate-pulse`}>
      <div className="rounded-xl bg-gray-100 p-6">
        <div className="flex items-center py-2">
          <div className=" h-7 w-48 rounded-md bg-gray-200" />
        </div>
        <div className=" mt-0  bg-white rounded-xl p-3 flex flex-col gap-2">
          <div className="flex flex-row gap-2 ">
            <div className=" bg-gray-100 h-5 w-5 rounded-md" />
            <div className=" bg-gray-100 h-5 w-96 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 ">
            <div className=" bg-gray-100 h-5 w-5 rounded-md" />
            <div className=" bg-gray-100 h-5 w-96 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 ">
            <div className=" bg-gray-100 h-5 w-5 rounded-md" />
            <div className=" bg-gray-100 h-5 w-96 rounded-md" />
          </div>
          <div className="flex flex-row gap-2 ">
            <div className=" bg-gray-100 h-5 w-5 rounded-md" />
            <div className=" bg-gray-100 h-5 w-96 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuickActionsSkeleton() {
  return (
    <div className={`${shimmer} relative w-full h-full inline animate-pulse`}>
      <div className="rounded-xl bg-gray-100 p-6">
        <div className="flex items-center py-2">
          <div className=" h-7 w-48 rounded-md bg-gray-200" />
        </div>
        <div className=" mt-0  bg-white rounded-xl p-3 grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2  gap-2">
          <div className=" ">
            <div className=" bg-blue-100 h-12 w-full rounded-md" />
          </div>
          <div className=" ">
            <div className=" bg-blue-100 h-12 w-full rounded-md" />
          </div>
          <div className=" ">
            <div className=" bg-blue-100 h-12 w-full rounded-md" />
          </div>
          <div className=" ">
            <div className=" bg-blue-100 h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MensajeSkeleton() {
  return (
    <>
      <div className="flex flex-col p-12 w-full gap-5 animate-pulse">
        <div className="h-7 w-60 bg-gray-100 dark:bg-gray-700 justify-self-start rounded-lg" />

        <div className="grid grid-cols-1 grid-rows-2 gap-5 lg:grid-cols-5 lg:grid-rows-1 rounded-lg">
          <div className="col-span-1 lg:col-span-2 min-h-[800px]  bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className=" flex flex-row p-4  items-center justify-between ">
              <div className="flex flex-row items-center gap-2 rounded-md">
                <div className="h-9 w-9 bg-blue-100 rounded-md" />
                <div className="w-40 bg-white dark:bg-slate-500 h-7 rounded-md" />
              </div>
              <div className="h-4 w-20 bg-white rounded-md" />
            </div>
            <div className="flex flex-col gap-5 px-4">
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
              <div className="h-16 w-full bg-white dark:bg-slate-500 rounded-md "></div>
            </div>
          </div>
          <div className="flex flex-col justify-between col-span-1 lg:col-span-3 min-h-[800px] bg-gray-100 rounded-lg p-4 gap-4 dark:bg-slate-700">
            <div className=" flex flex-row   items-center justify-between ">
              <div className="flex flex-row items-center gap-2 rounded-md">
                <div className="h-14 w-14 bg-blue-100 rounded-md" />
                <div className="w-80 bg-white h-7 rounded-md dark:bg-slate-500" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="h-6 w-32 bg-blue-100 rounded-md" />
                <div className="h-6 w-32 bg-white rounded-md dark:bg-slate-500" />
              </div>
            </div>

            <div className="w-full h-full bg-white  dark:bg-slate-500 rounded-md" />

            <div className=" flex flex-row   items-center justify-between ">
              <div className="flex flex-row items-center gap-2 rounded-md">
                <div className="w-96 bg-white h-16 rounded-md dark:bg-slate-500" />
              </div>
                <div className="h-9 w-20 bg-blue-100 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
