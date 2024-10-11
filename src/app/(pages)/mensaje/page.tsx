import BackButton from "@/components/dashboard/BackButton";
import MensajeComponent from "@/components/mensajeria/MensajeComponent";
import { MensajeSkeleton } from "@/components/skeletons";
import {
  getEmailsTipo,
  getEmailsTipoSeguimiento,
  getTipoEmails,
} from "@/database/data";
import { Suspense } from "react";

export default async function mensaje() {
  const [emailsBienvenida, emailsSeguimiento, tiposEmail] = await Promise.all([
    getEmailsTipo("BIENVENIDA"),
    getEmailsTipoSeguimiento(),
    getTipoEmails(),
  ]);

  return (
    <Suspense fallback={<MensajeSkeleton />}>
      <MensajeComponent
        emailsBienvenida={emailsBienvenida}
        emailsSeguimiento={emailsSeguimiento}
        tiposEmail={tiposEmail}
      />
      <div className="w-full flex flex-row">
        <div className="w-fit ml-10">
          <BackButton url="/equipo" />
        </div>
      </div>
    </Suspense>
  );
}
