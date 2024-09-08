
import { fetchGet } from "@/lib/fetchFunctions";
import  FormEstudiante  from '@/components/register/estudiante/FormEstudiante';

export default async function RegisterAlumnos() {
    const [dataOngs, dataTecnologias] = await Promise.all([
        fetchGet("/api/ong"),
        fetchGet("/api/tecnologia"),
    ]);

    return (
        <FormEstudiante ongs={dataOngs.data} tecnologias={dataTecnologias.data} />
    );
}