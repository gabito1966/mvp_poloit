import { fetchGet } from "@/lib/fetchFunctions";
import Link from "next/link";

export default async function MentorCard({
  params,
}: {
  params?: { id: string };
}) {
  const { data: mentor } = await fetchGet(`/api/mentor/${params?.id}`);

  return (
    <section className="container max-w-5xl">
      <h1 className="text-4xl text-center font-bold p-2 mt-10">
        Card del Mentor {mentor.nombre} {mentor.apellido}{" "}
      </h1>
      <div className="bg-gray-100 border-2 border-gray-200 rounded shadow-md p-5">
      <div className="w-full max-h-124 flex-col p-1 md:p-12 text-black border-2 border-gray-200 bg-white rounded-lg">
        {
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex-auto">
              <div className="ml-16 max-md:ml-0 ">
                <h4 className="block text-gray-500 font-medium mb-2 text-md">Apellido:</h4>
                <p className="bg-transparent text-base mb-6 font-semibold">
                  {mentor.apellido}
                </p>
              </div>
            </div>
            <div className="flex-auto">
              <div className="ml-16 max-md:ml-0 ">
                <h4 className="block text-gray-500 font-medium mb-2 text-md">Nombre:</h4>
                <p className="bg-transparent text-base mb-6 font-semibold">{mentor.nombre}</p>
              </div>
            </div>
            <div className="flex-auto">
              <div className="ml-16 max-md:ml-0 ">
                <h4 className="block text-gray-500 font-medium mb-2 text-md">Email:</h4>
                <p className="bg-transparent text-base mb-6 font-semibold">{mentor.email}</p>
              </div>
            </div>
            <div className="flex-auto">
              <div className="ml-16 max-md:ml-0 ">
                <h4 className="block text-gray-500 font-medium mb-2 text-md">Teléfono:</h4>
                <p className="bg-transparent text-base mb-6 font-semibold">
                  {mentor.telefono}
                </p>
              </div>
            </div>
            <div className="flex-auto">
              <div className="ml-16 max-md:ml-0 ">
                <h4 className="block text-gray-500 font-medium mb-2 text-md">
                  Tecnologías:
                </h4>
                <p className="bg-transparent text-base mb-6 font-semibold">
                  {mentor.tecnologias.map((e: any, i: number) => i === (mentor.tecnologias.length - 1) ? `${e.nombre}` : `${e.nombre}, `)}
                </p>
              </div>
            </div>
            <div className="flex-auto">
              <div className="ml-16 max-md:ml-0 ">
                <h4 className="block text-gray-500 font-medium mb-2 text-md">Empresas:</h4>
                <p className="bg-transparent text-base mb-6 font-semibold">
                  {mentor.nombre_empresa}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
      </div>
      
      <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-20">
        <Link href="/mentor">
          Volver a mentor
        </Link>
      </div>
    </section>
  );
}
