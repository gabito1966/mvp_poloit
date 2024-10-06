import CreateButton from "@/components/dashboard/CreateButton";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import TableMentor from "@/components/dashboard/mentor/TableMentor";
import { TableMentorSkeleton } from "@/components/skeletons";
import { fetchPagesMentores } from "@/database/data";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Mentores",
    description: "Encuentra el listado de mentores",
  };

async function page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchPagesMentores(query);

    return (
        <section className="container max-w-7xl pt-20">
            <div className="w-full flex-grow p-3  md:p-12 bg-white rounded-xl shadow-xl">
                <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Lista de Mentores</h1>
                <div className="flex w-full items-center justify-between">
                </div>
                <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
                    <Search placeholder="buscar mentor..." />
                    <CreateButton url="/register/mentores" />
                </div>
                <Suspense key={query + currentPage} fallback={<TableMentorSkeleton />}>
                    <TableMentor query={query} currentPage={currentPage} />
                </Suspense>
            </div>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
        </section>
    );
}

export default page;
