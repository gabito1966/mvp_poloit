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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center underline">Formulario de Inscripción de Tecnologias</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center">
                <div>
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
                </div>
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-slate-200">Nombre:</label>
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


                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 mx-auto"
                >
                    Registrar Tecnologia
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-4">Lista de Tecnologias</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tecnologias.map(tecnologia => (
                        <tr key={tecnologia.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tecnologia.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{tecnologia.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
