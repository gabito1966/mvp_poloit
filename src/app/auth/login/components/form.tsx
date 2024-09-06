"use client";

import { fetchPostClient } from "@/lib/fetchFunctions";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Form() {
  const [data, setData] = useState({ email: "", password: "" });
  const [responseBack, setResponseBack] = useState({
    success: false,
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

    if(responseBack.message!=""){
      setResponseBack({
        ...responseBack,
        message: "",
      }
      );
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetchPostClient("/api/login", data);

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
      setResponseBack({ success: error.status, message: error.message, errors: error.errors });
    }
  }

  return (
    <div className="flex flex-col justify-items-center justify-center py-30 lg:px-8 h-full bg-white text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight underline">
        Inicia sesión en tu cuenta
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
              className="block text-sm font-medium leading-6 text-gray-400"
            >
              Email 
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese Email"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div id="customer-error" aria-live="polite" aria-atomic="true">
                {responseBack.errors?.email &&
                  responseBack.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500 transition-all" key={error}>
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
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="password"
                placeholder=" Ingrese contraseña"
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
            <div id="customer-error transition-all" aria-live="polite" aria-atomic="true">
              {responseBack.message && !responseBack.success &&
                
                  <p className="mt-2 text-sm text-red-500" >
                    {responseBack.message}
                  </p>
                    }
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;