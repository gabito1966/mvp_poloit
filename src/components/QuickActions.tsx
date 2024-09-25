import { getCantEstudiantesSinGrupo } from "@/database/data";
import Link from "next/link";
import AnimationDot from "./AnimationDot";

export default async function QuickActions() {
  const cantEstudiantesSinGrupo = await getCantEstudiantesSinGrupo();

  return (
    <>
      <div className="h-full shadow-md rounded-lg bg-gray-50 p-4">
        <div className="flex flex-row justify-between pb-2 ">
          <h2 className="font-bold text-center text-xl ">Acciones Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full justify-center gap-3 bg-white rounded-xl p-4 ">
          <ItemQuickAction
            url="/register/estudiantes"
            content="registrar estudiantes"
          />
          <ItemQuickAction
            url="/register/mentores"
            content="registrar mentores"
          />
          <ItemQuickAction
            url="/register/equipos"
            content="registrar equipos"
            estado={cantEstudiantesSinGrupo >= 0}
          />
          <ItemQuickAction url="/register/ong" content="registrar ongs" />
        </div>
      </div>
    </>
  );
}

export function ItemQuickAction({
  url,
  content,
  estado,
}: {
  url: string;
  content: string;
  estado?: boolean;
}) {
  return (
    <>
      <Link
        href={url}
        className=" relative md:px-7 lg:px-1 py-3 px-4 xl:px-8 rounded-md bg-blue-400  hover:bg-blue-700 w-full  transition-colors  text-white   text-center  text-nowrap capitalize"
        title={content}
      >
        <span>{content}</span>

        {estado && <AnimationDot />}
      </Link>
    </>
  );
}
