import Pagination from '@/components/dashboard/Pagination';
import Search from '@/components/dashboard/Search';
import TableNotificacionEquipo from '@/components/notificaciones/equipo/TableNotificacionEquipo';
import { TableEstudianteSkeleton } from '@/components/skeletons';
import { fetchPagesEquiposBaja } from '@/database/data';

import { Suspense } from 'react';

export default async function page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPagesEquiposBaja(query);

  return (
    <section className='container max-w-7xl pt-20'>
    <div className="w-full flex-grow pt-20 dark:bg-gray-700 bg-white rounded-xl shadow-xl  md:p-12">
       <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Lista de Equipos Eliminados</h1>
      <div className="flex w-full items-center justify-between">
      </div>
      <div className="p-4 flex items-center justify-between gap-10 max-lg:gap-3">
        <Search placeholder="buscar equipo..." />
      </div>
      <Suspense key={query + currentPage} fallback={<TableEstudianteSkeleton />}>
        <TableNotificacionEquipo query={query} currentPage={currentPage} />
      </Suspense>
    </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}

