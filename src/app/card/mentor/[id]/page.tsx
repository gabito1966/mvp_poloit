import BackButton from "@/components/dashboard/BackButton";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function MentorCard({
  params,
}: {
  params?: { id: string };
}) {
  const { data: mentor } = await fetchGet(`/api/mentor/${params?.id}`);

  return (
    <section className="container max-w-5xl p-3 lg:pt-20 ml-5 lg:ml-0">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-2">
      <h1 className="text-lg lg:text-3xl text-center font-bold m-5">
        Card del Mentor {mentor.nombre} {mentor.apellido}{" "}
      </h1>
      <div className="w-full max-h-124 flex-col p-1 lg:p-4">
        <hr />
        {<div className="grid grid-cols-1 justify-center bg-gray-100 dark:bg-gray-600 items-center lg:grid-cols-2 lg:p-3 mt-5">
            <div className="flex-auto bg-white dark:bg-gray-700 rounded-lg m-3">
              <div className="ml-16 max-md:ml-0 p-1">
                <h4 className="block text-gray-500 dark:text-gray-400 font-medium mb-2 text-md">Apellido:</h4>
                <p className="bg-transparent text-base mb-4 font-semibold">
                  {mentor.apellido}
                </p>
              </div>
            </div>
            <div className="flex-auto bg-white dark:bg-gray-700 rounded-lg m-3">
              <div className="ml-16 max-md:ml-0 p-1">
                <h4 className="block text-gray-500 dark:text-gray-400 font-medium mb-2 text-md">Nombre:</h4>
                <p className="bg-transparent text-base mb-4 font-semibold">{mentor.nombre}</p>
              </div>
            </div>
            <div className="flex-auto bg-white dark:bg-gray-700 rounded-lg m-3">
              <div className="ml-16 max-md:ml-0 p-1">
                <h4 className="block text-gray-500 dark:text-gray-400 font-medium mb-2 text-md">Email:</h4>
                <p className="bg-transparent text-base mb-4 font-semibold">{mentor.email}</p>
              </div>
            </div>
            <div className="flex-auto bg-white dark:bg-gray-700 rounded-lg m-3">
              <div className="ml-16 max-md:ml-0 p-1">
                <h4 className="block text-gray-500 dark:text-gray-400 font-medium mb-2 text-md">Teléfono:</h4>
                <p className="bg-transparent text-base mb-4 font-semibold">
                  {mentor.telefono}
                </p>
              </div>
            </div>
            <div className="flex-auto bg-white dark:bg-gray-700 rounded-lg m-3">
              <div className="ml-16 max-md:ml-0 p-1">
                <h4 className="block text-gray-500 dark:text-gray-400 font-medium mb-2 text-md">
                  Tecnologías:
                </h4>
                <p className="bg-transparent text-base mb-4 font-semibold">
                  {mentor.tecnologias.map((e: any, i: number) => i === (mentor.tecnologias.length - 1) ? `${e.nombre}` : `${e.nombre}, `)}
                </p>
              </div>
            </div>
            <div className="flex-auto bg-white dark:bg-gray-700 rounded-lg m-3">
              <div className="ml-16 max-md:ml-0 p-1">
                <h4 className="block text-gray-500 dark:text-gray-400 font-medium mb-2 text-md">Empresas:</h4>
                <p className="bg-transparent text-base mb-4 font-semibold">
                  {mentor.nombre_empresa}
                </p>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
        <BackButton url="/mentor" />
      </div>
    </section>
  );
}
