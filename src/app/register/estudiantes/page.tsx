import FormEstudiante from "@/components/register/estudiante/FormEstudiante";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function RegisterAlumnos() {
    const [dataOngs, dataTecnologias] = await Promise.all([
        fetchGet("/api/ong"),
        fetchGet("/api/tecnologia"),
    ]);

    return (
        <FormEstudiante ongs={dataOngs.data} tecnologias={dataTecnologias.data} />
    );
}