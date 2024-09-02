"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

interface Tecnologia {
    id: number;
    nombre: string;
}

export default function RegisterTecnologias() {
    const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
    const [form, setForm] = useState({
        id: '',
        nombre: '',

    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTecnologia: Tecnologia = {
            id: parseInt(form.id, 10),
            nombre: form.nombre,
        };
        setTecnologias([...tecnologias, newTecnologia]);
        setForm({
            id: '',
            nombre: ''
        });
    };

    return (
        <div className="container mx-auto p-10 h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center underline">Formulario de Inscripción de Tecnologias</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center">

                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-500">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="mt-2 text-black block w-full border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-full"
                >
                    Registrar Tecnologia
                </button>
            </form>
        </div>
    );
}