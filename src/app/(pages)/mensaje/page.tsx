import MensajeComponent from "@/components/mensajeria/MensajeComponent";
import { FormEstudianteSkeleton } from "@/components/skeletons";
import { getEmailsTipo, getTipoEmails } from "@/database/data";
import { fetchGet } from "@/lib/fetchFunctions";
import { Suspense } from "react";

export default async function mensaje() {

  //const dataemails grupos(bienvenida)
  //const dataemails estudiantes(seguimiento)
  //const dataTipos tipo

  const [emailsBienvenida, emailsSeguimiento, tiposEmail] = await Promise.all([getEmailsTipo("BIENVENIDA"),getEmailsTipo("SEGUIMIENTO"),getTipoEmails()])

  console.log(emailsBienvenida);
  console.log(emailsSeguimiento);

  console.log(tiposEmail);

  return (
  
    <Suspense fallback={<FormEstudianteSkeleton/>}>
      <MensajeComponent emailsBienvenida={emailsBienvenida} emailsSeguimiento={emailsSeguimiento} tiposEmail={tiposEmail}/>
    </Suspense>
    
  );
}
