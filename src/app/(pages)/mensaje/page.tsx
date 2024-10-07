import MensajeComponent from "@/components/mensajeria/MensajeComponent";
import { FormEstudianteSkeleton } from "@/components/skeletons";
import { getEmailsTipo, getEmailsTipoSeguimiento, getTipoEmails } from "@/database/data";
import { Suspense } from "react";

export default async function mensaje() {

  const [emailsBienvenida, emailsSeguimiento, tiposEmail] = await Promise.all([getEmailsTipo("BIENVENIDA"),getEmailsTipoSeguimiento(),getTipoEmails()]);

  
  // console.log(emailsSeguimiento)
  console.log(emailsBienvenida[1])
  
  return (
  
    <Suspense fallback={<FormEstudianteSkeleton/>}>
      <MensajeComponent emailsBienvenida={emailsBienvenida} emailsSeguimiento={emailsSeguimiento} tiposEmail={tiposEmail}/>
    </Suspense>
    
  );
}
