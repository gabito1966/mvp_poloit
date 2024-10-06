import { FormMentorSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Editar Mentores",
  };

export default function layout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<FormMentorSkeleton />}>{children}</Suspense>;
}
