import { CardSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Card Estudiantes",
  };

export default function layout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<CardSkeleton />}>{children}</Suspense>;
}
