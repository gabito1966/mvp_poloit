import Image from "next/image"
import Link from "next/link"

function Footer() {
    return (
        <footer className="w-full justify-between text-center inset-x-0 bottom-0">
            <div className="p-2 bg-white text-black ">
                <Link href='/'>
                    <div className="flex text-center p-4 justify-center self-center">
                        <Image src='/logo-polo-it.png' alt="logo" width={150} height={60} />
                        <h2 className="font-bold text-2xl text-center self-center">Squad 7 Polo It 2024</h2>
                    </div>
                </Link>
                <div className="container text-white text-lg text-center mx-auto flex justify-center gap-20 font-semibold">
                    <p className="bg-blue-400  rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2">
                        <Link href='https://www.linkedin.com/in/javier-espindola/' target="_blank">
                            Nicolas Espíndola
                        </Link>
                    </p>
                    <p className="bg-blue-400 rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2">
                        <Link href='https://www.linkedin.com/in/elizabeth-rabinad-4b6131167' target="_blank">
                            Elizabeth Rabi
                        </Link>
                    </p>
                    <p className="bg-blue-400 rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2">
                        <Link href='/' target="_blank">
                            Sandro Borga
                        </Link>
                    </p>
                    <p className="bg-blue-400 rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2 ">
                        <Link href="https://www.linkedin.com/in/gabriel-garcia-developer/" target="_blank">
                            Gabriel García
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer