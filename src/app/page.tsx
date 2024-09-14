import Image from "next/image";

export default async function Home() {
  return (
    <section className="container  text-black ">
      <div className="font-bold text-6xl">
        <h1 className="text-center">Polo It</h1>
      </div>
      <div className="py-20 flex items-center justify-center">
        <Image src='/logo-polo-it.png' alt="logo" width={375} height={150} className="object-center" />
      </div>
      <div className="container border-2 border-gray-800 rounded-lg w-full h-148">
        <h2 className="font-bold text-2xl text-center w-full underline">Organizaciones Participantes</h2>

        <div className="flex flex-wrap wrap gap-5 justify-around">
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
        </div>
      </div>
    </section>
  );
}