import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Edit Empresa",
  };

export default function page() {
    return (
        <section className="container flex flex-col max-w-5xl">
        <div className="container mx-auto p-10 h-full">
            <h1 className=" font-bold mb-4 text-center  text-2xl">Edit Empresa</h1>
        </div>
        <Link href="/empresa" className="bg-blue-400 hover:bg-blue-700 w-52 rounded-md text-xl text-center text-white p-2 my-3">Volver a Empresa</Link>
        </section>
    )
}