// components/Sidebar.tsx
import Image from 'next/image';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <nav className="w-64 flex flex-col h-screen bg-white text-black border-2 border-gray-200">
            <div>
                <ul className="space-y-4 p-4">
                    <li>
                        <Link href="/">
                            <div className="flex p-2 gap-3 bg-gray-100 hover:bg-gray-300">
                                <h1 className="align-middle text-2xl">Polo It</h1>
                                <Image src='/logo-polo-it.png' alt="logo" width={75} height={20} />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/estudiante">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Estudiantes</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/mentor">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Mentores</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/ong">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Ong</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/tecnologia">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Tecnologias</div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="p-10">
                <Link href="/register">
                    <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40  rounded-md p-4 justify-center">
                        REGISTER
                    </button>
                </Link>
            </div>
            <div className="p-10">
                <Link href="/edit">
                    <button type="button" className="bg-gray-300 hover:bg-gray-500 text-white w-40  rounded-md p-4 justify-center">
                        EDIT
                    </button>
                </Link>
            </div>
            <div className="mt-auto py-10">
                <Link href="/auth/login">
                    <button type="button" className="bg-blue-400 hover:bg-blue-700 text-white w-full rounded-lg p-3">
                        LOGIN
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default Sidebar;