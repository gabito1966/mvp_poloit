import Image from "next/image"
import Link from "next/link"
import LinkFooter from "./LinkFooter"

function Footer() {

    const linksFooter = [
        {
            nombre: "Nicolas Espindola",
            link: "https://www.linkedin.com/in/javier-espindola/"
        },
        {
            nombre: "Elizabeth Rabi",
            link: "https://www.linkedin.com/in/elizabeth-rabinad-4b6131167/"
        },
        {
            nombre: "Sandro Borga",
            link: "https://www.linkedin.com/in/sandro-borga-065936246/"
        },
        {
            nombre: "Gabriel García",
            link: "https://www.linkedin.com/in/gabriel-garcia-developer/"
        },
    ]


    return (
        <footer className="w-full justify-between text-center px-3  py-1 max-lg:pl-12" >
            <div className="p-2 flex justify-between  max-lg:flex-col max-lg:p-0 ">
                <Link href='/' className="lg:pl-60 max-lg:ml-10 max-sm:hidden">
                    <div className="flex text-center  justify-center self-center">
                        <Image src='/logo-polo-it.png' alt="logo" width={150} height={60} />
                        {/* <h2 className="font-bold text-2xl text-center self-center">Squad 7 Polo It 2024</h2> */}
                    </div>
                </Link>
                <div className="container  text-center mx-auto flex justify-end gap-10 max-lg:flex-wrap max-lg:items-center max-lg:justify-center max-sm:gap-2 max-sm:py-3">
                    {/* <p className="bg-blue-400  rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2">
                        <Link href='https://www.linkedin.com/in/javier-espindola/' target="_blank">
                            Nicolas Espíndola
                        </Link>
                    </p>
                    <p className="bg-blue-400 rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2">
                        <Link href='https://www.linkedin.com/in/elizabeth-rabinad-4b6131167/' target="_blank">
                            Elizabeth Rabi
                        </Link>
                    </p>
                    <p className="bg-blue-400 rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2">
                        <Link href='https://www.linkedin.com/in/sandro-borga-065936246/' target="_blank">
                            Sandro Borga
                        </Link>
                    </p>
                    <p className="bg-blue-400 rounded-lg shadow-sm w-60 hover:bg-blue-700 p-2 ">
                        <Link href="https://www.linkedin.com/in/gabriel-garcia-developer/" target="_blank">
                            Gabriel García
                        </Link>
                    </p> */}

                        {
                            linksFooter.map((e,i)=>{return (<LinkFooter key={`${e.nombre}${i}`} dataFooter={e}/>)})
                        }

                </div>
            </div>
        </footer>
    )
}

export default Footer