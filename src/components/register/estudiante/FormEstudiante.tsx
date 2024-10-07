"use client";

import { Tecnologia } from "@/database/definitions";
import { fetchPostClient, fetchPutClient } from "@/lib/fetchFunctions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";


interface Estudiante {
  id?: "";
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado?: string;
  id_ong: number | null;
  tecnologias: { id: number; nombre: string; tipo: string }[];
}

interface EstudianteParams {
  id: number;
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: string;
  id_ong: number;
  tecnologias: { id: number; nombre: string; tipo: string }[];
}

export type Ong = {
  id: number;
  nombre: string;
};

function FormEstudiante({
  ongs,
  tecnologias,
  dataFetch,
  tipo,
}: {
  ongs: Ong[];
  tecnologias: Tecnologia[];
  dataFetch?: EstudianteParams | undefined;
  tipo: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    apellido: "",
    nombre: "",
    email: "",
    telefono: "",
    estado: "",
    id_ong: "",
    tecnologias: [{ id: 0, nombre: "", tipo: "" }] as {
      id: number;
      nombre: string;
      tipo: string;
    }[],
  });

  const [responseBack, setResponseBack] = useState({
    message: "",
    errors: {
      apellido: [],
      nombre: [],
      email: [],
      telefono: [],
      estado: [],
      id_ong: [],
      tecnologias: [],
    },
  });

  useEffect(() => {
    if (dataFetch) {
      setForm({
        id: dataFetch.id.toString(),
        apellido: dataFetch.apellido,
        nombre: dataFetch.nombre,
        email: dataFetch.email,
        telefono: dataFetch.telefono,
        estado: dataFetch.estado,
        id_ong: dataFetch.id_ong.toString(),
        tecnologias: dataFetch.tecnologias,
      });
    }
  }, [dataFetch, tecnologias]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tecnologias") {
      const tec: { id: number; nombre: string; tipo: string }[] = [];
      tec.push(
        tecnologias.find((e) => e.id.toString() == value) || {
          id: 0,
          nombre: "",
          tipo: "",
        }
      );
      setForm({ ...form, [name]: tec });
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
    setResponseBack({
      ...responseBack,
      errors: {
        ...responseBack.errors,
        [name]: [],
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEstudiante: Estudiante = {
      apellido: form.apellido,
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      id_ong: form.id_ong ? parseInt(form.id_ong, 10) : null,
      tecnologias: form.tecnologias,
    };

   
    toast.promise(
      (dataFetch
        ? fetchPutClient(`/api/estudiante/${dataFetch.id}`, newEstudiante)
        : fetchPostClient('/api/estudiante', newEstudiante)
      ),
      {
        loading: 'Cargando...',
        success: (response) => {
          
          setForm({
            id: "",
            apellido: "",
            nombre: "",
            email: "",
            telefono: "",
            estado: "",
            id_ong: "",
            tecnologias: [{ id: 0, nombre: "", tipo: "" }] as {
              id: number;
              nombre: string;
              tipo: string;
            }[],
          });
    
          router.push("/estudiante");
          return response.message
        },
        error: (err) => {
          // Manejar el error
          setResponseBack({ message: err.message, errors: err.errors || {} })
          return  (err.message || 'Intente nuevamente');
        }
      }
    );
  }

  return (
    <section  className="container p-10">
      <div className="container flex flex-col max-w-5xl my-10 mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-xl">
        <div className="container mx-auto p-10 h-full">
        <h1 className=" font-bold mb-4 text-center text-black text-2xl">
          Formulario de {tipo == "registrar" ? "Inscripción" : "Actualización"} de
          Estudiantes
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 max-w-xl mx-auto items-center justify-center"
        >
           <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-500"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className={clsx(
                "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3",
                {
                  "border-red-500": responseBack.errors?.apellido?.length,
                  "border-gray-300": !responseBack.errors?.apellido?.length,
                }
              )}
              required
            />
            <div aria-live="polite" aria-atomic="true" className="mt-1">
              {responseBack.errors?.apellido?.map((error: string) => (
                <p className="m-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
            
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-500"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={clsx(
                "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3",
                {
                  "border-red-500": responseBack.errors?.nombre?.length,
                  "border-gray-300": !responseBack.errors?.nombre?.length,
                }
              )}
              required
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-500"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={clsx(
                "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 ",
                {
                  "border-red-500": responseBack.errors?.email?.length,
                  "border-gray-300": !responseBack.errors?.email?.length,
                }
              )}
              required
            />
            <div aria-live="polite" aria-atomic="true" className="mt-1">
              {responseBack.errors?.email?.map((error: string) => (
                <p className="m-0  text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-500"
            >
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className={clsx(
                "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3",
                {
                  "border-red-500": responseBack.errors?.telefono?.length,
                  "border-gray-300": !responseBack.errors?.telefono?.length,
                }
              )}
              required
            />
            <div aria-live="polite" aria-atomic="true" className="mt-1">
              {responseBack.errors?.telefono?.map((error: string) => (
                <p className="m-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className=" flex flex-col  ">
            <label
              htmlFor="tecnologias"
              className="block text-sm font-medium text-gray-500"
            >
              Tecnologías:
            </label>
            <select
              id="tecnologias"
              name="tecnologias"
              value={form.tecnologias[0]?.id}
              onChange={handleChange}
              required
              className={clsx(
                "mt-2 text-black block w-full  border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ",
                {
                  "border-red-500": responseBack.errors?.tecnologias?.length,
                  "border-gray-300": !responseBack.errors?.tecnologias?.length,
                }
              )}
            >
              <option value={0} disabled hidden>
                Seleccione una Tecnología
              </option>
              {tecnologias.map((e, i) => {
                return (
                  <option key={`${i}${e.nombre}${e.id}`} value={`${e.id}`}>
                    {e.nombre} - {e.tipo}
                  </option>
                );
              })}
            </select>
            <div aria-live="polite" aria-atomic="true" className="mt-1">
              {responseBack.errors?.tecnologias?.map((error: string) => (
                <p className="m-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="id_ong"
              className="block text-sm font-medium text-gray-500"
            >
              ONG:
            </label>
            <select
              id="id_ong"
              name="id_ong"
              value={form.id_ong}
              onChange={handleChange}
              required
              className={clsx(
                "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ",
                {
                  "border-red-500": responseBack.errors?.id_ong?.length,
                  "border-gray-300": !responseBack.errors?.id_ong?.length,
                }
              )}
            >
              <option value="" disabled hidden>
                Seleccione una ONG
              </option>
              {ongs.map((e, i) => {
                return (
                  <option key={`${i}${e.nombre}${e.id}`} value={`${e.id}`}>
                    {e.nombre}
                  </option>
                );
              })}
            </select>
            <div aria-live="polite" aria-atomic="true" className="mt-1">
              {responseBack.errors?.id_ong?.map((error: string) => (
                <p className="m-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-full capitalize"
          >
            {tipo} Estudiante
          </button>
        </form>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl">
        <Link href="/estudiante" className="bg-blue-400 hover:bg-blue-700 w-52 rounded-md text-xl text-center text-white p-3 mt-5">Volver a Estudiante</Link>  
      </div>
    </section>
  );
}

export default FormEstudiante;