import FormEstudiante from "@/components/register/estudiante/FormEstudiante";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function EstudianteEdit({
    params,
}: {
    params?: { id: string };
}) {
    const [dataOng, dataEstudiante] = await Promise.all([
        fetchGet("/api/ong"),
        params
            ? fetchGet(`/api/estudiante/${params.id}`)
            : Promise.resolve({ data: undefined }),
    ]);

    return <FormEstudiante ongs={dataOng.data} dataFetch={dataEstudiante.data} />;
}