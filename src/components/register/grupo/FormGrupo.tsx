"use client";
import { EquipoData } from "@/database/definitions";
import { fetchPostClient } from "@/lib/fetchFunctions";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { revalidateFuntion } from "@/lib/server/serverCache";

export default function FormGrupo() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    tamano: 0,
  });

  const [responseBack, setResponseBack] = useState({
    message: "",
    errors: {
      nombre: [],
      tamano: [],
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    setResponseBack({
      ...responseBack,
      errors: {
        ...responseBack.errors,
        [name]: [],
      },
    });

    if (responseBack.message != "") {
      setResponseBack({
        ...responseBack,
        message:"",
        [e.target.name]: [],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGrupo: EquipoData = {
      nombre: form.nombre,
      tamano: form.tamano,
    };

    const postPromise =  fetchPostClient(`/api/equipo`, newGrupo);

    toast.promise(postPromise, {
      loading: "Cargando...",
      success: (response: any) => {
        revalidateFuntion("/")
        revalidateFuntion("/grupo")
        router.push("/grupo");
        return `${response?.message}`;
      },
      error: (error) => {
        console.log(error)
        setResponseBack({
          message: error.message,
          errors: error.errors,
        });
        return `${error?.message}`;
      },
    });
  };
  //use efect para traer la cantidad de alumnos

  return (
    <>
      <div className="w-full flex-grow p-6  md:p-12">
        <h1 className="text-4xl font-semibold mb-8 text-center underline">
          Generación de equipos
        </h1>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-gray-300 rounded-lg"
        >
          <h3 className="text-2xl m-3">Crear nuevo Equipo</h3>
          <div className="flex flex-row p-6 gap-10 w-full">
            <div className="">
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese el nombre del equipo"
                className={clsx(
                  "basis-1/3 mt-2 text-black block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                  {
                    "border-red-500": responseBack.errors?.nombre?.length,
                    "border-gray-300": !responseBack.errors?.nombre?.length,
                  }
                )}
                onChange={handleChange}
              />
              <div aria-live="polite" aria-atomic="true" className="mt-1">
                {responseBack.errors?.nombre?.map((error: string) => (
                  <p className="m-0 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <input
                onChange={handleChange}
                type="number"
                id="tamano"
                name="tamano"
                placeholder="Cantidad de integrantes"
                className={clsx(
                  "basis-1/3 mt-2 text-black block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                  {
                    "border-red-500": responseBack.errors?.tamano?.length,
                    "border-gray-300": !responseBack.errors?.tamano?.length,
                  }
                )}
              />
              <div aria-live="polite" aria-atomic="true" className="mt-1">
                {responseBack.errors?.tamano?.map((error: string) => (
                  <p className="m-0 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            {/* agregar fechas */}
            <button
              type="submit"
              className="px-4 py-2 max-h-11 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 w-64 m-0 justify-self-end ml-auto"
            >
              Generar Equipos
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
