import CreateButton from "@/components/dashboard/CreateButton"
import EditButton from "@/components/dashboard/EditButton"
import Search from "@/components/dashboard/Search"

export default function TableEmpresa() {

    return (
        <div className="container max-w-6xl flex-grow p-6  md:p-12 ">
            <h1 className="sm:text-4xl font-bold mb-8 text-center lg:text-left  text-2xl">Lista de Empresas</h1>
            <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
                <Search placeholder="buscar empresa..." />
                <CreateButton url="/register/empresas" />
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
                                        Empresa de prueba
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex  justify-end gap-3">
                                            <EditButton url={'/edit/empresa/[id]'} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
