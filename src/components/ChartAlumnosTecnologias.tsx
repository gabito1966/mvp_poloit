import { fetchTecnologiasConEstudiantes } from '@/database/data';
import { generateYAxis } from '@/lib/utils';
import React from 'react'

export default async function ChartAlumnosTecnologias() {
    const tecnologiasEstudiantes = await fetchTecnologiasConEstudiantes();
  const chartHeight = 100;

  const { yAxisLabels, topLabel } = generateYAxis(tecnologiasEstudiantes);

  if (!tecnologiasEstudiantes || tecnologiasEstudiantes.length === 0) {
    return <p className="mt-4 text-gray-400">No hay datos disponibles.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={` mb-4 text-xl md:text-2xl`}>
        Tecnologias / estudiantes
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-6 mt-0 grid grid-cols-6 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className='truncate'>{label}</p>
            ))}
          </div>

          {tecnologiasEstudiantes.map((e, i) => (
            <div key={`${e.nombre}-${i}`} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-400"
                style={{
                  height: `${(chartHeight / topLabel) * e.cantidad_estudiantes}px`,
                }}
              ></div>

              <p className="-rotate-90 text-sm truncate text-gray-400 sm:rotate-0" title={e.nombre} >
                {e.nombre.length<5?e.nombre:`${e.nombre.slice(0,5)}...`}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          {/* <CalendarIcon className="h-5 w-5 text-gray-500" /> */}
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );

  

}
