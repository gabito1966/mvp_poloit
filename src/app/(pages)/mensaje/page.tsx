import MensajeComponent from "@/components/mensajeria/MensajeComponent";
import { FormEstudianteSkeleton } from "@/components/skeletons";
import { fetchGet } from "@/lib/fetchFunctions";
import { Suspense } from "react";

export default function mensaje() {

  //const dataEquipos = fetchGet("/send");
  //const dataemails grupos(bienvenida)
  //const dataemails estudiantes(seguimiento)

  return (
  
    <Suspense fallback={<FormEstudianteSkeleton/>}>
      <MensajeComponent/>
    </Suspense>
    
  );
}
