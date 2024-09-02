import Search from "@/components/dashboard/Search";
import Table from "@/components/dashboard/Table";
import { TableSkeleton } from "@/components/skeletons";
import { fetchPages } from "@/database/data";
import { Suspense } from "react";

async function page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPages(query);

  return (
    <div className="w-full flex-grow p-6 md:overflow-y-auto md:p-12 ">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1> */}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}

export default page;
