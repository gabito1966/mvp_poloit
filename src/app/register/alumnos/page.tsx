import FormEstudiante from "@/components/register/estudiante/FormEstudiante";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function RegisterAlumnos() {
  const data = await fetchGet("/api/ong");

  return <FormEstudiante ongs={data.data} />;
}
