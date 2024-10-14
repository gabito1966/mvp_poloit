import BackButton from '@/components/dashboard/BackButton';
import FormEquipo from '@/components/register/equipo/FormEquipo';
import { getCantEstudiantesSinGrupo, getEstudiantesSinGrupo, getMentoresQASinGrupos, getMentoresTecnicosSinGrupos, getMentoresUXUISinGrupos } from '@/database/data';
import { fetchGet } from '@/lib/fetchFunctions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function EquipoEdit({
    params,
  }: {
    params?: { id: string };
  }) {

      const [ cantEstudiantesSinEquipo, estudiantesSinGrupo, mentoresTecnicosSinGrupos, mentoresQASinGrupos, mentoresUXUISinGrupos, dataEquipo ] = await Promise.all( [getCantEstudiantesSinGrupo(),getEstudiantesSinGrupo(), getMentoresTecnicosSinGrupos(), getMentoresQASinGrupos(),getMentoresUXUISinGrupos(), params
        ? fetchGet(`/api/equipo/${params.id}`)
        : undefined,]);

    if(params?.id){
        revalidatePath(`/edit/estudiante/${params.id}`);
        if(!dataEquipo.success){
          //mensaje de error
          redirect("/equipo");
        }
      }

      return (
        <section className="container max-w-7xl p-10">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md">
            <FormEquipo  estudiantesNoGrupos={cantEstudiantesSinEquipo} estudiantesSinGrupo={estudiantesSinGrupo} 
            mentoresTecnicosSinGrupos={mentoresTecnicosSinGrupos}
            mentoresQASinGrupos={mentoresQASinGrupos}
            mentoresUXUISinGrupos={mentoresUXUISinGrupos}
            dataEquipo={dataEquipo.data} />
        </div>
    
        <div className="mx-auto flex items-center justify-between gap-40 max-w-7xl max-lg:gap-3 pt-5">
            <BackButton url="/equipo" />
          </div>
        </section>
      )
    }

