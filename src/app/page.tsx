import Image from "next/image";

export default async function Home() {
  return (
    <div className="justify-center mx-auto  p-20 text-center bg-blue-500 h-screen">
      <div className="font-bold text-6xl">
        <h1>Polo It</h1>
      </div>
      <div className="p-20 flex items-center justify-center">
        <Image src='/logo-polo-it.png' alt="logo" width={375} height={150} className="object-center" />
      </div>
    </div>
  );
}