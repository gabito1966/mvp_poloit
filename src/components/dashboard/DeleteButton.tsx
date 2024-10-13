"use client";

import { fetchDeleteClient } from "@/lib/fetchFunctions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { revalidateFuntion } from './../../lib/server/serverCache';
import {  useState } from "react";

function DeleteButton({
  url,
  newClass,
  titulo,
  validarRuta,
  mensajeEliminar,
}: {
  url: string;
  newClass?: string;
  titulo?: string;
  validarRuta?: string;
  mensajeEliminar?: string;
}) {
  const router = useRouter();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);


  const handleDelete = async () => {
    const deletePromise = fetchDeleteClient(url);

    toast.promise(deletePromise, {
      loading: "Eliminando...",
      success: (response) => {
        if (validarRuta) {
          revalidateFuntion(validarRuta);
        }
        router.refresh();
        return `${response.message}`;
      },
      error: (error) => error.message,
    });

    setIsConfirmationVisible(false);
  };

  const showConfirmation = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className="relative">
      <button
        onClick={showConfirmation}
        className={`rounded-md hover:text-red-500 ${newClass}`}
        title={titulo}
      >
        <span className="sr-only">Eliminar</span>
        <div className="rounded-md w-5 h-fit" title="Eliminar">
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
      {isConfirmationVisible && (
        <div className="absolute right-0 mt-2 p-4 bg-white dark:bg-slate-600 border border-gray-200 rounded-md shadow-lg z-10">
          <p className="mb-2">¿Estás seguro de que quieres eliminar {mensajeEliminar?mensajeEliminar:"este elemento"}?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={hideConfirmation}
              className="px-3 py-1 text-sm bg-gray-50 rounded text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteButton;