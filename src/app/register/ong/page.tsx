"use client"
import { Ong } from '@/lib/definitions/frontEndDefinitions';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function RegisterOngs() {
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
        <section className='container flex flex-col max-w-5xl'>
            <div className="container mx-auto p-10 h-1/2">
                <h1 className="text-2xl font-bold mb-4 text-center">Formulario de Inscripción de ONG</h1>
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
                        className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-sm hover:bg-blue-700 mx-auto w-full">
                        Registrar ONG
                    </button>
                </form>
            </div>
            <Link href="/ong" className="bg-blue-400 hover:bg-blue-700 w-52 rounded-md text-xl text-center text-white p-1 my-3">Volver a ONG</Link>
        </section>
    );
}