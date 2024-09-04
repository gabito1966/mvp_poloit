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
  tecnologias: string[];
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
      let tecnologiasIDs: number[] = [];
      dataFetch.tecnologias.forEach((tech) => {
        const foundTecnologia = tecnologias.find((t) => t.nombre === tech);
        if (foundTecnologia) {
          tecnologiasIDs.push(foundTecnologia.id);
        }
      });

      setForm({
        id: dataFetch.id?.toString(),
        nombre: dataFetch.nombre,
        apellido: dataFetch.apellido,
        email: dataFetch.email,
        telefono: dataFetch.telefono,
        estado: dataFetch.estado,
        id_ong: dataFetch.id_ong.toString(),
        tecnologias: tecnologiasIDs,
      });
    }
  }, []);

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

      router.refresh();
      router.push("/estudiante");
    } catch (error: any) {
      console.log(error);
      setResponseBack({ message: error.message, errors: error.errors });
    }
  };

  return (
    <>
      <div className="container mx-auto " >
        <h1 className="text-2xl font-bold mb-4 text-center underline">
          Formulario de Inscripción de Estudiantes
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 max-w-xl mx-auto items-center justify-center"
        >
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
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
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
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
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
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 "
              required
            />
            {responseBack.errors?.email &&
              responseBack.errors.email.map((error: string) => (
                <p className="mt-2  text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
              required
            />
          </div>
          {responseBack.errors?.telefono &&
            responseBack.errors?.telefono.map((error: string) => (
              <p className="mt-2  text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}

         
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
                className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm "
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
       

          <div className=" border-t-2 pt-3 flex flex-wrap gap-4 mt-5">
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
                    checked={form.tecnologias?.includes(e.id)}
                    value={`${e.id}`}
                    onChange={handleChange}
                  />
                  <label className="block text-sm font-medium text-gray-500" htmlFor={`${e.nombre}`}>
                    {e.nombre}
                  </label>
                </div>
              );
            })}
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {responseBack.errors?.tecnologias &&
                responseBack.errors?.tecnologias.map((error: string) => (
                  <p className="mt-2  text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="border-t-2 pt-px">
            <div className="flex  flex-row gap-1" >
              <h4 className="block text-sm font-medium text-gray-500" >Principal:</h4>
              {
                <p className="block text-sm font-medium text-gray-500">
                  {tecnologias.map((e, i) => {
                    return e.id == form.tecnologias[0] ? e.nombre : "";
                  })}
                </p>
              }
            </div>
            <div className="flex flex-wrap flex-row">
              <h4 className="block text-sm font-medium text-gray-500" >Secundarias:</h4>
              <p className="flex flex-wrap text-sm font-medium text-gray-500" >
                {form.tecnologias.slice(1).map((e_t) => {
                  return tecnologias.map((e) =>
                    e.id == e_t ? `${e.nombre}, ` : ""
                  );
                })}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-full"
          >
            Registrar Estudiante
          </button>
        </form>
      </div>
    </>
  );
}

export default FormEstudiante;