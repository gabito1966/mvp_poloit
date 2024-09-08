"use client";

import { Tecnologia } from "@/database/definitions";
import { fetchPostClient, fetchPutClient } from "@/lib/fetchFunctions";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Mentor {
  id?: "";
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado?: string;
  id_empresa: number;
  tecnologias: number[];
}

interface MentorParams {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: string;
  id_empresa: number;
  tecnologias: string[];
}

export type Empresa = {
  id: number;
  nombre: string;
};

function FormMentor({
  empresas,
  tecnologias,
  dataFetch,
}: {
  empresas: Empresa[];
  tecnologias: Tecnologia[];
  dataFetch?: MentorParams | undefined;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    estado: "",
    id_empresa: "",
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
      id_empresa: [],
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
        id_empresa: dataFetch.id_empresa.toString(),
        tecnologias: tecnologiasIDs,
      });
    }
  }, [dataFetch, tecnologias]);

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
      
      const newMentor: Mentor = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      telefono: form.telefono,
      id_empresa: parseInt(form.id_empresa, 10),
      tecnologias: form.tecnologias,
    };
    
    let response;

    try {
      if (dataFetch) {
        response = await fetchPutClient(
          `/api/mentor/${dataFetch.id}`,
          newMentor
        );
      } else {
        response = await fetchPostClient(`/api/mentor`, newMentor);
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
        id_empresa: "",
        tecnologias: [] as number[],
      });
      
      router.refresh();
      router.push("/mentor");
    } catch (error: any) {
        console.log(error);
      setResponseBack({ message: error.message, errors: error.errors });
    }
  };

  return (
    <>
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-bold mb-4 text-center underline">
          Formulario de Inscripción de Mentores
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
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
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
              className="mt-2 block text-black w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
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
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
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
            <label
              htmlFor="id_empresa"
              className="block text-sm font-medium text-gray-500"
            >
              Empresa:
            </label>
            <select
              id="id_empresa"
              name="id_empresa"
              value={form.id_empresa}
              onChange={handleChange}
              required
              className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled hidden>
                Seleccione una Empresa
              </option>
              {empresas.map((e, i) => {
                return (
                  <option key={`${i}${e.nombre}${e.id}`} value={`${e.id}`}>
                    {e.nombre}
                  </option>
                );
              })}
            </select>
            {responseBack.errors?.id_empresa &&
              responseBack.errors.id_empresa.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className=" flex flex-col gap-4 mt-5">
            <label
              htmlFor="tecnologias"
              className="block text-sm font-medium text-gray-500"
            >
              Tecnologías
            </label>
            <div className="flex flex-wrap gap-2 flex-row justify-between">
              {tecnologias.map((e, i) => {
                return (
                  <div
                    key={`${i}${e.nombre}${e.id}`}
                    className="flex flex-col gap-1 items-center"
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
                    <label
                      className="block text-sm font-medium text-gray-500"
                      htmlFor={`${e.nombre}`}
                    >
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
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-full"
          >
            Registrar Mentor
          </button>
        </form>
      </div>
    </>
  );
}

export default FormMentor;
