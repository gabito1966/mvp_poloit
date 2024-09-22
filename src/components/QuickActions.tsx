import Link from "next/link";
import React from "react";

export default function QuickActions() {
  return (
    <>
      <div className="h-full shadow-md rounded-lg bg-gray-50 p-4">
        <div className="flex flex-row justify-between pb-2 ">
          <h2 className="font-bold text-center text-xl ">Acciones Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full justify-center gap-3 bg-white rounded-xl p-4 ">
          <ItemQuickAction url="/register/estudiantes" content="registrar estudiantes"/>
          <ItemQuickAction url="/register/mentores" content="registrar mentores"/>
          <ItemQuickAction url="/register/grupos" content="registrar grupos"/>
          <ItemQuickAction url="/register/grupos" content="registrar grupos"/>
        </div>
      </div>
    </>
  );
}

export function ItemQuickAction({url, content}:{url:string;content:string}) {
  return (
    <>
      
        <Link
          href={url}
          className=" md:px-7 lg:px-1 py-3 px-4 xl:px-8 rounded-md bg-blue-400  hover:bg-blue-700 w-full  transition-colors  text-white   text-center  text-nowrap capitalize"
        >
          <span>
          {content}

          </span>
        </Link>
      
    </>
  );
}
