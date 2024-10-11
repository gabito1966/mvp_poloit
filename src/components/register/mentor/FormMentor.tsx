"use client";

import BackButton from "@/components/dashboard/BackButton";
import { Tecnologia } from "@/database/definitions";
import {
  EmpresaFrondEnd,
  MentorFrondEnd,
  MentorParams,
} from "@/lib/definitions/frontEndDefinitions";
import { fetchPostClient, fetchPutClient } from "@/lib/fetchFunctions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

function FormMentor({
  empresas,
  tecnologias,
  dataFetch,
  tipo,
}: {
  empresas: EmpresaFrondEnd[];
  tecnologias: Tecnologia[];
  dataFetch?: MentorParams | undefined;
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
    id_empresa: "",
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
      id_empresa: [],
      tecnologias: [],
      tecnologias2: [],
    },
  });

  useEffect(() => {
    if (dataFetch) {
      setForm({
        id: dataFetch.id?.toString(),
        apellido: dataFetch.apellido,
        nombre: dataFetch.nombre,
        email: dataFetch.email,
        telefono: dataFetch.telefono,
        estado: dataFetch.estado,
        id_empresa: dataFetch.id_empresa.toString(),
        tecnologias: dataFetch.tecnologias,
      });
    }
  }, [dataFetch, tecnologias]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tecnologias1") {
      let tec: {
        id: number;
        nombre: string;
        tipo: string;
      }[] = [];

      tec[0] = tecnologias.find((e) => e.id.toString() == value) || {
        id: 0,
        nombre: "",
        tipo: "",
      };

      if (tec[0].nombre === "UX/UI" || tec[0].nombre === "QA") {
        console.log(tec[0].nombre === "UX/UI");
        setForm({ ...form, tecnologias: [tec[0]] });
      } else {
        setForm({ ...form, tecnologias: tec });
      }
    } else {
      if (name === "tecnologias2") {
        const tec = form.tecnologias;
        tec[1] = tecnologias.find((e) => e.id.toString() == value) || {
          id: 0,
          nombre: "",
          tipo: "",
        };
        setForm({ ...form, tecnologias: tec });
      } else {
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
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

    const newMentor: MentorFrondEnd = {
      apellido: form.apellido,
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      id_empresa: parseInt(form.id_empresa, 10),
      tecnologias: form.tecnologias,
    };

    toast.promise(
      dataFetch
        ? fetchPutClient(`/api/mentor/${dataFetch.id}`, newMentor)
        : fetchPostClient(`/api/mentor`, newMentor),
      {
        loading: "Cargando...",
        success: (response) => {
          setForm({
            id: "",
            apellido: "",
            nombre: "",
            email: "",
            telefono: "",
            estado: "",
            id_empresa: "",
            tecnologias: [{ id: 0, nombre: "", tipo: "" }] as {
              id: number;
              nombre: string;
              tipo: string;
            }[],
          });

          router.push("/mentor");
          return response.message;
        },
        error: (err) => {
          setResponseBack({ message: err.message, errors: err.errors || {} });
          return err.message || "Intente nuevamente";
        },
      }
    );
  };

  return (
    <section className="container max-w-6xl p-5 lg:pt-20">
      <div className="container flex flex-col max-w-5xl my-10 mx-auto lg:p-5 bg-white dark:bg-gray-700 rounded-xl shadow-xl">
        <div className="container mx-auto py-5 h-full">
          <h1 className="font-bold mb-4 text-center text-black text-2xl">
            Formulario de{" "}
            {tipo === "Registrar" ? "Inscripción" : "Actualización"} de Mentores
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 py-4 px-1  mb-8 max-w-5xl mx-auto items-center bg-gray-100 dark:bg-gray-600 rounded-lg justify-center"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
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
                    "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3",
                    {
                      "border-red-500": responseBack.errors?.apellido?.length,
                      "border-gray-300": !responseBack.errors?.apellido?.length,
                    }
                  )}
                  required
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.apellido?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
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
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
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
                    "mt-2 block text-black w-full border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3",
                    {
                      "border-red-500": responseBack.errors?.email?.length,
                      "border-gray-300": !responseBack.errors?.email?.length,
                    }
                  )}
                  required
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.email?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
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
                    "mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3",
                    {
                      "border-red-500": responseBack.errors?.telefono?.length,
                      "border-gray-300": !responseBack.errors?.telefono?.length,
                    }
                  )}
                  required
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.telefono?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="tecnologias1"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Tecnología principal:
                </label>
                <select
                  id="tecnologias1"
                  name="tecnologias1"
                  value={form.tecnologias[0]?.id}
                  onChange={handleChange}
                  required
                  className={clsx(
                    "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    {
                      "border-red-500":
                        responseBack.errors?.tecnologias?.length,
                      "border-gray-300":
                        !responseBack.errors?.tecnologias?.length,
                    }
                  )}
                >
                  <option value={0} disabled hidden>
                    Seleccione una Tecnología
                  </option>
                  {tecnologias
                    .filter((e) => e.tipo !== "FRONTEND")
                    .map((e, i) => (
                      <option
                        className="capitalize"
                        key={`${i}${e.nombre}${e.id}`}
                        value={`${e.id}`}
                      >
                        {e.nombre} - {e.tipo}
                      </option>
                    ))}
                </select>
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.tecnologias?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="tecnologias2"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Tecnología secundaria:
                </label>
                <select
                  id="tecnologias2"
                  name="tecnologias2"
                  value={form.tecnologias[1]?.id || 0}
                  onChange={handleChange}
                  disabled={
                    form.tecnologias[0] &&
                    (form.tecnologias[0].nombre === "UX/UI" ||
                      form.tecnologias[0].nombre === "QA")
                  }
                  required
                  className={clsx(
                    "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    {
                      "border-red-500":
                        responseBack.errors?.tecnologias2?.length,
                      "border-gray-300":
                        !responseBack.errors?.tecnologias2?.length,
                    }
                  )}
                >
                  <option value={0} disabled hidden>
                    Seleccione una Tecnología
                  </option>
                  {tecnologias
                    .filter(
                      (e) =>
                        e.nombre !== "UX/UI" &&
                        e.nombre !== "QA" &&
                        e.tipo !== "FRONTEND" &&
                        e.nombre !== form.tecnologias[0].nombre
                    )
                    .map((e, i) => (
                      <option className="capitalize" key={`${i}${e.nombre}${e.id}`} value={`${e.id}`}>
                        {e.nombre} - {e.tipo}
                      </option>
                    ))}
                </select>
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.tecnologias2?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="id_empresa"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Empresa:
                </label>
                <select
                  id="id_empresa"
                  name="id_empresa"
                  value={form.id_empresa}
                  onChange={handleChange}
                  required
                  className={clsx(
                    "mt-2 text-black block w-full border-2 h-10 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                    {
                      "border-red-500": responseBack.errors?.id_empresa?.length,
                      "border-gray-300":
                        !responseBack.errors?.id_empresa?.length,
                    }
                  )}
                >
                  <option value="" disabled hidden>
                    Seleccione una Empresa
                  </option>
                  {empresas.map((e, i) => {
                    return (
                      <option
                        className="capitalize"
                        key={`${i}${e.nombre}${e.id}`}
                        value={`${e.id}`}
                      >
                        {e.nombre}
                      </option>
                    );
                  })}
                </select>
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBack.errors?.id_empresa?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="col-span-1 lg:col-span-2 px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-full"
            >
              {tipo} Mentor
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto flex items-center justify-between gap-40 max-w-5xl max-lg:gap-3">
        <BackButton url="/mentor" />
      </div>
    </section>
  );
}

export default FormMentor;
