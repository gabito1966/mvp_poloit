"use client";

import { fetchPostClient } from "@/lib/fetchFunctions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Estudiante {
    id?: "";
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    estado?: string;
    id_ong: number | null;
}
interface EstudianteParams {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    estado: string;
    id_ong: number;
}

export type ong = {
    id: number;
    nombre: string;
};

function FormEstudiante({
    ongs,
    dataFetch,
}: {
    ongs: ong[];
    dataFetch?: EstudianteParams | undefined;
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
        if (dataFetch) {
            setForm({
                id: dataFetch.id?.toString(),
                nombre: dataFetch.nombre,
                apellido: dataFetch.apellido,
                email: dataFetch.email,
                telefono: dataFetch.telefono,
                estado: dataFetch.estado,
                id_ong: dataFetch.id_ong.toString(),
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

        if (dataFetch) {
            const response = await fetchPostClient(
                `/api/estudiante/${dataFetch.id}`,
                newEstudiante
            );
            console.log(response);
        } else {
            const response = await fetchPostClient(`/api/estudiante`, newEstudiante);
            console.log(response);
        }
    };
    return (
        <section>
            <div className="container mx-auto p-4" >
                <h1 className="text-2xl font-bold mb-4 text-center underline" >Formulario de Inscripción de Estudiantes</h1>
                < form onSubmit={handleSubmit} className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-slate-200">
                            Nombre:
                        </label>
                        < input type="text" id="nombre" name="nombre" value={form.nombre}
                            onChange={handleChange}
                            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required />
                    </div>
                    < div >
                        <label htmlFor="apellido" className="block text-sm font-medium text-slate-200" >
                            Apellido:
                        </label>
                        < input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-200"
                        >
                            Email:
                        </label>
                        < input
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
                            className="block text-sm font-medium text-slate-200"   >
                            Teléfono:
                        </label>
                        < input
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
                        <label
                            htmlFor="id_ong"
                            className="block text-sm font-medium text-slate-200"
                        >
                            ONG:
                        </label>
                        < select
                            id="id_ong"
                            name="id_ong"
                            value={form.id_ong}
                            onChange={handleChange}
                            required
                            className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled hidden >
                                Seleccione una ONG
                            </option>
                            {
                                ongs.map((e, i) => {
                                    return (
                                        <option key={`${i}${e.nombre}${e.id}`
                                        } value={`${e.id}`}>
                                            {e.nombre}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    < button
                        type="submit"
                        className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 mx-auto"
                    >
                        Registrar Estudiante
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormEstudiante;