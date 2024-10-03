import TableOng from "@/components/dashboard/ong/TableOng";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ONGs",
    description: "Encuentra el listado de ONGs",
  };


export default function pageOng() {
    return (
        <TableOng />
    )
}