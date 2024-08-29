"use client";

import { fetchPostClient } from "@/lib/fetchFunctions";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Form() {
    const [data, setData] = useState({ email: "", password: "" });
    const [responseBack, setResponseBack] = useState({
        message: "",
        errors: {
            email: [],
            password: [],
        },
    });
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.name]: e.target.value });

        setResponseBack({
            ...responseBack,
            errors: {
                ...responseBack.errors,
                [e.target.name]: [],
            },
        });
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetchPostClient("/api/login", data);

            console.log(response);

            if (!response.success) {
                throw response;
            }

            const now = new Date();
            const expire = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const cookie = `session=${response.session
                }; expires=${expire.toUTCString()}; path=/`;
            document.cookie = cookie;

            router.push("/", { scroll: false });
        } catch (error: any) {
            setResponseBack({ message: error.message, errors: error.errors });
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-items-center py-30 lg:px-8 h-screen bg-blue-500">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slice-300 underline">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-slate-100"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                id="email"
                                name="email"
                                type="email"
                                placeholder=" Insert Email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div id="customer-error" aria-live="polite" aria-atomic="true">
                                {responseBack.errors?.email &&
                                    responseBack.errors.email.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-slate-100"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                id="password"
                                placeholder=" Insert password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div id="customer-error" aria-live="polite" aria-atomic="true">
                            {responseBack.errors?.password &&
                                responseBack.errors?.password.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;