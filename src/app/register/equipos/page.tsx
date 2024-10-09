import BackButton from "@/components/dashboard/BackButton";
import FormEquipo from "@/components/register/equipo/FormEquipo";
import { getCantEstudiantesSinGrupo } from "@/database/data";


export default async function RegisterEquipos() {

  const cantEstudiantesSinEquipo:number = await getCantEstudiantesSinGrupo();

  return (
    <section className="container max-w-7xl p-10">
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl">
        <FormEquipo  estudiantesNoGrupos={cantEstudiantesSinEquipo} />
    </div>

    <div className="mx-auto flex items-center justify-between gap-40 max-w-7xl max-lg:gap-3 pt-5">
        <BackButton url="/equipo" />
      </div>
    </section>
  )
}
