import FormEstudiante from "@/components/register/alumnos/FormEstudiante";
import { FormSkeleton } from "@/components/skeletons";
import { fetchGet } from "@/lib/fetchExampleNicolas";
import { Suspense } from "react";

export default async function EstudianteEdit({
  params,
}: {
  params?: { id: string };
}) {
  const data = await fetchGet("/api/ong");

  return <FormEstudiante ongs={data.data} params={params} />;
}
