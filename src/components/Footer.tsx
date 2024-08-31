import Image from "next/image"
import Link from "next/link"

function Footer() {
    return (
        <div className="w-full p-2 bg-white text-indigo-800 justify-center text-center inset-x-0 bottom-0">
            <Link href='/'>
                <div className="flex text-center p-4 justify-center self-center">
                    <Image src='/logo-polo-it.png' alt="logo" width={150} height={60} />
                    <h2 className="font-bold text-2xl text-center self-center">Squad 7 Polo It 2024</h2>
                </div>
            </Link>

            <div className="text-lg text-center flex justify-center gap-10 font-semibold">
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