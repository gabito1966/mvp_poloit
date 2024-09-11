import FormEstudiante from "@/components/register/estudiante/FormEstudiante";
import { fetchGet } from "@/lib/fetchFunctions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  
  if(params?.id){
    revalidatePath(`/edit/estudiante/${params.id}`);
    if(!dataEstudiante.success){
      //mensaje de error
      redirect("/estudiante")
    }
  }

  return (
    <FormEstudiante
      ongs={dataOng.data}
      tecnologias={dataTecnologia.data}
      dataFetch={dataEstudiante.data}
    />
  );
}
