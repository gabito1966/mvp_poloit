import Carousel from "@/components/Carousel";

export default async function Partners() {


    const images = [
        "/logo-empujar.png",
        "/logo-fundacion-integrar.png",
        "/logo-forge.png",
        "/logo-silvertech.png",
        "/logo-gestion-y-desarrollo.png",
        "/logo-codo-a-codo.png",
      ];
      const imagesEmpresas = [
          "/logo-d3.png",
          "/logo-globant.png",
          "/logo-hansen.png",
          "/logo-epidata.png",
          "/logo-prisma.png",
          "/logo-gire.png",
          "/logo-softtek.png",
          "/logo-pigmalion.png",
          "/logo-mindhub.png",
      ];



  return (
    <main className="container max-w-3xl mt-10 ">
        <section className=" mt-20 p-4 rounded-xl mx-auto w-full bg-white shadow-xl items-center ">
            <h2 className="font-bold text-xl lg:text-3xl x-auto my-10  text-center w-full ">
              Organizaciones Participantes
            </h2>
            <div className="h-auto w-full  flex items-center">
              <Carousel images={images} />
            </div>
        </section>
        <section className=" mt-20 p-4 rounded-xl mx-auto w-full bg-white shadow-xl items-center ">
            <h2 className="font-bold text-xl lg:text-3xl mx-auto my-10 text-center w-full ">
              Empresas Participantes
            </h2>
            <div className="h-auto w-full  flex items-center">
              <Carousel images={imagesEmpresas} />
            </div>
        </section>

    </main>
    );
  
}

