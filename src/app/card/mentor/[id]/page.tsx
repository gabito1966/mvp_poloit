import { fetchFilteredMentores } from "@/database/data";

export default async function MentorCard({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    let mentores: any[] = [];
    try {
        mentores = await fetchFilteredMentores(query, currentPage);
    } catch (error) {
        console.error("Error fetching mentores:", error);
    }

    return (
        <section className="container">
            <h1 className="text-4xl text-center font-bold p-2 mt-10">Card del Mentor</h1>
            <div className="w-full m-2 md:m-48 max-h-124 flex-col p-1 md:p-12 text-black border-2 border-black bg-neutral-200">
                {mentores.length === 0 ? (
                    <p className="text-center">No se encontraron mentores.</p>
                ) : (
                    mentores.map((mentor) => (
                        <div key={mentor.id}>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="flex-auto">
                                    <h4 className="block font-semibold mb-2 text-md">Nombre:</h4>
                                    <p className="bg-transparent text-base mb-6">{mentor.nombre}</p>
                                </div>
                                <div className="flex-auto">
                                    <h4 className="block font-semibold mb-2 text-md">Apellido:</h4>
                                    <p className="bg-transparent text-base mb-6">{mentor.apellido}</p>
                                </div>
                                <div className="flex-auto">
                                    <h4 className="block font-semibold mb-2 text-md">Email:</h4>
                                    <p className="bg-transparent text-base mb-6">{mentor.email}</p>
                                </div>
                                <div className="flex-auto">
                                    <h4 className="block font-semibold mb-2 text-md">Teléfono:</h4>
                                    <p className="bg-transparent text-base mb-6">{mentor.telefono}</p>
                                </div>
                                <div className="flex-auto">
                                    <h4 className="block font-semibold mb-2 text-md">Tecnologías:</h4>
                                    <p className="bg-transparent text-base mb-6">{mentor.tecnologias}</p>
                                </div>
                                <div className="flex-auto">
                                    <h4 className="block font-semibold mb-2 text-md">Empresas:</h4>
                                    <p className="bg-transparent text-base mb-6">{mentor.empresa}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
