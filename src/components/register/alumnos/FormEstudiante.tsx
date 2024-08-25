"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchGetClient, fetchPostClient } from "@/lib/fetchExampleNicolas";

interface Estudiante {
  id?: "";
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado?: string;
  id_ong: number | null;
}

export type ong = {
  id: number;
  nombre: string;
};

function FormEstudiante({
  ongs,
  params,
}: {
  ongs: ong[];
  params?: { id: string };
}) {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    estado: "",
    id_ong: "",
  });

  useEffect(() => {
    if (params) {
      fetchGetClient(`/api/estudiante/${params.id}`).then((data) => {
        setForm(data.data);
        console.log(form);
      });
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEstudiante: Estudiante = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      telefono: form.telefono,
      id_ong: form.id_ong ? parseInt(form.id_ong, 10) : null,
    };

    setEstudiantes([...estudiantes, newEstudiante]);
    setForm({
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      estado: "",
      id_ong: "",
    });

    const response = await fetchPostClient(`/api/estudiante`, newEstudiante);

    console.log(response);
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
          {/* <div>
                    <label htmlFor="id" className="block text-sm font-medium text-slate-200">ID:</label>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div> */}
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
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 mx-auto"
          >
            Registrar Alumno
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">
          Lista de Alumnos Inscriptos
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apellido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID ONG
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {estudiante.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {estudiante.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {estudiante.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {estudiante.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {estudiante.telefono}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {estudiante.estado ? "Activo" : "Inactivo"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {estudiante.id_ong !== null ? estudiante.id_ong : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FormEstudiante;
