import { fetchNotificationData, getCantEstudiantesSinGrupo } from "@/database/data";
import Link from "next/link";
import AnimationDot from "./AnimationDot";

export default async function Notification() {

  const [{cantEstudiantes, cantMentores, cantEquipos},cantEstudiantesNoGrupos]= await Promise.all([fetchNotificationData(), getCantEstudiantesSinGrupo()])
  
 
  return (
    <>
      <div className="h-full rounded-xl bg-gray-50 p-4 shadow-md">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-semibold text-xl ">Notificaciones</h3>
        </div>
        <div className="p-4 bg-white mt-2 rounded-xl">
          <div className="flex flex-col">
           {cantEstudiantesNoGrupos>0 &&
            <ItemNotification cant={cantEstudiantesNoGrupos} message={`estudiante${cantEstudiantesNoGrupos==1?"":"s"} sin grupo`} estado={cantEstudiantesNoGrupos>0}  url="/register/equipos" />
           }
            <ItemNotification cant={cantEstudiantes} message={`estudiante${cantEstudiantes==1?" que se dio":"s que se dieron"} de baja`}  url="/notificaciones/estudiante" />
            <ItemNotification cant={cantMentores} message={`mentor${cantMentores==1?" que se dio":"es que se dieron"} de baja`} url="/notificaciones/mentor" />
            <ItemNotification cant={cantEquipos} message={`equipo${cantEquipos==1?" que se dio":"s que se dieron"} de baja`} url="/notificaciones/equipo" />
          </div>
        </div>
      </div>
    </>
  );
}

export function ItemNotification({cant, message, estado, url}:{cant:number; message:string;estado?:boolean, url:string}) {
  return (
    <>
      <Link href={url} className=" flex p-1 items-center">
      <div className="relative">
      {estado &&<AnimationDot/>}
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V18H18V10ZM20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
      </div>
        <p className="text-md ml-1">{cant} {message}</p>

      </Link>
    </>
  );
}
