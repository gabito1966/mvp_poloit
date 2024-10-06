import MensajeComponent from "@/components/mensajeria/MensajeComponent";
import { FormEstudianteSkeleton } from "@/components/skeletons";
import { getEmailsTipo, getTipoEmails } from "@/database/data";
import { fetchGet } from "@/lib/fetchFunctions";
import { Suspense } from "react";

export default async function mensaje() {

  const [emailsBienvenida, emailsSeguimiento, tiposEmail] = await Promise.all([getEmailsTipo("BIENVENIDA"),getEmailsTipo("SEGUIMIENTO"),getTipoEmails()]);

  return (
  
    <Suspense fallback={<FormEstudianteSkeleton/>}>
      <MensajeComponent emailsBienvenida={emailsBienvenida} emailsSeguimiento={emailsSeguimiento} tiposEmail={tiposEmail}/>
    </Suspense>
    
  );
}
