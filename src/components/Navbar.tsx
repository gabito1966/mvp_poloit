import Image from "next/image"
import Link from "next/link"

function Navbar() {
    return (
        <nav className="bg-white flex content-center justify-between w-50 p-5">
            <Link href="/">
                <div className="flex p-4 gap-3 bg-gray-300 hover:bg-gray-500">
                    <h1 className="align-middle text-3xl">Polo It</h1>
                    <Image src='/logo-polo-it.png' alt="logo" width={125} height={50} />
                </div>
            </Link>
            <div className="self-center">
                <Link href="/register">
                    <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40  rounded-md p-4 justify-center">
                        REGISTER
                    </button>
                </Link>
            </div>
            <div className="self-center">
                <Link href="/edit">
                    <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40  rounded-md p-4 justify-center">
                        EDIT
                    </button>
                </Link>
            </div>
            <div className="self-center">
                <Link href="/auth/login">
                    <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40 rounded-md p-4 justify-center">
                        LOGIN
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar