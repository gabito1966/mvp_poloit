import Carousel from "@/components/Carousel";
import Image from "next/image";


export default async function Home() {
  const images = [
    '/empujar.png',
    '/fundacion-integrar.png',
    '/forge.png',
    '/silvertech.png',
    '/gestion-y-desarrollo.png',
    '/codo-a-codo.png'
  ];
  return (
    <section className="container w-full  text-black ">
      <div className="font-bold text-4xl pt-5">
        <h1>Home</h1>
      </div>
      <div className="py-20 flex items-center justify-center">
        <Image src='/logo-polo-it.png' alt="logo" width={375} height={150} className="object-center" />
      </div>
      <div className="container border-2 border-gray-800 rounded-lg w-1/2 items-center ml-64">
        <h2 className="font-bold text-2xl text-center w-full underline">Organizaciones Participantes</h2>
        <div className="h-auto w-full my-3 flex items-center">
          <Carousel images={images} />
        </div>

        {/*<div className="flex flex-wrap wrap gap-5 justify-around">
          <div className="py-20 flex ">
            <Image src='/logo-integrar.png' alt="logo integrar" width={150} height={50} className="object-center" />
          </div>
          <div className="py-20 flex  ">
            <Image src='/logo-empujar.png' alt="logo empujar" width={150} height={50} className="object-center" />
          </div>
          <div className="py-20 flex  ">
            <Image src='/logo-codo-a-codo.png' alt="logo codo a codo" width={150} height={50} className="object-center" />
          </div>
          <div className="py-20 flex  ">
            <Image src='/logo-silvertech.png' alt="logo silvertech" width={150} height={50} className="object-center" />
          </div>
          <div className="py-20 flex  ">
            <Image src='/logo-fundacion-gestion-y-desarrollo.png' alt="logo Fundacion gestion y desarrollo" width={150} height={50} className="object-center" />
          </div>
          <div className="py-20 flex  ">
            <Image src='/logo-forge.png' alt="logo Forge" width={150} height={50} className="object-center" />
          </div>
        </div>*/}
      </div>
    </section>
  );
}