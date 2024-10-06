import CreateButton from "@/components/dashboard/CreateButton";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import TableEstudiante from "@/components/dashboard/estudiante/TableEstudiante";
import { TableEstudianteSkeleton } from "@/components/skeletons";
import { fetchPagesEstudiantes } from "@/database/data";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Estudiantes",
  description: "Encuentra el listado de estudiantes",
};

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

async function page({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPagesEstudiantes(query);

  return (
    <section className="container max-w-7xl pt-20">
      <div className="w-full flex-grow p-3 md:p-12 bg-white text-black rounded-xl shadow-xl">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center lg:text-left">
          Lista de Estudiantes
        </h1>
        <HeaderActions />
        <Suspense key={`${query}-${currentPage}`} fallback={<TableEstudianteSkeleton />}>
          <TableEstudiante query={query} currentPage={currentPage} />
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
      <Search placeholder="Buscar estudiante..." />
      <CreateButton url="/register/estudiantes" />
    </div>
  );
};

export default page;