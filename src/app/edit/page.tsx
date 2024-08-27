import Link from "next/link"

function Edit() {
    return (
        <div className="container mx-auto justify-center flex min-h-full px-6 py-20 lg:px-8 h-screen gap-20 bg-slate-200">
            <Link href='/edit/estudiante'>
                <button type="button" className="bg-gray-500 hover:bg-gray-900 text-white w-40 rounded-md p-3 min-h-20">
                    Edicion de Estudiantes
                </button>
            </Link>

        </div>
    )
}

export default Edit