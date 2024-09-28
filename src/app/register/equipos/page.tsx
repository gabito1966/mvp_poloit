import FormEquipo from "@/components/register/equipo/FormEquipo";
import { FormEquiposSkeleton } from "@/components/skeletons";
import { getCantEstudiantesSinGrupo } from "@/database/data";


export default async function RegisterEquipos() {

  const cantEstudiantesSinEquipo:number = await getCantEstudiantesSinGrupo();

  return (
    <>
        <FormEquipo  estudiantesNoGrupos={cantEstudiantesSinEquipo} />
    </>
  )
}
