import FormMentor from "@/components/register/mentor/FormMentor";
import { fetchGet } from "@/lib/fetchFunctions";

export default async function RegisterMentores() {
  const [dataEmpresas, dataTecnologias] = await Promise.all([
    fetchGet("/api/empresa"),
    fetchGet("/api/tecnologia"),
  ]);

  return (
    <FormMentor
      empresas={dataEmpresas.data}
      tecnologias={dataTecnologias.data}
      tipo="Registrar"
    />
  );
}
