import FormEstudiante from "@/components/register/alumnos/FormEstudiante";
import { fetchGet } from "@/lib/fetchExampleNicolas";

export default async function RegisterAlumnos() {
  const data = await fetchGet("/api/ong");

  return <FormEstudiante ongs={data.data} params={undefined} />;
}
