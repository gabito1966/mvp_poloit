import FormMentor from "@/components/register/mentor/FormMentor";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function EstudianteEdit({
    params,
}: {
    params?: { id: string };
}) {
    const [dataEmpresa, dataTecnologia, dataEstudiante] = await Promise.all([
        fetchGet("/api/empresa"),
        fetchGet("/api/tecnologia"),
        params
            ? fetchGet(`/api/mentor/${params.id}`)
            : undefined,
    ]);

    return (
        <FormMentor
            empresas={dataEmpresa.data}
            tecnologias={dataTecnologia.data}
            dataFetch={dataEstudiante.data}
        />
    );
}