import TableEmpresa from "@/components/dashboard/empresa/TableEmpresa";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Empresas",
    description: "Encuentra el listado de empresas",
  };

export default function pageEmpresa() {
    return (
        <TableEmpresa />
    )
}
