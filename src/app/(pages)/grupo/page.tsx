import CreateButton from "@/components/dashboard/CreateButton";
import TableGrupos from "@/components/dashboard/grupo/TableGrupos";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import { TableEstudianteSkeleton } from "@/components/skeletons";
import { fetchPagesEquipos } from "@/database/data";
import { Suspense } from "react";

async function page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
 
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchPagesEquipos(query);

    return (
        <div className="w-full flex-grow p-3  md:p-12">
        <h1 className="text-4xl font-semibold mb-4 text-center underline">Lista de Grupos</h1>
       <div className="flex w-full items-center justify-between">
       </div>
       <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
         <Search placeholder="buscar grupos..." />
         <CreateButton url="/register/grupos" />
       </div>
       {/* hacer esquleto de grupos */}
       <Suspense key={query + currentPage} fallback={<TableEstudianteSkeleton />}>
         <TableGrupos  query={query} currentPage={currentPage} />
       </Suspense>
       <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} />
       </div>
     </div>
    )
}

export default page
