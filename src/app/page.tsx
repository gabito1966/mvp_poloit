import ChartAlumnosTecnologias from "@/components/ChartAlumnosTecnologias";
import HomeCardWrapper from "@/components/HomeCardWrapper";
import LastestInscriptos from "@/components/LastestInscriptos";
import Notification from "@/components/Notification";
import QuickActions from "@/components/QuickActions";
import {
  AlumnosTecnologiasChartSkeleton,
  CardsWrapperSkeleton,
  LatestInscriptosSkeleton,
  NotificationSkeleton,
  QuickActionsSkeleton,
} from "@/components/skeletons";
import { Suspense } from "react";

export default async function Home() {
  
  return (
    <main className=" w-full p-6 max-w-screen-2xl">
      <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Inicio</h1>
      <div className="w-full  gap-6 items-center justify-between grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 P-4 h-full sm:items-center sm:m-auto ">
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

      <section className="grid lg:grid-cols-2 grid-cols-1   mt-5 gap-5">
        <Suspense fallback={<NotificationSkeleton />}>
          <Notification />
        </Suspense>

        <Suspense fallback={<QuickActionsSkeleton/>}>
          <QuickActions />
        </Suspense>

      </section>
    </main>
  );
}