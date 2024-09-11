import Image from "next/image";

export default async function Home() {
  return (
    <section className="justify-center mx-auto  text-center text-black ">
      <div className="font-bold text-6xl">
        <h1>Polo It</h1>
      </div>
      <div className="py-20 flex items-center justify-center">
        <Image src='/logo-polo-it.png' alt="logo" width={375} height={150} className="object-center" />
      </div>
    </section>
  );
}