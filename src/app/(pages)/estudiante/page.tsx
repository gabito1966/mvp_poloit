import CreateButton from "@/components/dashboard/CreateButton";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import Table from "@/components/dashboard/Table";
// import Table from "@/components/dashboard/Table";
import { TableSkeleton } from "@/components/skeletons";
import { fetchPagesEstudiantes } from "@/database/data";
import { Suspense } from "react";

async function page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPagesEstudiantes(query);

  return (
    <div className="w-full flex-grow p-6  md:p-12 ">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1> */}
      </div>
      <div className="mt-4 flex items-center justify-between gap-96  max-md:gap-3">
        <Search placeholder="buscar estudiante..." />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
