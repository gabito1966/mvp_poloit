"use client";

import { fetchDeleteClient } from "@/lib/fetchFunctions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { revalidateFuntion } from './../../lib/server/serverCache';
import { useEffect, useState } from "react";
import ConfimationButton from "../ConfimationButton";

function DeleteButton({
  url,
  newClass,
  titulo,
  validarRuta
}: {
  url: string;
  newClass?: string;
  titulo?: string;
  validarRuta?:string
}) {
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deletePromise = fetchDeleteClient(url);

    toast.promise(deletePromise, {
      loading: "Eliminando...",
      success: (response) => {
    if(validarRuta){
      revalidateFuntion(validarRuta);
    }
        router.refresh();
        return `${response.message}`;
      },
      error: (error) => error.message,
    });
  };

  return (
    <>
      <form
        onSubmit={handleDelete}
        className={`${newClass}`}
        title={`${titulo}`}
      >
        <button className="rounded-md  hover:bg-gray-100 hover:text-red-500">
          <span className="sr-only">Eliminar</span>
          <div
            className="rounded-md  hover:bg-gray-100 w-5 h-fit"
            title="Eliminar"
          >
            <svg className="w-5 h-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
              </svg>
            </svg>
          </div>
        </button>
      </form>
    </>
  );
}

export default DeleteButton;
