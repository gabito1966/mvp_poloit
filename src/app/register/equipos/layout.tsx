import { FormEquiposSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Generar Equipo",
  };

export default function layout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<FormEquiposSkeleton/>}>
      {children}</Suspense>;
}