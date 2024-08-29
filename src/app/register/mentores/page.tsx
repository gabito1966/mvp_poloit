"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

interface Mentor {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    empresa: string;
    estado: boolean;
}

export default function RegisterMentores() {
    const [mentores, setMentores] = useState<Mentor[]>([]);
    const [form, setForm] = useState({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        empresa: '',
        estado: 'true'
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
        const newMentor: Mentor = {
            id: parseInt(form.id, 10),
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            telefono: form.telefono,
            empresa: form.empresa,
            estado: form.estado === 'true'
        };
        setMentores([...mentores, newMentor]);
        setForm({
            id: '',
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            empresa: '',
            estado: 'true'
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center underline">Formulario de Inscripción de Mentores</h1>
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
                <div>
                    <label htmlFor="apellido" className="block text-sm font-medium text-slate-200">Apellido:</label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200">Email:</label>
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
                    <label htmlFor="telefono" className="block text-sm font-medium text-slate-200">Teléfono:</label>
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
                    <label htmlFor="empresa" className="block text-sm font-medium text-slate-200">Empresa:</label>
                    <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-slate-200">Estado:</label>
                    <select
                        id="estado"
                        name="estado"
                        value={form.estado}
                        onChange={handleChange}
                        className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 mx-auto w-full">
                    Registrar Mentor
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-4 text-center underline">Lista de Mentores Inscritos</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mentores.map(mentor => (
                        <tr key={mentor.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mentor.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mentor.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mentor.apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mentor.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mentor.telefono}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mentor.empresa}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mentor.estado ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
