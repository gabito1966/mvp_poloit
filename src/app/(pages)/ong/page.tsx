import CreateButton from "@/components/dashboard/CreateButton";
import EditButton from "@/components/dashboard/EditButton";
import Search from "@/components/dashboard/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ONGs",
    description: "Encuentra el listado de ONGs",
  };


export default function pageOng() {
    return (
        <section className="container max-w-7xl pt-20">
        <div className="w-full flex-grow p-3  md:p-12 bg-white rounded-xl shadow-xl ">
                    <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Lista de ONGs</h1>
                    <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
                        <Search placeholder="buscar ong..." />
                        <CreateButton url="/register/ong" />
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="inline-block min-w-full align-middle">
                            <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
                                <table className="hidden min-w-full text-gray-900 mt-10 lg:table">
                                    <thead className="rounded-lg text-left text-sm font-normal">
                                        <tr>
                                            <th scope="col" className="capitalize px-4 py-3 text-lg text-center" >Nombre</th>
                                        </tr>
                                    </thead>
                                    <hr />
                                    <tbody className="bg-white">
                                        <tr>
                                            <td scope="col" className="capitalize px-4 py-3 text-md text-center">
                                                ONG de prueba
                                            </td>
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex  justify-end gap-3">
                                                    <EditButton url={'/edit/ong/[id]'} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </section> 
    )
}