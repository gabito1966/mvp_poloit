import { FormEquiposSkeletonManual } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Editar equipo",
};


export default function Layout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<FormEquiposSkeletonManual/>}>
      {children}
      </Suspense>;
}
