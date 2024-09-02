// components/Sidebar.tsx
import Image from 'next/image';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <nav className="w-64 flex flex-col min-h-screen bg-white text-black">
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
                        <Link href="/">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Alumnos</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Mentores</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Ong</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <div className="hover:bg-gray-300 px-4 py-2 rounded-full">Tecnologias</div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-auto text-white py-16">
                <Link href="/auth/login">
                    <button type="button" className="bg-blue-400 hover:bg-blue-700 text-white w-40 rounded-full p-3 justify-center">
                        LOGIN
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default Sidebar;
