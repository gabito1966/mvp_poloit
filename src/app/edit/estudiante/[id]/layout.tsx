import { FormSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<FormSkeleton />}>{children}</Suspense>;
}
