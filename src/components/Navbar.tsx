import Image from "next/image"
import Link from "next/link"

function Navbar() {
    return (
        <nav className="bg-slate-900 flex justify-between w-50 p-6">

            <Link href="/">
                <div className="flex p-4 gap-5">
                    <h1 className="align-middle text-3xl">Polo It</h1>
                    <Image src='/logo-polo-it.png' alt="logo" width={100} height={40} />
                </div>

            </Link>
            <div>
                <Link href="/auth/login">
                    <button type="button" className="bg-red-400 hover:bg-red-900 text-white w-40 rounded-md p-3">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar