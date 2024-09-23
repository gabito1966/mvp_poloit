import CreateButton from "@/components/dashboard/CreateButton";
import DeleteButton from "@/components/dashboard/DeleteButton";
import TableGrupos from "@/components/dashboard/equipo/TableEquipoi";
import MailButton from "@/components/dashboard/MailButton";
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
        <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Lista de Grupos</h1>
       <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
         <Search placeholder="buscar grupos..." />
         <div className="flex flex-row items-center gap-3">
          <MailButton/>
         <DeleteButton url={"/api/equipo"} newClass="scale-125 pt-2" titulo="Eliminar todos"/>
         <CreateButton url="/register/grupos" />
         </div>
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
