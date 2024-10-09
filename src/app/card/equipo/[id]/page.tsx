import BackButton from "@/components/dashboard/BackButton";
import { fetchGet } from "@/lib/fetchFunctions";

type Mentor = {
    apellido: string;
    nombre: string;
    email: string;
    telefono: string;
    tecnologia: string;
};

type Equipo = {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    tamano: number;
    mentor_apellido: string;
    mentor: string;
    mentor_email: string;
    mentor_telefono: string;
    mentor_qa_apellido: string;
    mentor_qa: string;
    mentor_qa_email: string;
    mentor_qa_telefono: string;
    mentor_ux_ui_apellido: string;
    mentor_ux_ui: string;
    mentor_ux_ui_email: string;
    mentor_ux_ui_telefono: string;
    nombres_estudiantes: string[];
    apellidos_estudiantes: string[];
    emails_estudiantes: string[];
    telefonos_estudiantes: string[];
    tecnologias: string[];
};

const formatFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

const MentorTable: React.FC<{ mentores: Mentor[] }> = ({ mentores }) => (
    <table className="table-auto w-full">
        <thead className="text-left bg-gray-100 dark:bg-gray-600">
            <tr>
                <th className="px-4 py-2">Apellido y Nombre</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Tecnología</th>
            </tr>
        </thead>
        <tbody>
            {mentores.map((mentor, index) => (
                <tr key={index} className="hover:bg-gray-100 hover:text-gray-900">
                    <td className="px-4 py-2">{`${mentor.apellido}, ${mentor.nombre}`}</td>
                    <td className="px-4 py-2">{mentor.email}</td>
                    <td className="px-4 py-2">{mentor.telefono}</td>
                    <td className="px-4 py-2">{mentor.tecnologia}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const IntegrantesTable: React.FC<{ equipo: Equipo }> = ({ equipo }) => (
    <div className="overflow-x-auto">
        <table className="table-auto w-full">
            <thead className="text-left bg-gray-100 dark:bg-gray-600">
                <tr>
                    <th className="px-4 py-2">Apellido y Nombre</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Teléfono</th>
                    <th className="px-4 py-2">Tecnología</th>
                </tr>
            </thead>
            <tbody>
                {equipo.nombres_estudiantes.map((nombre, index) => (
                    <tr key={index} className="hover:bg-gray-100 hover:text-gray-900">
                        <td className="px-4 py-2">{`${equipo.apellidos_estudiantes[index]}, ${nombre}`}</td>
                        <td className="px-4 py-2">{equipo.emails_estudiantes[index]}</td>
                        <td className="px-4 py-2">{equipo.telefonos_estudiantes[index]}</td>
                        <td className="px-4 py-2">{equipo.tecnologias[index]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default async function EquipoCard({
    params,
}: {
    params?: { id: string };
}) {
    const { data: equipo } = await fetchGet(`/api/equipo/${params?.id}`);

    if (!equipo) {
        return <p>Error al cargar el equipo.</p>; 
    }

    const fecha_inicial = formatFecha(equipo.fecha_inicio);
    const fecha_final = formatFecha(equipo.fecha_fin);

    const mentores = [
        {
            apellido: equipo.mentor_apellido,
            nombre: equipo.mentor,
            email: equipo.mentor_email,
            telefono: equipo.mentor_telefono,
            tecnologia: "Tecnologías",
        },
        {
            apellido: equipo.mentor_qa_apellido,
            nombre: equipo.mentor_qa,
            email: equipo.mentor_qa_email,
            telefono: equipo.mentor_qa_telefono,
            tecnologia: "QA",
        },
        {
            apellido: equipo.mentor_ux_ui_apellido,
            nombre: equipo.mentor_ux_ui,
            email: equipo.mentor_ux_ui_email,
            telefono: equipo.mentor_ux_ui_telefono,
            tecnologia: "UX/UI",
        },
    ];

    return (
        <section className="container max-w-5xl pt-10">
            <div className="flex flex-col w-full bg-white dark:bg-gray-700 rounded-xl shadow-xl p-5">
                <h2 className="text-4xl text-center font-bold p-2 m-3">
                    Card del Equipo: {equipo.nombre}
                </h2>
                <div className="rounded-xl bg-gray-100 dark:bg-gray-600 shadow-md p-4">
                    <div className="w-full mb-5 max-h-36 flex-col p-1 md:p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            <div className="flex-auto">
                                <h4 className="block mb-1 text-md text-gray-500 dark:text-gray-400 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-xl mb-2 font-semibold">{equipo.nombre}</p>
                            </div>
                            <div className="flex-auto">
                                <h4 className="block mb-1 text-md text-gray-500 dark:text-gray-400 font-medium">Integrantes:</h4>
                                <p className="bg-transparent text-xl mb-2 font-semibold">{equipo.tamano}</p>
                            </div>
                            <div className="flex-auto">
                                <h4 className="block mb-1 text-md text-gray-500 dark:text-gray-400 font-medium">Fecha Inicio:</h4>
                                <p className="bg-transparent text-xl mb-2 font-semibold">{fecha_inicial}</p>
                            </div>
                            <div className="flex-auto">
                                <h4 className="block mb-1 text-md text-gray-500 dark:text-gray-400 font-medium">Finaliza:</h4>
                                <p className="bg-transparent text-xl mb-2 font-semibold">{fecha_final}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mb-5 flex-col p-1 md:p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <h2 className="text-left font-bold pt-1 pb-2 text-xl">Mentores</h2>
                        <MentorTable mentores={mentores} />
                    </div>
                    <div className="w-full max-h-124 flex-col p-1 md:p-2 bg-white dark:bg-gray-700 rounded-lg">
                        <h2 className="text-left font-bold pt-2 pb-3 text-xl">Integrantes</h2>
                        <IntegrantesTable equipo={equipo} />
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
        <BackButton url="/equipo" />
      </div>
        </section>
    );
}
