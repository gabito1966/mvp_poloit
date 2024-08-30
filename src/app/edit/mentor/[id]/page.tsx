import FormMentor from "@/components/register/mentor/FormMentor";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function EstudianteEdit({
    params,
}: {
    params?: { id: string };
}) {
    const [dataEmpresa, dataTecnologia, dataEstudiante] = await Promise.all([
        fetchGet("/api/Empresa"),
        fetchGet("/api/tecnologia"),
        params
            ? fetchGet(`/api/estudiante/${params.id}`)
            : Promise.resolve({ data: undefined }),
    ]);

    return (
        <FormMentor
            empresas={dataEmpresa.data}
            tecnologias={dataTecnologia.data}
            dataFetch={dataEstudiante.data}
        />
    );
}