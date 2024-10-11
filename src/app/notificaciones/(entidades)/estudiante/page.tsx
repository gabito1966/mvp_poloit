import Pagination from '@/components/dashboard/Pagination';
import Search from '@/components/dashboard/Search';
import TableNotificationEstudiante from '@/components/notificaciones/estudiante/TableNotificacionEstudiante';
import { TableEstudianteSkeleton } from '@/components/skeletons';
import { fetchPagesEstudiantesBaja } from '@/database/data';
import { Suspense } from 'react';

export default async function page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPagesEstudiantesBaja(query);

  return (
    <section className='container max-w-7xl pt-20'>
        <div className="w-full flex-grow pt-20 bg-white dark:bg-gray-700 rounded-xl shadow-xl  md:p-12">
       <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left text-2xl">Lista de Estudiantes Eliminados</h1>
      <div className="flex w-full items-center justify-between">
      </div>
      <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
        <Search placeholder="buscar estudiante..." />
      </div>
      <Suspense key={query + currentPage} fallback={<TableEstudianteSkeleton />}>
        <TableNotificationEstudiante query={query} currentPage={currentPage} />
      </Suspense>
    </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
    
  );
}

