import BackButton from "@/components/dashboard/BackButton";
import { Equipo, Mentor } from "@/lib/definitions/frontEndDefinitions";
import { fetchGet } from "@/lib/fetchFunctions";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const formatFecha = (fecha: string) =>
  new Date(fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
    );
  };

  const getStatusColor = (status: boolean) => {
    return status
      ? "text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-800"
      : "text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-800";
  };

  const getStatusText = (status: boolean) => {
    return status ? "Activo" : "Eliminado";
  };

const MentorTable: React.FC<{ mentores: Mentor[] }> = ({ mentores }) => (
  <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 ">
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table className="min-w-full border-collapse rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-600">
          <tr>
            <th className="text-left p-3 font-semibold text-xs sm:text-sm ">
              Apellido y Nombre
            </th>
            <th className="text-left p-3 font-semibold text-xs sm:text-sm">
              Email
            </th>
            <th className="text-left p-3 font-semibold text-xs sm:text-sm">
              Teléfono
            </th>
            <th className="text-left p-3 font-semibold text-xs sm:text-sm">
              Tecnología
            </th>
            <th className="text-left p-3 font-semibold text-xs sm:text-sm">
              estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {mentores.map((mentor, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <td className="p-3 text-xs sm:text-sm capitalize">{`${mentor.apellido}, ${mentor.nombre}`}</td>
              <td className="p-3 text-xs sm:text-sm">{mentor.email}</td>
              <td className="p-3 text-xs sm:text-sm">{mentor.telefono}</td>
              <td className="p-3 text-xs sm:text-sm">{mentor.tecnologia}</td>
              <td className="p-3 text-xs sm:text-sm"><div className="flex items-center">
                    {getStatusIcon(mentor.estado)}
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        mentor.estado
                      )}`}
                    >
                      {getStatusText(mentor.estado)}
                    </span>
                  </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const IntegrantesTable: React.FC<{ equipo: Equipo }> = ({ equipo }) => {
  
  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-600">
            <tr>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">
                Apellido y Nombre
              </th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">
                Email
              </th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">
                Teléfono
              </th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">
                Tecnología
              </th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {equipo.nombres_estudiantes.map((nombre, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td
                  className="p-3 text-xs sm:text-sm capitalize"
                  title={`${equipo.apellidos_estudiantes[index]}, ${nombre}`}
                >{`${equipo.apellidos_estudiantes[index]}, ${nombre}`}</td>
                <td
                  className="p-3 text-xs sm:text-sm"
                  title={`${equipo.emails_estudiantes[index]}`}
                >
                  {equipo.emails_estudiantes[index]}
                </td>
                <td
                  className="p-3 text-xs sm:text-sm"
                  title={`${equipo.telefonos_estudiantes[index]}`}
                >
                  {equipo.telefonos_estudiantes[index]}
                </td>
                <td
                  className="p-3 text-xs sm:text-sm"
                  title={`${equipo.tecnologias[index]}`}
                >
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold">
                    {equipo.tecnologias[index].length < 6
                      ? equipo.tecnologias[index]
                      : equipo.tecnologias[index].slice(0, 6) + "..."}
                  </span>
                </td>
                <td
                  className="p-3 text-xs sm:text-sm"
                  title={`${equipo.estados_estudiantes[index]}`}
                >
                  <div className="flex items-center">
                    {getStatusIcon(equipo.estados_estudiantes[index])}
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        equipo.estados_estudiantes[index]
                      )}`}
                    >
                      {getStatusText(equipo.estados_estudiantes[index])}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default async function EquipoCard({
  params,
}: {
  params?: { id: string };
}) {
  const { data: equipo } = await fetchGet(`/api/equipo/${params?.id}`);

  if (!equipo) {
    return (
      <p className="text-center text-red-500 font-semibold">
        Error al cargar el equipo.
      </p>
    );
  }

  const fecha_inicial = formatFecha(equipo.fecha_inicio);
  const fecha_final = formatFecha(equipo.fecha_fin);

  const mentores = [
    {
      id: equipo.id_mentor,
      apellido: equipo.mentor_apellido,
      nombre: equipo.mentor,
      email: equipo.mentor_email,
      telefono: equipo.mentor_telefono,
      tecnologia: "Tecnologías",
      estado: equipo.mentor_estado,
    },
    {
      id: equipo.id_mentor_qa,
      apellido: equipo.mentor_qa_apellido,
      nombre: equipo.mentor_qa,
      email: equipo.mentor_qa_email,
      telefono: equipo.mentor_qa_telefono,
      tecnologia: "QA",
      estado: equipo.mentor_qa_estado,
    },
    {
      id: equipo.id_mentor_ux_ui,
      apellido: equipo.mentor_ux_ui_apellido,
      nombre: equipo.mentor_ux_ui,
      email: equipo.mentor_ux_ui_email,
      telefono: equipo.mentor_ux_ui_telefono,
      tecnologia: "UX/UI",
      estado: equipo.mentor_ux_ui_estado,
    },
  ];

  return (
    <section className="container max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold p-4 sm:p-6 bg-gray-50 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-600">
          Equipo: {equipo.nombre}
        </h2>
        <div className=" p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Nombre:
              </h4>
              <p className="text-base sm:text-lg font-semibold mt-1">
                {equipo.nombre}
              </p>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Integrantes:
              </h4>
              <p className="text-base sm:text-lg font-semibold mt-1">
                {equipo.tamano}
              </p>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Fecha Inicio:
              </h4>
              <p className="text-base sm:text-lg font-semibold mt-1">
                {fecha_inicial}
              </p>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Finaliza:
              </h4>
              <p className="text-base sm:text-lg font-semibold mt-1">
                {fecha_final}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Mentores
            </h2>
            <MentorTable mentores={mentores} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Integrantes
            </h2>
            <IntegrantesTable equipo={equipo} />
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 w-fit">
        <BackButton url="/equipo" />
      </div>
    </section>
  );
}
