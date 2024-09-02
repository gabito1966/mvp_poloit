"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

interface Ong {
    id: number;
    nombre: string;
}

export default function RegisterTecnologias() {
    const [ongs, setOngs] = useState<Ong[]>([]);
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
        const newOng: Ong = {
            id: parseInt(form.id, 10),
            nombre: form.nombre,
        };
        setOngs([...ongs, newOng]);
        setForm({
            id: '',
            nombre: ''
        });
    };

    return (
        <div className="container mx-auto p-10 h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center underline">Formulario de Inscripción de ONG</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center">

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
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 mx-auto w-full">
                    Registrar ONG
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-4 text-center underline">Lista de ONG</h2>
            <table className="space-y-4 mb-8 w-1/4 mx-auto items-center justify-center divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {ongs.map(ong => (
                        <tr key={ong.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ong.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ong.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
