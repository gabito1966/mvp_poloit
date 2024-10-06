import { fetchTecnologiasConEstudiantes } from "@/database/data";
import { generateYAxis } from "@/lib/utils";
import AnimatedBar from "./AnimatedBar";

export default async function ChartAlumnosTecnologias() {
  const { tecnologiasConEstudiantes, cantTotalEstudiantes } =
    await fetchTecnologiasConEstudiantes();
  const chartHeight = 235;

  const { yAxisLabels, topLabel } = generateYAxis(tecnologiasConEstudiantes);

  if (!tecnologiasConEstudiantes || tecnologiasConEstudiantes.length === 0) {
    return <p className="mt-4 text-gray-400">No hay datos disponibles.</p>;
  }

  return (
    <div className="w-full rounded-xl md:col-span-4 shadow-md">
      <div className=" rounded-xl bg-white text-black p-4">
        <h2 className={` text-xl mb-1 font-bold`}>
          Tecnologías dominadas por estudiantes
        </h2>
        <div className="relative flex flex-row gap-5 w-full  rounded-md bg-white py-4 ">
          <div className="  absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px]"></div>
          <div
            className="  z-10 mb-6 hidden flex-col ml-4 justify-between items-center text-xs  text-gray-400 sm:flex h-full"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label, i) => (
              <p key={label} className="lowercase text-xs">
                {label}
              </p>
            ))}
          </div>

            <div className={`sm:grid-cols-${tecnologiasConEstudiantes.length} w-full mt-0 grid grid-cols-${tecnologiasConEstudiantes.length} items-end gap-5 md:gap-4`}>

          {tecnologiasConEstudiantes.map((e, i) => (
            <div
              key={`${e.nombre}-${i}`}
              className="flex flex-col items-center gap-2"
            >
              <AnimatedBar
                chartHeight={chartHeight}
                topLabel={topLabel}
                cantTotalEstudiantes={cantTotalEstudiantes}
                tecnologia={e}
              />

              <p
                className="-rotate-90 text-sm truncate text-gray-400 sm:rotate-0"
                title={e.nombre}
                >
                {e.nombre.length < 5 ? e.nombre : `${e.nombre.slice(0, 5)}...`}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
