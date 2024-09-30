import { FormEquiposSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<FormEquiposSkeleton/>}>{children}</Suspense>;
}