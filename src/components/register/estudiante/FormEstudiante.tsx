"use client";

import { Tecnologia } from "@/database/definitions";
import { fetchPostClient, fetchPutClient } from "@/lib/fetchFunctions";
import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Estudiante {
  id?: "";
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado?: string;
  id_ong: number | null;
  tecnologias: number[];
}

interface EstudianteParams {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: string;
  id_ong: number;
  tecnologias: number[];
}

export type ong = {
  id: number;
  nombre: string;
};

function FormEstudiante({
  ongs,
  tecnologias,
  dataFetch,
}: {
  ongs: ong[];
  tecnologias: Tecnologia[];
  dataFetch?: EstudianteParams | undefined;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    estado: "",
    id_ong: "",
    tecnologias: [] as number[],
  });

  const [responseBack, setResponseBack] = useState({
    message: "",
    errors: {
      nombre: [],
      apellido: [],
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
        id: dataFetch.id?.toString(),
        nombre: dataFetch.nombre,
        apellido: dataFetch.apellido,
        email: dataFetch.email,
        telefono: dataFetch.telefono,
        estado: dataFetch.estado,
        id_ong: dataFetch.id_ong.toString(),
        tecnologias: dataFetch.tecnologias || [],
      });
    }
  }, [dataFetch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tecnologias") {
      let tecnologias = [...form.tecnologias];
      if ((e.target as HTMLInputElement).checked) {
        tecnologias.push(parseInt(value, 10));
      } else {
        tecnologias = tecnologias.filter(
          (tech) => tech !== parseInt(value, 10)
        );
      }
      setForm((prevForm) => ({ ...prevForm, tecnologias }));
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
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      telefono: form.telefono,
      id_ong: form.id_ong ? parseInt(form.id_ong, 10) : null,
      tecnologias: form.tecnologias,
    };

    let response;

    try {
      if (dataFetch) {
        response = await fetchPutClient(
          `/api/estudiante/${dataFetch.id}`,
          newEstudiante
        );
      } else {
        response = await fetchPostClient(`/api/estudiante`, newEstudiante);
      }

      if (!response.success) {
        throw response;
      }

      setForm({
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        estado: "",
        id_ong: "",
        tecnologias: [] as number[],
      });

      router.push("/dashboard/estudiantes");
    } catch (error: any) {
      setResponseBack({ message: error.message, errors: error.errors });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center underline">
          Formulario de Inscripción de Alumnos
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center"
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-slate-200"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {responseBack.errors?.nombre &&
              responseBack.errors.nombre.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-slate-200"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {responseBack.errors?.apellido &&
                responseBack.errors.apellido.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block text-black w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            {responseBack.errors?.email &&
              responseBack.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-slate-200"
            >
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          {responseBack.errors?.telefono &&
            responseBack.errors?.telefono.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}

          <div>
            <div>
              <label
                htmlFor="id_ong"
                className="block text-sm font-medium text-slate-200"
              >
                ONG:
              </label>
              <select
                id="id_ong"
                name="id_ong"
                value={form.id_ong}
                onChange={handleChange}
                required
                className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              {responseBack.errors?.id_ong &&
                responseBack.errors.id_ong.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {tecnologias.map((e, i) => {
              return (
                <div
                  key={`${i}${e.nombre}${e.id}`}
                  className="flex flex-col items-center"
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="tecnologias"
                    id={`${e.nombre}`}
                    value={`${e.id}`}
                    onChange={handleChange}
                  />
                  <label className="text-sm" htmlFor="html">
                    {e.nombre}
                  </label>
                </div>
              );
            })}
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {responseBack.errors?.tecnologias &&
                responseBack.errors?.tecnologias.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 mx-auto"
          >
            Registrar Alumno
          </button>
        </form>
      </div>
    </>
  );
}

export default FormEstudiante;
