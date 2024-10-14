import BackButton from "@/components/dashboard/BackButton";
import FormEquipo from "@/components/register/equipo/FormEquipo";
import { getCantEstudiantesSinGrupo,getEstudiantesSinGrupo,getMentoresTecnicosSinGrupos, getMentoresQASinGrupos, getMentoresUXUISinGrupos } from "@/database/data";

export default async function RegisterEquipos() {
  
  const [ cantEstudiantesSinEquipo, estudiantesSinGrupo, mentoresTecnicosSinGrupos, mentoresQASinGrupos, mentoresUXUISinGrupos ] = await Promise.all( [getCantEstudiantesSinGrupo(),getEstudiantesSinGrupo(), getMentoresTecnicosSinGrupos(), getMentoresQASinGrupos(),getMentoresUXUISinGrupos()]);
  
  return (
    <section className="container max-w-7xl p-10">
    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md">
        <FormEquipo  estudiantesNoGrupos={cantEstudiantesSinEquipo} estudiantesSinGrupo={estudiantesSinGrupo} 
        mentoresTecnicosSinGrupos={mentoresTecnicosSinGrupos}
        mentoresQASinGrupos={mentoresQASinGrupos}
        mentoresUXUISinGrupos={mentoresUXUISinGrupos} />
    </div>

    <div className="mx-auto flex items-center justify-between gap-40 max-w-7xl max-lg:gap-3 pt-5">
        <BackButton url="/equipo" />
      </div>
    </section>
  )
}
