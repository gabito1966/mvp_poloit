import CreateButton from "@/components/dashboard/CreateButton";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import TableMentor from "@/components/dashboard/mentor/TableMentor";
import { TableMentorSkeleton } from "@/components/skeletons";
import { fetchPagesMentores } from "@/database/data";
import { PageProps } from "@/lib/definitions/frontEndDefinitions";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Mentores",
    description: "Encuentra el listado de mentores",
};

async function page({ searchParams }: PageProps) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchPagesMentores(query);

    return (
        <section className="container max-w-7xl pt-20">
            <div className="w-full flex-grow p-3 lg:p-12 bg-white dark:bg-gray-700 rounded-xl shadow-xl">
                <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center lg:text-left">Lista de Mentores</h1>
                <HeaderActions />
                <Suspense key={`${query}-${currentPage}`} fallback={<TableMentorSkeleton />}>
                    <TableMentor query={query} currentPage={currentPage} />
                </Suspense>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </section>
    );
}

const HeaderActions: React.FC = () => {
    return (
        <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
            <Search placeholder="Buscar mentor..." />
            <CreateButton url="/register/mentores" />
        </div>
    );
};

export default page;