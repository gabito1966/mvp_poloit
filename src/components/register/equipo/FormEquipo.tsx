"use client";

import { EquipoData } from "@/database/definitions";
import {
  EstudianteSinGrupos,
  MentorSinGrupo,
} from "@/lib/definitions/frontEndDefinitions";
import { fetchGetClient, fetchPostClient } from "@/lib/fetchFunctions";
import { revalidateFuntion } from "@/lib/server/serverCache";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export type GrupoFromManual = {
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  tamano: number;
  integrantes: number[];
  mentorTecnico: number;
  mentorUXUI: number;
  mentorQA: number;
};

export default function FormEquipo({
  estudiantesNoGrupos,
  estudiantesSinGrupo,
  mentoresTecnicosSinGrupos,
  mentoresQASinGrupos,
  mentoresUXUISinGrupos,
}: {
  estudiantesNoGrupos: number;
  estudiantesSinGrupo: EstudianteSinGrupos[];
  mentoresTecnicosSinGrupos: MentorSinGrupo[];
  mentoresQASinGrupos: MentorSinGrupo[];
  mentoresUXUISinGrupos: MentorSinGrupo[];
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
  >([]);
  const [mentorSeleccionado, setMentorSeleccionado] = useState<number | null>(
    null
  );
  const [filtroEstudiantes, setFiltroEstudiantes] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    tamano: 0,
    fecha_inicio: fechaHoyFormateada,
    fecha_fin: fechaFinFormateada,
  });

  const [formManual, setFormManual] = useState<GrupoFromManual>({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
    tamano: 0,
    integrantes: [],
    mentorTecnico: 0,
    mentorUXUI: 0,
    mentorQA: 0,
  });

  const [modoGeneracion, setModoGeneracion] = useState<"automatico" | "manual">(
    "automatico"
  );
  const [estudiantes, setEstudiantes] = useState<EstudianteSinGrupos[]>([]);

  useEffect(() => {
    if (estudiantesSinGrupo) {
      setEstudiantes(estudiantesSinGrupo);
    }
  }, [estudiantesSinGrupo]);

  const toggleEstudianteSeleccion = (estudianteId: number) => {
    setEstudiantesSeleccionados((prev) =>
      prev.includes(estudianteId)
        ? prev.filter((id) => id !== estudianteId)
        : [...prev, estudianteId]
    );
  };

  const estudiantesFiltrados = estudiantesSinGrupo.filter(
    (e) =>
      e.nombre.toLowerCase().includes(filtroEstudiantes.toLowerCase()) ||
      e.apellido.toLowerCase().includes(filtroEstudiantes.toLowerCase()) ||
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

  const handleChangeManual = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormManual((prevForm) => ({ ...prevForm, [name]: value }));

    setResponseBack({
      ...responseBack,
      errors: {
        ...responseBack.errors,
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
  const handleManual = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newEquipoManual = {
      nombre: formManual.nombre,
      tamano: formManual.tamano,
      fecha_inicio: formManual.fecha_inicio,
      fecha_fin: formManual.fecha_fin,
      integrantes: estudiantesSeleccionados,
      mentorTecnico: mentorSeleccionado,
      mentorUXUI: mentorSeleccionado,
      mentorQA: mentorSeleccionado,
    };

    const postPromise = fetchPostClient(`/api/equipoManual`, newEquipoManual);

    // const postPromise = fetchPostClient(`/api/equipoManual`,{} );

    // toast.promise(postPromise, {
    //   loading: "Cargando...",
    //   success: (response: any) => {
    //     revalidateFuntion("/");
    //     revalidateFuntion("/equipo");
    //     revalidateFuntion("/register/equipos");
    //     router.refresh();
    //     return `${response?.message}`;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     setResponseBack({
    //       message: error.message,
    //       errors: error.errors,
    //     });
    //     return `${error?.message}`;
    //   },
    // });
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
                        "border-red-500": responseBack.errors?.nombre?.length,
                        "border-gray-300": !responseBack.errors?.nombre?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
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
                        "border-red-500": responseBack.errors?.tamano?.length,
                        "border-gray-300": !responseBack.errors?.tamano?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
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
                    className="block text-sm font-medium text-gray-500 dark:text-gray-400"
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
                        "border-red-500":
                          responseBack.errors?.fecha_inicio?.length,
                        "border-gray-300":
                          !responseBack.errors?.fecha_inicio?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
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
                    className="block text-sm font-medium text-gray-500 dark:text-gray-400"
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
                        "border-red-500":
                          responseBack.errors?.fecha_fin?.length,
                        "border-gray-300":
                          !responseBack.errors?.fecha_fin?.length,
                        "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
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
            <div className={clsx("text-red-500 border-t-2 mt-3")}>
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
            onSubmit={handleManual}
            className="bg-white dark:bg-gray-600 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-xl font-semibold mb-4">
              Crear Nuevo Grupo Manualmente
            </h2>

            <div>
              <div className="mb-4">
                <label
                  htmlFor="nombreGrupo"
                  className="block mb-2 text-gray-500 dark:text-gray-300"
                >
                  Nombre del Grupo:
                </label>
                <input
                  id="nombreGrupo"
                  type="text"
                  defaultValue={formManual.nombre}
                  onChange={handleChangeManual}
                  className=" p-2 border rounded w-64 text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="fecha_inicio"
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Fecha de inicio:
                </label>
                <input
                  onChange={handleChangeManual}
                  type="date"
                  id="fecha_inicio"
                  name="fecha_inicio"
                  defaultValue={fechaHoyFormateada}
                  placeholder=""
                  className={clsx(
                    "basis-1/3 mt-2 text-black block  border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                    {
                      "border-red-500":
                        responseBack.errors?.fecha_inicio?.length,
                      "border-gray-300":
                        !responseBack.errors?.fecha_inicio?.length,
                      "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
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
                  className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Fecha final de entrega:
                </label>
                <input
                  disabled={estudiantesNoGrupos < 6}
                  onChange={handleChangeManual}
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder=""
                  defaultValue={fechaFinFormateada}
                  className={clsx(
                    "basis-1/3 mt-2 block text-black border-2 h-10 rounded-md shadow-sm  sm:text-sm p-3 w-64",
                    {
                      "border-red-500": responseBack.errors?.fecha_fin?.length,
                      "border-gray-300":
                        !responseBack.errors?.fecha_fin?.length,
                      "hover:cursor-not-allowed": estudiantesNoGrupos < 6,
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
              <div className="mb-4">
                <label
                  htmlFor="filtroEstudiantes"
                  className="block mb-2 text-gray-500 dark:text-gray-300"
                >
                  Filtrar Estudiantes:
                </label>
                <input
                  id="filtroEstudiantes"
                  type="text"
                  placeholder="Buscar por nombre, apellido o tecnología"
                  value={filtroEstudiantes}
                  onChange={(e) => setFiltroEstudiantes(e.target.value)}
                  className="p-2 border rounded text-black w-64"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-500 dark:text-gray-300">
                Seleccionar Estudiantes:
              </label>
              <div className="h-64 border dark:border-gray-400 border-gray-100 rounded overflow-y-auto ">
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
                            onChange={() =>
                              toggleEstudianteSeleccion(estudiante.id)
                            }
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="mentor" className="block mb-2">
                Mentor del Grupo:
              </label>
              {/* <select
                id="mentor"
                value={mentorSeleccionado?.toString() || ''}
                onChange={(e) => setMentorSeleccionado(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar Mentor</option>
                {mentores.map(mentor => (
                  <option key={mentor.id} value={mentor.id.toString()}>
                    {mentor.nombre} {mentor.apellido} - {mentor.especialidad}
                  </option>
                ))}
              </select> */}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear Grupo
            </button>
          </form>
        )}
      </div>
    </>
  );
}
