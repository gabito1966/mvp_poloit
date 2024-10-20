"use client";

import { EquipoData } from "@/database/definitions";
import {
  Equipo,
  EstudianteSinGrupos,
  GrupoFromManual,
  MentorSinGrupo,
} from "@/lib/definitions/frontEndDefinitions";
import { fetchPostClient, fetchPutClient } from "@/lib/fetchFunctions";
import { revalidateFuntion } from "@/lib/server/serverCache";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormEquipo({
  estudiantesNoGrupos,
  estudiantesSinGrupo,
  mentoresTecnicosSinGrupos,
  mentoresQASinGrupos,
  mentoresUXUISinGrupos,
  dataEquipo,
}: {
  estudiantesNoGrupos: number;
  estudiantesSinGrupo: EstudianteSinGrupos[];
  mentoresTecnicosSinGrupos: MentorSinGrupo[];
  mentoresQASinGrupos: MentorSinGrupo[];
  mentoresUXUISinGrupos: MentorSinGrupo[];
  dataEquipo?: Equipo | undefined;
}) {
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

  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState<
    number[]
  >(dataEquipo != undefined ? dataEquipo.ids_estudiantes : []);
  const [mentorSeleccionado, setMentorSeleccionado] = useState<number | null>(
    dataEquipo != undefined ? dataEquipo.id_mentor : null
  );
  const [mentorQASeleccionado, setMentorQASeleccionado] = useState<
    number | null
  >(dataEquipo != undefined ? dataEquipo.id_mentor_qa : null);
  const [mentorUXUISeleccionado, setMentorUXUISeleccionado] = useState<
    number | null
  >(dataEquipo != undefined ? dataEquipo.id_mentor_ux_ui : null);
  const [filtroEstudiantes, setFiltroEstudiantes] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    tamano: 0,
    fecha_inicio: fechaHoyFormateada,
    fecha_fin: fechaFinFormateada,
  });

  const [formManual, setFormManual] = useState<GrupoFromManual>({
    nombre: "",
    fecha_inicio: fechaHoyFormateada,
    fecha_fin: fechaFinFormateada,
    integrantes: [],
    mentorTecnico: 0,
    mentorUXUI: 0,
    mentorQA: 0,
  });

  const [modoGeneracion, setModoGeneracion] = useState<"automatico" | "manual">(
    dataEquipo != undefined ? "manual" : "automatico"
  );

  const toggleEstudianteSeleccion = (estudianteId: number) => {
    setEstudiantesSeleccionados((prev) =>
      prev.includes(estudianteId)
        ? prev.filter((id) => id !== estudianteId)
        : [...prev, estudianteId]
    );

    setResponseBackManual({
      ...responseBackManual,
      errors: {
        ...responseBackManual.errors,
        ["integrantes"]: [],
      },
    });
  };

  const estudiantesFiltrados = estudiantesSinGrupo.filter(
    (e) =>
      e.nombre
        .toLowerCase()

        .includes(filtroEstudiantes.toLowerCase()) ||
      e.apellido
        .toLowerCase()
        .includes(filtroEstudiantes.toLowerCase()) ||
      e.tecnologia_nombre
        .toLowerCase()
        .includes(filtroEstudiantes.toLowerCase())
  );

  const [responseBack, setResponseBack] = useState({
    message: "",
    errors: {
      nombre: [],
      tamano: [],
      fecha_inicio: [],
      fecha_fin: [],
    },
  });
  const [responseBackManual, setResponseBackManual] = useState({
    message: "",
    errors: {
      nombre: [],
      tamano: [],
      fecha_inicio: [],
      fecha_fin: [],
      integrantes: [],
      mentorTecnico: [],
      mentorUXUI: [],
      mentorQA: [],
    },
  });

  const handleChangeManual = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormManual({ ...formManual, [name]: value });

    setResponseBackManual({
      ...responseBackManual,
      errors: {
        ...responseBackManual.errors,
        [name]: [],
      },
    });
  };

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

  useEffect(() => {
    if (dataEquipo) {
      setFormManual({
        nombre: dataEquipo.nombre,
        fecha_inicio: dataEquipo.fecha_inicio,
        fecha_fin: dataEquipo.fecha_fin,
        integrantes: dataEquipo.ids_estudiantes,
        mentorTecnico: dataEquipo.id_mentor,
        mentorQA: dataEquipo.id_mentor_qa,
        mentorUXUI: dataEquipo.id_mentor_ux_ui,
      });
    }
    console.log(dataEquipo);
  }, [dataEquipo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newEquipo: EquipoData = {
      nombre: "",
      tamano: 0,
      fecha_inicio: "",
      fecha_fin: "",
    };

    if (estudiantesNoGrupos > 5) {
      newEquipo = {
        nombre: form.nombre,
        tamano: form.tamano,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
      };
    } else {
      newEquipo = {
        nombre: "no equipos",
        tamano: 7,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
      };
    }

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const handleSubmitManual = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newEquipoManual = {
      nombre: formManual.nombre,
      tamano: estudiantesSeleccionados.length,
      fecha_inicio: formManual.fecha_inicio,
      fecha_fin: formManual.fecha_fin,
      integrantes: estudiantesSeleccionados,
      mentorTecnico: mentorSeleccionado,
      mentorUXUI: mentorUXUISeleccionado,
      mentorQA: mentorQASeleccionado,
    };

    if (dataEquipo != undefined) {
      const postPromise = fetchPutClient(
        `/api/equipoManual/${dataEquipo.id}`,
        newEquipoManual
      );

      toast.promise(postPromise, {
        loading: "Cargando...",
        success: (response: any) => {
          revalidateFuntion("/");
          revalidateFuntion("/equipo");
          revalidateFuntion("/register/equipos");
          router.push("/equipo");
          return `${response?.message}`;
        },
        error: (error) => {
          console.log(error);
          setResponseBackManual({
            message: error.message,
            errors: error.errors,
          });
          return `${error?.message}`;
        },
      });
    } else {
      const postPromise = fetchPostClient(`/api/equipoManual`, newEquipoManual);

      toast.promise(postPromise, {
        loading: "Cargando...",
        success: (response: any) => {
          revalidateFuntion("/");
          revalidateFuntion("/equipo");
          revalidateFuntion("/register/equipos");
          router.refresh();
          setFormManual({
            nombre: "",
            fecha_inicio: fechaHoyFormateada,
            fecha_fin: fechaFinFormateada,
            integrantes: [],
            mentorTecnico: 0,
            mentorUXUI: 0,
            mentorQA: 0,
          });
          setEstudiantesSeleccionados([]);
          setMentorSeleccionado(0);
          setMentorQASeleccionado(0);
          setMentorUXUISeleccionado(0);
          return `${response?.message}`;
        },
        error: (error) => {
          console.log(error);
          setResponseBackManual({
            message: error.message,
            errors: error.errors,
          });
          return `${error?.message}`;
        },
      });
    }
  };

  return (
    <>
      <div className="w-full flex-grow p-6  md:p-12">
        <h2 className="font-bold mb-4 text-center text-lg lg:text-2xl">
          {estudiantesNoGrupos < 5
            ? "Asignación de Estudiantes Sobrantes"
            : "Generación de equipos"}
        </h2>

        <div className="mb-4 rounded-md">
          <label htmlFor="modoGeneracion" className="block mb-2">
            Modo de Generación:
          </label>
          <select
            id="modoGeneracion"
            value={modoGeneracion}
            disabled={dataEquipo != undefined}
            onChange={(e) =>
              setModoGeneracion(e.target.value as "automatico" | "manual")
            }
            className="w-fit py-1 px-3 border rounded text-sm text-black dark:text-white dark:bg-slate-600"
          >
            <option className="text-sm" value="automatico">
              Automático
            </option>
            <option className="text-sm" value="manual">
              Manual
            </option>
          </select>
        </div>

        {modoGeneracion == "automatico" ? (
          <form
            onSubmit={handleSubmit}
            className="shadow-md bg-white dark:bg-gray-600 p-4 rounded-lg"
          >
            <div className="flex flex-col xl:flex-row items-center gap-5 lg:items-start xl:gap-10 w-full ">
              <div className="grid grid-cols-1 text-black grid-rows-none sm:grid-cols-2 lg:grid-rows-2 gap-4">
                <div className="">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Nombre del Equipo:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder=""
                    disabled={estudiantesNoGrupos < 6}
                    className={clsx(
                      "basis-1/3 mt-2  block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                      {
                        "border-red-500 dark:border-red-500":
                          responseBack.errors?.nombre?.length,
                        "border-gray-300": !responseBack.errors?.nombre?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
                      }
                    )}
                    onChange={handleChange}
                  />
                  <div aria-live="polite" aria-atomic="true" className="mt-1">
                    {responseBack.errors?.nombre?.map((error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="tamano"
                    className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Tamaño:
                  </label>
                  <input
                    onChange={handleChange}
                    disabled={estudiantesNoGrupos < 6}
                    type="number"
                    id="tamano"
                    pattern="[5-12]*"
                    inputMode="numeric"
                    name="tamano"
                    placeholder=""
                    className={clsx(
                      "basis-1/3 mt-2  block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                      {
                        "border-red-500 dark:border-red-500":
                          responseBack.errors?.tamano?.length,
                        "border-gray-300": !responseBack.errors?.tamano?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
                      }
                    )}
                  />
                  <div aria-live="polite" aria-atomic="true" className="mt-1">
                    {responseBack.errors?.tamano?.map((error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="fecha_inicio"
                    className="block  text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Fecha de inicio:
                  </label>
                  <input
                    disabled={estudiantesNoGrupos < 6}
                    onChange={handleChange}
                    type="date"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    defaultValue={fechaHoyFormateada}
                    placeholder=""
                    className={clsx(
                      "basis-1/3 mt-2  block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                      {
                        "border-red-500 dark:border-red-500 ":
                          responseBack.errors?.fecha_inicio?.length,
                        "border-gray-300":
                          !responseBack.errors?.fecha_inicio?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
                      }
                    )}
                  />
                  <div aria-live="polite" aria-atomic="true" className="mt-1">
                    {responseBack.errors?.fecha_inicio?.map((error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="fecha_fin"
                    className="block  text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Fecha final de entrega:
                  </label>
                  <input
                    disabled={estudiantesNoGrupos < 6}
                    onChange={handleChange}
                    type="date"
                    id="fecha_fin"
                    name="fecha_fin"
                    placeholder=""
                    defaultValue={fechaFinFormateada}
                    className={clsx(
                      "basis-1/3 mt-2 block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                      {
                        "border-red-500 dark:border-red-500":
                          responseBack.errors?.fecha_fin?.length,
                        "border-gray-300":
                          !responseBack.errors?.fecha_fin?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
                      }
                    )}
                  />
                  <div aria-live="polite" aria-atomic="true" className="mt-1">
                    {responseBack.errors?.fecha_fin?.map((error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={estudiantesNoGrupos == 0}
                className={clsx(
                  "px-4 py-2 max-h-11 self-center sm:self-end bg-blue-400 text-white rounded-md shadow-sm  w-64 m-0 sm:justify-self-end sm:ml-auto capitalize",
                  {
                    " cursor-not-allowed": estudiantesNoGrupos == 0,
                    " hover:bg-blue-700 ": estudiantesNoGrupos != 0,
                  }
                )}
              >
                {estudiantesNoGrupos < 6
                  ? "Asignar Estudiantes"
                  : "Generar Equipos"}
              </button>
            </div>
            <div
              className={clsx("text-red-500 dark:text-red-500 border-t-2 mt-3")}
            >
              <span className="align-top">* </span>
              {estudiantesNoGrupos > 0 ? (
                <span className="text-sm">
                  {estudiantesNoGrupos} estudiante
                  {estudiantesNoGrupos != 1 ? "s" : ""} sin grupos
                </span>
              ) : (
                <span className="text-base">
                  No hay estudiantes para crear/asignar a ningun grupo
                </span>
              )}
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitManual}
            className="bg-white dark:bg-gray-600 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-xl font-semibold mb-4">
              {dataEquipo != undefined
                ? `Actualización del Equipo: ${dataEquipo.nombre}`
                : "Crear Nuevo Equipo Manualmente"}
            </h2>

            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-6">
              <div className="mb-4">
                <label
                  htmlFor="nombreEquipo"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Nombre del Equipo:
                </label>
                <input
                  id="nombreEquipo"
                  name="nombre"
                  disabled={dataEquipo != undefined}
                  type="text"
                  value={formManual.nombre}
                  onChange={handleChangeManual}
                  className={clsx(" p-2 border rounded  text-black w-full", {
                    "cursor-not-allowed": dataEquipo != undefined,
                    "border-red-500 dark:border-red-500":
                      responseBackManual.errors?.nombre?.length,
                  })}
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBackManual.errors?.nombre?.map((error: string) => (
                    <p
                      className="m-0 text-sm text-red-500 dark:text-red-500"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mentor"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Mentor del Grupo:
                </label>
                <select
                  id="mentor"
                  name="mentorTecnico"
                  value={mentorSeleccionado?.toString() || ""}
                  onChange={(e) => {
                    setMentorSeleccionado(parseInt(e.target.value));
                    setResponseBackManual({
                      ...responseBackManual,
                      errors: {
                        ...responseBackManual.errors,
                        [e.target.name]: [],
                      },
                    });
                  }}
                  className={clsx(
                    "w-full text-black p-2 border rounded sm:text-sm ",
                    {
                      "border-red-500 dark:border-red-500":
                        responseBackManual.errors?.mentorTecnico?.length,
                    }
                  )}
                >
                  {dataEquipo ? (
                    <>
                      <option
                        title={`${dataEquipo.mentor} ${dataEquipo.mentor_apellido} - NODE, JAVA`}
                        value={dataEquipo.id_mentor}
                        hidden
                      >
                        {dataEquipo.mentor} {dataEquipo.mentor_apellido} - NODE,
                        JAVA
                      </option>
                    </>
                  ) : (
                    <option value="" hidden>
                      Seleccionar Mentor
                    </option>
                  )}
                  {mentoresTecnicosSinGrupos.map((mentor) => (
                    <option
                      title={`${mentor.apellido}, ${
                        mentor.nombre
                      } - ${mentor.tecnologias.join(", ")}`}
                      key={mentor.id}
                      value={mentor.id.toString()}
                    >
                      {mentor.apellido}, {mentor.nombre} -{" "}
                      {mentor.tecnologias.join(", ")}
                    </option>
                  ))}
                </select>
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBackManual.errors?.mentorTecnico?.map(
                    (error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    )
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mentorqa"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Mentor QA:
                </label>
                <select
                  id="mentorqa"
                  name="mentorQA"
                  value={mentorQASeleccionado?.toString() || ""}
                  onChange={(e) => {
                    setMentorQASeleccionado(parseInt(e.target.value));
                    setResponseBackManual({
                      ...responseBackManual,
                      errors: {
                        ...responseBackManual.errors,
                        [e.target.name]: [],
                      },
                    });
                  }}
                  className={clsx(
                    "w-full text-black p-2 border rounded sm:text-sm ",
                    {
                      "border-red-500 dark:border-red-500":
                        responseBackManual.errors?.mentorUXUI?.length,
                    }
                  )}
                >
                  {dataEquipo ? (
                    <>
                      <option
                        title={`${dataEquipo.mentor_qa_apellido}, ${dataEquipo.mentor_qa} - QA`}
                        value={dataEquipo.id_mentor_qa}
                        hidden
                      >
                        {dataEquipo.mentor_qa_apellido}, {dataEquipo.mentor_qa}{" "}
                        - QA
                      </option>
                    </>
                  ) : (
                    <option value="" hidden>
                      Seleccionar Mentor
                    </option>
                  )}
                  {mentoresQASinGrupos.map((mentor) => (
                    <option
                      title={`${mentor.apellido}, ${
                        mentor.nombre
                      } - ${mentor.tecnologias.join(", ")}`}
                      key={mentor.id}
                      value={mentor.id.toString()}
                    >
                      {mentor.apellido}, {mentor.nombre} -{" "}
                      {mentor.tecnologias.join(", ")}
                    </option>
                  ))}
                </select>
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBackManual.errors?.mentorQA?.map((error: string) => (
                    <p
                      className="m-0 text-sm text-red-500 dark:text-red-500"
                      key={error}
                    >
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mentorUXUI"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Mentor UX/UI:
                </label>
                <select
                  id="mentorUXUI"
                  value={mentorUXUISeleccionado?.toString() || ""}
                  onChange={(e) => {
                    setMentorUXUISeleccionado(parseInt(e.target.value));
                    setResponseBackManual({
                      ...responseBackManual,
                      errors: {
                        ...responseBackManual.errors,
                        [e.target.name]: [],
                      },
                    });
                  }}
                  className={clsx(
                    " text-black p-2 border rounded sm:text-sm w-full",
                    {
                      "border-red-500 dark:border-red-500":
                        responseBackManual.errors?.mentorUXUI?.length,
                    }
                  )}
                >
                  {dataEquipo ? (
                    <>
                      <option
                        title={`${dataEquipo.mentor_ux_ui_apellido}, ${dataEquipo.mentor_ux_ui} - UX/IU`}
                        value={dataEquipo.id_mentor_ux_ui}
                        hidden
                      >
                        {dataEquipo.mentor_ux_ui_apellido}
                        {", "}
                        {dataEquipo.mentor_ux_ui} - UX/IU
                      </option>
                    </>
                  ) : (
                    <option value="" hidden>
                      Seleccionar Mentor
                    </option>
                  )}

                  {mentoresUXUISinGrupos.map((mentor) => (
                    <option
                      key={mentor.id}
                      title={`${mentor.apellido}, ${
                        mentor.nombre
                      } - ${mentor.tecnologias.join(", ")}`}
                      value={mentor.id.toString()}
                    >
                      {mentor.apellido}, {mentor.nombre} -{" "}
                      {mentor.tecnologias.join(", ")}
                    </option>
                  ))}
                </select>
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBackManual.errors?.mentorUXUI?.map(
                    (error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    )
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="fecha_inicio"
                  className="block   text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Fecha de inicio:
                </label>
                <input
                  onChange={handleChangeManual}
                  type="date"
                  id="fecha_inicio"
                  name="fecha_inicio"
                  defaultValue={
                    dataEquipo != undefined
                      ? dataEquipo.fecha_inicio.split("T")[0]
                      : fechaHoyFormateada
                  }
                  placeholder=""
                  className={clsx(
                    "basis-1/3 mt-2 text-black block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-full",
                    {
                      "border-red-500 dark:border-red-500":
                        responseBack.errors?.fecha_inicio?.length,
                    }
                  )}
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBackManual.errors?.fecha_inicio?.map(
                    (error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    )
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="fecha_fin"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Fecha final de entrega:
                </label>
                <input
                  onChange={handleChangeManual}
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder=""
                  defaultValue={
                    dataEquipo != undefined
                      ? dataEquipo.fecha_fin.split("T")[0]
                      : fechaFinFormateada
                  }
                  className={clsx(
                    "basis-1/3 mt-2 block text-black border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-full",
                    {
                      "border-red-500 dark:border-red-500":
                        responseBackManual.errors?.fecha_fin?.length,
                    }
                  )}
                />
                <div aria-live="polite" aria-atomic="true" className="mt-1">
                  {responseBackManual.errors?.fecha_fin?.map(
                    (error: string) => (
                      <p
                        className="m-0 text-sm text-red-500 dark:text-red-500"
                        key={error}
                      >
                        {error}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mb-2 mt-6 relative">
              <label
                htmlFor="filtroEstudiantes"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                Filtrar Estudiantes:
              </label>
              <input
                id="filtroEstudiantes"
                type="text"
                placeholder="Buscar por nombre, apellido o tecnología"
                value={filtroEstudiantes}
                onChange={(e) => setFiltroEstudiantes(e.target.value)}
                className="pr-2 py-2 pl-8 border rounded text-black w-full lg:max-w-96"
                onKeyDown={handleKeyDown}
              />
              <div className="absolute left-2 top-10 h-[18px] w-[18px] -translate-y-1/6 text-gray-500 peer-focus:text-gray-900">
                <svg className="w-5 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                  </svg>
                </svg>
              </div>
            </div>

            <div className="">
              <div
                className={clsx(
                  "h-64 border dark:border-gray-400 border-gray-100 rounded overflow-y-auto ",
                  {
                    "border-red-500 dark:border-red-500 ":
                      responseBackManual.errors?.integrantes?.length,
                  }
                )}
              >
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-slate-800">
                    <tr>
                      <th className="text-left p-2">Nombre</th>
                      <th className="text-left p-2 ">Tecnologías</th>
                      <th className="text-left p-2 ">Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantesFiltrados?.map((estudiante) => (
                      <tr key={estudiante.id}>
                        <td className="p-2">
                          {estudiante.apellido}, {estudiante.nombre}
                        </td>
                        <td className="p-2">{estudiante.tecnologia_nombre}</td>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={estudiantesSeleccionados.includes(
                              estudiante.id
                            )}
                            onChange={() => {
                              toggleEstudianteSeleccion(estudiante.id);
                            }}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                        </td>
                      </tr>
                    ))}
                    {dataEquipo?.ids_estudiantes.map(
                      (e: number, index: number) => (
                        <tr key={`${e}-${index}`}>
                          <td className="p-2">
                            {dataEquipo.apellidos_estudiantes[index]},{" "}
                            {dataEquipo.nombres_estudiantes[index]}
                          </td>
                          <td className="p-2">
                            {dataEquipo.tecnologias[index]}
                          </td>
                          <td className="p-2">
                            <input
                              type="checkbox"
                              name="integrantes"
                              checked={estudiantesSeleccionados.includes(e)}
                              onChange={() => toggleEstudianteSeleccion(e)}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div aria-live="polite" aria-atomic="true" className="mt-1">
                {responseBackManual.errors?.integrantes?.map(
                  (error: string) => (
                    <p
                      className="m-0 text-sm text-red-500 dark:text-red-500 "
                      key={error}
                    >
                      {error}
                    </p>
                  )
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-400 mt-4 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-lg"
            >
              {dataEquipo != undefined ? "Actualizar " : "Crear "} Equipo
            </button>
            {estudiantesNoGrupos == 0 && dataEquipo == undefined && (
              <div
                className={clsx(
                  "text-red-500 dark:text-red-500 border-t-2 mt-3"
                )}
              >
                {" "}
                <span className="text-base">
                  No hay estudiantes para crear/asignar a ningún grupo
                </span>{" "}
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}
