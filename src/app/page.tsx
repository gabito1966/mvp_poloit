import Carousel from "@/components/Carousel";
import ChartAlumnosTecnologias from "@/components/ChartAlumnosTecnologias";
import HomeCardWrapper from "@/components/HomeCardWrapper";
import LastestInscriptos from "@/components/LastestInscriptos";
import {
  AlumnosTecnologiasChartSkeleton,
  CardsWrapperSkeleton,
  LatestInscriptosSkeleton,
} from "@/components/skeletons";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const images = [
    "/logo-empujar.png",
    "/logo-fundacion-integrar.png",
    "/logo-forge.png",
    "/logo-silvertech.png",
    "/logo-gestion-y-desarrollo.png",
    "/logo-codo-a-codo.png",
  ];

  return (
    <main className=" ">
      <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-4 P-4 h-full">
      <Suspense fallback={<CardsWrapperSkeleton />}>
        <HomeCardWrapper />
      </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<AlumnosTecnologiasChartSkeleton />}>
          <ChartAlumnosTecnologias />
        </Suspense>
        <Suspense fallback={<LatestInscriptosSkeleton />}>
          <LastestInscriptos />
        </Suspense>
      </div>
      <section>
        <div className="container mt-5 border-2 border-gray-800 rounded-lg w-1/2 items-center mx-auto">
          <h2 className="font-bold text-2xl text-center w-full underline">
            Organizaciones Participantes
          </h2>
          <div className="h-auto w-full my-3 flex items-center">
            <Carousel images={images} />
          </div>
        </div>
      </section>
      {/* <section className="grid grid-cols-2 mt-5 gap-5">
        <div className="h-48  m-5 border-2 border-slate-600 rounded-lg">
          <h3 className="font-semibold text-xl mx-6 my-3">Notificaciones</h3>
          <div className="flex p-1 ml-5">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
          <p className="text-md ml-1">Estudiantes nuevos</p>
          </div>
          <div className="flex p-1 ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
            <p className="text-md ml-1">Mentores nuevos</p>
          </div>
          <div className="flex p-1 ml-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
          <p className="text-md ml-1">Estudiantes se dieron de baja</p>
          </div>
          <div className="flex p-1 ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
            <p className="text-md ml-1">Mentores se dieron de baja</p>
          </div>
        </div>
        <div className="h-48 border-2 m-5 border-slate-600 rounded-lg">
            <h2 className="font-bold text-center text-xl mx-6 my-3">Acciones Rápidas</h2>
          <div className="p-2 flex flex-col justify-center">
            <Link href='/register/estudiantes' className="bg-blue-400 hover:bg-blue-700 p-2 text-white rounded-full text-center min-w-45 mx-auto">Registrar Estudiante</Link>
            <Link href='/register/mentores' className="bg-blue-400 hover:bg-blue-700 p-2 text-white rounded-full text-center min-w-45 mx-auto mt-3">Registrar Mentor</Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
