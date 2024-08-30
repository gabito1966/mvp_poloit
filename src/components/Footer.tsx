import Link from "next/link"

function Footer() {
    return (
        <div className="w-full p-2 bg-white text-indigo-800 justify-center inset-x-0 bottom-0">
            <h2 className="font-bold text-xl text-center">
                Squad 7 Polo-It- 2024
            </h2>
            <div className="text-lg text-center flex justify-center gap-8 font-semibold">
                <p className="bg-gray-400 hover:bg-gray-600 text-white p-1 rounded-md">
                    <Link href='/' target="_blank">
                        Nicolas Espíndola
                    </Link>
                </p>
                <p className="bg-gray-400 hover:bg-gray-600 text-white p-1 rounded-md">
                    <Link href='/' target="_blank">
                        Elizabeth Rabi
                    </Link>
                </p>
                <p className="bg-gray-400 hover:bg-gray-600 text-white p-1 rounded-md">
                    <Link href='/' target="_blank">
                        Sandro Borga
                    </Link>
                </p>
                <p className="bg-gray-400 hover:bg-gray-600 text-white p-1 rounded-md">
                    <Link href="https://www.linkedin.com/in/gabriel-garcia-developer/" target="_blank">
                        Gabriel García
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Footer