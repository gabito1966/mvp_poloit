import Link from "next/link"

function Register() {
    return (
        <div className="container mx-auto justify-center flex min-h-full px-6 py-20 lg:px-8 h-screen gap-20 bg-slate-200">
            <Link href='/register/alumnos'>
                <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40 rounded-md p-3">
                    Registro de alumnos
                </button>
            </Link>
            <Link href='/register/mentores'>
                <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40 rounded-md p-3">
                    Registro de mentores
                </button>
            </Link>
        </div>
    )
}

export default Register