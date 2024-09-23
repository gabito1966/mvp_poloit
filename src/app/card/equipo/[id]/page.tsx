
import Link from "next/link";

export default async function EquipoCard() {

    return (
        <>
            <section className="container max-w-5xl">
            <h2 className="text-3xl text-center font-bold p-2 mt-5 underline">Card del Equipo: Nombre del Equipo</h2>
            <div className="w-full m-5 max-h-36 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                <div className="grid grid-cols-2 md:grid-cols-4 ">
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Nombre:</h4>
                            <p className="bg-transparent text-base mb-3">Nombre del Equipo</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Tamaño:</h4>
                            <p className="bg-transparent text-base mb-3">Tamaño del equipo</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Fecha Inicio:</h4>
                            <p className="bg-transparent text-base mb-3">Fecha de inicio</p>
                        </div>
                    </div>
                    <div className="flex-auto">
                        <div className="ml-8 max-md:ml-0 ">
                            <h4 className="block mb-1 text-md text-gray-500 font-medium">Finaliza:</h4>
                            <p className="bg-transparent text-base mb-3">Fecha finalizacion</p>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            <section className="container max-w-5xl">
                <h2 className="text-3xl text-center font-bold p-1 underline">Mentores del Equipo</h2>
                <div className="w-full m-5 max-h-48 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    <h3 className="text-xl font-semibold underline">Mentor tecnologias</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">Nombre del Mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3">Apellido del mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3">Email del mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">Telefono del mentor</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full m-5 max-h-48 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    <h3 className="text-xl font-semibold underline">Mentor QA</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">Nombre del Mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3">Apellido del mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3">Email del mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">Telefono del mentor</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full m-5 max-h-124 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    <h3 className="text-xl font-semibold underline">Mentor UX/UI</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-6">Nombre del Mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-6">Apellido del mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-6">Email del mentor</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-6">Telefono del mentor</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full m-5 max-h-124 flex-col p-1  md:p-2 text-black border-2 border-grey-200 bg-white rounded-lg ">
                    <h3 className="text-xl font-semibold underline">Estudiantes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 ">
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Nombre:</h4>
                                <p className="bg-transparent text-base mb-3">Nombre del Estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Apellido</h4>
                                <p className="bg-transparent text-base mb-3">Apellido del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Email:</h4>
                                <p className="bg-transparent text-base mb-3">Email del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Teléfono:</h4>
                                <p className="bg-transparent text-base mb-3">Telefono del estudiante</p>
                            </div>
                        </div>
                        <div className="flex-auto">
                            <div className="ml-16 max-md:ml-0 ">
                                <h4 className="block mb-2 text-md text-gray-500 font-medium">Tecnologia:</h4>
                                <p className="bg-transparent text-base mb-3">Tecnologia del estudiante</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-400 hover:bg-blue-700 w-60 rounded-md text-center text-white p-4 mt-5">
                    <Link href="/equipo">
                        Volver a equipo
                    </Link>
                </div>
            </section></>
    )
}
