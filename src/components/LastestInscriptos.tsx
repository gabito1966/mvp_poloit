import { fetchLatestStudents } from "@/database/data";
import clsx from "clsx";
import Link from "next/link";

export default async function LastestInscriptos() {
  const latestEstudiantes = await fetchLatestStudents();

  return (
    <div className="flex w-full flex-col md:col-span-4 shadow-md rounded-xl">
      {/* <LatestInscriptosSkeleton /> */}
      <div className="flex grow flex-col justify-between rounded-xl text-black bg-white dark:bg-gray-600 p-4">
        <div className="w-full flex flex-row justify-between items-center">
          <h2 className={`mb-1 text-xl font-bold `}>
            Últimos estudiantes registrados
          </h2>

          <Link
            href="/estudiante"
            className="text-lg text-blue-400 hover:text-blue-700 hover:underline font-semibold "
          >
            Ver más
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-xl px-6">
          {latestEstudiantes.map((estudiante, i) => {
            return (
              <div
                key={estudiante.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-2",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p
                      className="truncate text-sm font-semibold "
                      title={estudiante.nombre}
                    >
                      {estudiante.nombre} {estudiante.apellido}
                    </p>
                    <p
                      className="hidden text-sm text-gray-500 sm:block"
                      title={estudiante.email}
                    >
                      {estudiante.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`hidden sm:block truncate text-sm font-medium `}
                  title={estudiante.nombre_ong}
                >
                  {estudiante.nombre_ong}
                </p>
                <p
                  className={`sm:hidden truncate text-sm font-medium `}
                  title={estudiante.nombre_ong}
                >
                  {estudiante.nombre_ong.slice(0, 10)}...
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
