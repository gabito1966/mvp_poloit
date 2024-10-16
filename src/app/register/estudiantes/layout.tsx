import { FormEstudianteSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Registrar Estudiantes",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<FormEstudianteSkeleton />}>
    {children}
    </Suspense>;
}
