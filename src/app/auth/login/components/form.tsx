"use client"

import { useState } from "react";


function Form() {
    const [data, setData] = useState({ email: '', password: '' })
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const dataResponse = await fetch('http://localhost:3000/api/login', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
            const response = await dataResponse.json()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-blue-500">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slice-300">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => { handleSubmit(e) }}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">Email address</label>
                        <div className="mt-2">
                            <input onChange={handleChange} id="email" name="email" type="email" placeholder=" Insert Email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-slice-300">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={handleChange} id="password" placeholder=" Insert password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Form