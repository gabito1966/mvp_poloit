import FormEquipo from "@/components/register/equipo/FormEquipo";
import { getCantEstudiantesSinGrupo } from "@/database/data";
import Link from "next/link";


export default async function RegisterEquipos() {

  const cantEstudiantesSinEquipo:number = await getCantEstudiantesSinGrupo();

  return (
    <section className="container max-w-7xl p-10">
    <div className="bg-white rounded-xl shadow-xl">
        <FormEquipo  estudiantesNoGrupos={cantEstudiantesSinEquipo} />
    </div>

        <div className="container justify-start mt-10">
          <Link href="/equipo" className="bg-blue-400 hover:bg-blue-700 w-52 rounded-md text-xl text-center text-white p-2 my-2">Volver a Equipos</Link>
        </div>
    </section>
  )
}
