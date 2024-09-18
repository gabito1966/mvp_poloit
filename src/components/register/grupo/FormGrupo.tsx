import React from "react";

export default function FormGrupo() {
  return (
    <>
      <div className="w-full flex-grow p-6  md:p-12">
        <h1 className="text-4xl font-semibold mb-8 text-center underline">
          Generación de equipos
        </h1>
        <div className="border-2 border-gray-300 rounded-lg">
          <h3 className="text-2xl m-3">Crear nuevo Equipo</h3>
          <form className="flex flex-row p-6 gap-10 justify-around">
            <input
              type="text"
              id="nombreGrupo"
              name="nombreGrupo"
              placeholder="Ingrese el nombre del equipo"
              className="basis-1/3 mt-2 text-black block border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            />
            <input
              type="text"
              id="integrantes"
              name="integrantes"
              placeholder="Cantidad de integrantes"
              className="basis-1/3 mt-2 text-black block border-gray-300 border-2 h-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-700 mx-auto w-64"
            >
              Generar Equipo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
