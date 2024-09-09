

export default function MentorCard() {
    return (
        <section className="container">
            <h1 className="text-4xl text-center font-bold p-2 mt-10">Card del Mentor </h1>

            <div className="w-full m-2 md:m-48 max-h-124 flex-col p-1 md:p-12 text-black border-2 border-black bg-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Nombre:</h4>
                        <p className="bg-transparent text-base mb-6">Nombre</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Apellido:</h4>
                        <p className="bg-transparent text-base mb-6">Apellido</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Email:</h4>
                        <p className="bg-transparent text-base mb-6">Email</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Teléfono:</h4>
                        <p className="bg-transparent text-base mb-6">Telefono</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Tecnologías:</h4>
                        <p className="bg-transparent text-base mb-6">Tecnologias</p>
                    </div>
                    <div className="flex-auto">
                        <h4 className="block font-semibold mb-2 text-md">Empresas:</h4>
                        <p className="bg-transparent text-base mb-6">Empresas</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
