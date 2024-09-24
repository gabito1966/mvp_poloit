
import Link from "next/link";

export default async function EquipoCard() {

    return (
        <section className="container max-w-5xl">

            <h1 className="text-4xl text-center font-bold p-2 mt-10">Card del Equipo: Nombre del Equipo</h1>

            <div className="w-full m-5 max-h-124 flex-col p-1  md:p-12 text-black border-2 border-grey-200 bg-white rounded-lg ">
                <div className="grid grid-cols-2 md:grid-cols-4 ">
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                            <p className="bg-transparent text-base mb-6">Nombre del Equipo</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Tamaño:</h4>
                            <p className="bg-transparent text-base mb-6">Tamaño del equipo</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Fecha Inicio:</h4>
                            <p className="bg-transparent text-base mb-6">Fecha de inicio</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-16 max-md:ml-0 ">
                            <h4 className="block mb-2 text-md text-gray-500 font-medium">Finaliza:</h4>
                            <p className="bg-transparent text-base mb-6">Fecha finalizacion</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-20">
                <Link href="/equipo">
                    Volver a equipo
                </Link>
            </div>
        </section>
    )
}
