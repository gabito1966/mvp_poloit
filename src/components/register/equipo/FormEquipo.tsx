"use client";
import { EquipoData } from "@/database/definitions";
import { fetchPostClient } from "@/lib/fetchFunctions";
import { revalidateFuntion } from "@/lib/server/serverCache";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function FormEquipo() {
  const fechaHoy = new Date(),
    fechaFin = new Date();
  const fechaHoyFormateada = `${fechaHoy.getFullYear()}-${String(
    fechaHoy.getMonth() + 1
  ).padStart(2, "0")}-${String(fechaHoy.getDate()).padStart(2, "0")}`;

  fechaFin.setMonth(fechaFin.getMonth() + 2);
  const fechaFinFormateada = `${fechaFin.getFullYear()}-${String(
    fechaFin.getMonth() + 1
  ).padStart(2, "0")}-${String(fechaFin.getDate()).padStart(2, "0")}`;

  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    tamano: 0,
    fecha_inicio: fechaHoyFormateada,
    fecha_fin: fechaFinFormateada,
  });


  const [responseBack, setResponseBack] = useState({
    message: "",
    errors: {
      nombre: [],
      tamano: [],
      fecha_inicio: [],
      fecha_fin: [],
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
        message: "",
        [e.target.name]: [],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEquipo: EquipoData = {
      nombre: form.nombre,
      tamano: form.tamano,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin,
    };

    const postPromise = fetchPostClient(`/api/equipo`, newEquipo);

    toast.promise(postPromise, {
      loading: "Cargando...",
      success: (response: any) => {
        revalidateFuntion("/");
        revalidateFuntion("/equipo");
        router.push("/equipo");
        return `${response?.message}`;
      },
      error: (error) => {
        console.log(error);
        setResponseBack({
          message: error.message,
          errors: error.errors,
        });
        return `${error?.message}`;
      },
    });
  };

  return (
    <>
      <div className="w-full flex-grow p-6  md:p-12">
        <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">
          Generación de equipos
        </h1>
        <form
          onSubmit={handleSubmit}
          className="shadow-md shadow-blue-50 p-4 rounded-lg"
        >
          <div className="flex flex-col xl:flex-row items-center gap-5 lg:items-start xl:gap-10 w-full ">
            <div className="grid grid-cols-1 grid-rows-none sm:grid-cols-2 sm:grid-rows-2 gap-4">
              <div className="">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-500"
                >
                  Nombre del Equipo:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder=""
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
                <label
                  htmlFor="tamano"
                  className="block text-sm font-medium text-gray-500"
                >
                  Tamaño:
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  id="tamano"
                  pattern="[5-12]*"
                  inputMode="numeric"
                  name="tamano"
                  placeholder=""
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
              <div>
                <label
                  htmlFor="fecha_inicio"
                  className="block text-sm font-medium text-gray-500"
                >
                  Fecha de inicio:
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  id="fecha_inicio"
                  name="fecha_inicion"
                  defaultValue={fechaHoyFormateada}
                  placeholder=""
                  className={clsx(
                    "basis-1/3 mt-2 text-black block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                    {
                      "border-red-500":
                        responseBack.errors?.fecha_inicio?.length,
                      "border-gray-300":
                        !responseBack.errors?.fecha_inicio?.length,
                    }
                  )}
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.fecha_inicio?.map((error: string) => (
                    <p className="m-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="fecha_fin"
                  className="block text-sm font-medium text-gray-500"
                >
                  Fecha final de entrega:
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder=""
                  defaultValue={fechaFinFormateada}
                  className={clsx(
                    "basis-1/3 mt-2 text-black block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                    {
                      "border-red-500": responseBack.errors?.fecha_fin?.length,
                      "border-gray-300":
                        !responseBack.errors?.fecha_fin?.length,
                    }
                  )}
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.fecha_fin?.map((error: string) => (
                    <p className="m-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {/* agregar fechas */}
            <button
              type="submit"
              className="px-4 py-2 max-h-11 self-center sm:self-end bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 w-64 m-0 sm:justify-self-end sm:ml-auto"
            >
              Generar Equipos
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
