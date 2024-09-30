

import Pagination from '@/components/dashboard/Pagination';
import Search from '@/components/dashboard/Search';
import TableNotificationMentor from '@/components/notificaciones/mentor/TableNotificationMentor';

import { TableEstudianteSkeleton } from '@/components/skeletons';
import { fetchPagesMentores } from '@/database/data';
import  { Suspense } from 'react'

export default async function page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPagesMentores(query);

  return (
    <div className="w-full flex-grow p-3  md:p-12">
       <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Lista de Mentores Removidos</h1>
      <div className="flex w-full items-center justify-between">
      </div>
      <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
        <Search placeholder="buscar mentor..." />
      
      </div>
      <Suspense key={query + currentPage} fallback={<TableEstudianteSkeleton />}>
        <TableNotificationMentor query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
