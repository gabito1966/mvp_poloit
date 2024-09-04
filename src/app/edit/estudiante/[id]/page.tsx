import FormEstudiante from "@/components/register/estudiante/FormEstudiante";
import { fetchGet } from "@/lib/fetchFunctions";



export default async function EstudianteEdit({
  params,
}: {
  params?: { id: string };
}) {
  const [dataOng, dataTecnologia, dataEstudiante] = await Promise.all([
    fetchGet("/api/ong"),
    fetchGet("/api/tecnologia"),
    params
      ? fetchGet(`/api/estudiante/${params.id}`)
      : undefined,
  ]);



  return (
    <FormEstudiante
      ongs={dataOng.data}
      tecnologias={dataTecnologia.data}
      dataFetch={dataEstudiante.data}
    />
  );
}
