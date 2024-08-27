"use client"
import { ChangeEvent, FormEvent, useState } from 'react';

interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    estado: boolean;
    id_ong: string | null;
}

export default function RegisterAlumnos() {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [form, setForm] = useState({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        estado: 'true',
        id_ong: ''
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
        const newEstudiante: Estudiante = {
            id: parseInt(form.id, 10),
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            telefono: form.telefono,
            estado: form.estado === 'true',
            id_ong: form.id_ong ? form.id_ong : null
        };
        setEstudiantes([...estudiantes, newEstudiante]);
        setForm({
            id: '',
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            estado: 'true',
            id_ong: ''
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center underline">Formulario de Inscripción de Estudiantes</h1>
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
                <div>
                    <label htmlFor="ong" className="block text-sm font-medium text-slate-200">ONG:</label>
                    <input
                        type="text"
                        id="ong"
                        name="ong"
                        value={form.id_ong}
                        onChange={handleChange}
                        className="mt-1 text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className='flex flex-wrap gap-4'>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="html" id="html" value="html" />
                        <label className='text-sm' htmlFor="html">
                            HTML
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="css" id="css" value="css" />
                        <label className='text-sm' htmlFor="css">
                            CSS
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="javascript" id="javascript" value="javascript" />
                        <label className='text-sm' htmlFor="javascript">
                            JAVASCRIPT
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="java" id="java" />
                        <label className='text-sm' htmlFor="java">
                            JAVA
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="reactjs" id="reactjs" />
                        <label className='text-sm' htmlFor="reactjs">
                            REACTjs
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="nodejs" id="nodejs" />
                        <label className='text-sm' htmlFor="nodejs">
                            NODEjs
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="mongodb" id="mongodb" />
                        <label className='text-sm' htmlFor="mongodb">
                            MONGODB
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="mysql" id="mysql" />
                        <label className='text-sm' htmlFor="mysql">
                            MYSQL
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="qa" id="qa" />
                        <label className='text-sm' htmlFor="qa">
                            QA
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input className="form-check-input" type="radio" name="uxui" id="uxui" />
                        <label className='text-sm' htmlFor="uxui">
                            UX/UI
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-center bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 mx-auto w-full">
                    Registrar Estudiante
                </button>
            </form>
            <h2 className="text-xl font-semibold text-center underline mb-4">Lista de Alumnos Inscriptos</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID ONG</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {estudiantes.map(estudiante => (
                        <tr key={estudiante.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estudiante.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{estudiante.apellido}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{estudiante.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{estudiante.telefono}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{estudiante.estado ? 'Activo' : 'Inactivo'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{estudiante.id_ong !== null ? estudiante.id_ong : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
