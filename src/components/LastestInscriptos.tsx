import { fetchLatestStudents } from "@/database/data";
import clsx from "clsx";


export default async function LastestInscriptos() {

  const latestEstudiantes = await fetchLatestStudents();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Ultimos estudiantes
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
   

        <div className="bg-white px-6">
          {latestEstudiantes.map((estudiante, i) => {
            return (
              <div
                key={estudiante.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {estudiante.nombre} {estudiante.apellido}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {estudiante.email}
                    </p>
                  </div>
                </div>
                <p
                  className={` truncate text-sm font-medium md:text-base`}
                >
                  {estudiante.nombre_ong}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          {/* <ArrowPathIcon className="h-5 w-5 text-gray-500" /> */}
          <h3 className="ml-2 text-sm text-gray-500 ">Actualizado ahora mismo</h3>
        </div>
      </div>
    </div>
  );
   
  }
