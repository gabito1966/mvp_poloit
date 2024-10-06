import Link from "next/link";

export default async function QuickActions() {
  

  return (
    <>
      <div className="h-full shadow-md rounded-lg text-black bg-white p-4">
        <div className="flex flex-row justify-between pb-2 ">
          <h2 className="font-bold text-center text-xl ">Acciones Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full justify-center gap-3 bg-white rounded-xl p-4 ">
          <ItemQuickAction
            url="/register/estudiantes"
            content="Registrar Estudiantes"
          />
          <ItemQuickAction
            url="/register/mentores"
            content="Registrar Mentores"
          />
          <ItemQuickAction
            url="/register/equipos"
            content="Generar Equipos"
          />
          <ItemQuickAction url="/partners" content="Partners" />
        </div>
      </div>
    </>
  );
}

export function ItemQuickAction({
  url,
  content,
}: {
  url: string;
  content: string;
}) {
  return (
    <>
      <Link
        href={url}
        className=" md:px-7 lg:px-1 py-3 px-4 xl:px-8 rounded-md bg-blue-400  hover:bg-blue-700 w-full  transition-colors  text-white   text-center  text-nowrap capitalize"
        title={content}
      >
        <span>{content}</span>
      </Link>
    </>
  );
}
