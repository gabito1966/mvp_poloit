import CreateButton from "@/components/dashboard/CreateButton";
import DeleteButton from "@/components/dashboard/DeleteButton";
import TableEquipos from "@/components/dashboard/equipo/TableEquipo";
import MailButton from "@/components/dashboard/MailButton";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import { TableEstudianteSkeleton } from "@/components/skeletons";
import { fetchPagesEquipos, getCantEstudiantesSinGrupo } from "@/database/data";
import { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Equipos",
  description: "Encuentra el listado de equipos",
};

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

async function page({ searchParams }: PageProps) {
export const metadata: Metadata = {
  title: "Equipos",
  description: "Encuentra el listado de equipos",
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

  const [totalPages, contador] = await Promise.all([
    fetchPagesEquipos(query),
    getCantEstudiantesSinGrupo(),
  ]);

  return (
    <section className="container max-w-7xl pt-20">
      <div className="w-full flex-grow p-5 bg-white rounded-xl shadow-xl md:p-12">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center lg:text-left">
          Lista de Equipos
        </h1>
        <HeaderActions contador={contador} />
        <Suspense key={`${query}-${currentPage}`} fallback={<TableEstudianteSkeleton />}>
          <TableEquipos query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}

const HeaderActions: React.FC<{ contador: number }> = ({ contador }) => {
  return (
    <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
      <Search placeholder="buscar equipos..." />
      <div className="flex flex-row items-center gap-3">
        <MailButton />
        <DeleteButton
          url="/api/equipo"
          newClass="scale-125 pt-2"
          titulo="Eliminar todos"
        />
        <CreateButton url="/register/equipos" estado={contador > 0} />
      </div>
    </div>
  );
};

export default page;