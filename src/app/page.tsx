import Carousel from "@/components/Carousel";
import Link from "next/link";


export default async function Home() {
  const images = [
    '/logo-empujar.png',
    '/logo-fundacion-integrar.png',
    '/logo-forge.png',
    '/logo-silvertech.png',
    '/logo-gestion-y-desarrollo.png',
    '/logo-codo-a-codo.png'
  ];
  return (
    <main className="container max-w-7xl text-black ">
      <div className="pt-5">
        <h1 className="text-3xl underline">Home</h1>
      </div>
      <section className="flex flex-col-4 md:flex-cols-2 gap-5 mt-10 mx-auto justify-between text-blue-700">
        <div className="w-full sm:w-60 h-32 rounded-lg border-2 border-slate-600  p-2 ">
          <h4 className="m-2 text-sm text-center text-black">
            Alumnos inscriptos
          </h4>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" fill="currentColor"><path d="M9 18H4V10H9V18ZM15 18H10V6H15V18ZM21 18H16V2H21V18ZM22 22H3V20H22V22Z"></path></svg>
        </div>
        <div className="w-60 h-32 rounded-lg border-2 border-slate-600 p-2">
          <h4 className="m-2 text-sm text-center text-black">
            Alumnos inactivos
          </h4>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="56"  height="56"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.18 8.189a4.01 4.01 0 0 0 2.616 2.627m3.507 -.545a4 4 0 1 0 -5.59 -5.552" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4c.412 0 .81 .062 1.183 .178m2.633 2.618c.12 .38 .184 .785 .184 1.204v2" /><path d="M3 3l18 18" /></svg>
        </div>
        <div className="w-60 h-32 rounded-lg border-2 border-slate-600 space-x-5 p-2">
          <h4 className="m-2 text-sm text-center text-black">
          Mentores Inactivos
          </h4>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" fill="currentColor"><path d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7ZM12 1C8.68629 1 6 3.68629 6 7C6 10.3137 8.68629 13 12 13C15.3137 13 18 10.3137 18 7C18 3.68629 15.3137 1 12 1ZM15 18C15 16.3431 16.3431 15 18 15C18.4631 15 18.9018 15.105 19.2934 15.2924L15.2924 19.2934C15.105 18.9018 15 18.4631 15 18ZM16.7066 20.7076L20.7076 16.7066C20.895 17.0982 21 17.5369 21 18C21 19.6569 19.6569 21 18 21C17.5369 21 17.0982 20.895 16.7066 20.7076ZM18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13ZM12 14C12.0843 14 12.1683 14.0013 12.252 14.0039C11.8236 14.6189 11.4914 15.3059 11.2772 16.0431C8.30431 16.4 6 18.9309 6 22H4C4 17.5817 7.58172 14 12 14Z"></path></svg>
        </div>
        <div className="w-60 h-32 rounded-lg border-2 border-slate-600 space-x-5 p-2">
          <h4 className="m-2 text-sm text-center text-black">
          Total de equipos
          </h4>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" fill="currentColor"><path d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"></path></svg>
        </div>
      </section>
      <section className="grid grid-cols-2 mt-5 gap-5">
        <div className="w-full border-2 border-slate-600 rounded-lg min-h-64">
          <h2>Grafico de alumnos</h2>
        </div>
        <div className="w-full border-2 border-slate-600 rounded-lg min-h-64">
          <h2>Ultimos inscriptos</h2>
        </div>
      </section>
      <section>
      <div className="container mt-5 border-2 border-gray-800 rounded-lg max-w-4xl items-center mx-auto">
        <h2 className="font-bold text-2xl text-center w-full underline">Organizaciones Participantes</h2>
        <div className="h-auto w-full my-3 flex items-center">
          <Carousel images={images} />
        </div>
      </div>
      </section>
      <section className="grid grid-cols-2 mt-5 gap-5">
        <div className="h-48  m-5 border-2 border-slate-600 rounded-lg">
          <h3 className="font-semibold text-xl mx-6 my-3">Notificaciones</h3>
          <div className="flex p-1 ml-5">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
          <p className="text-md ml-1">Estudiantes nuevos</p>
          </div>
          <div className="flex p-1 ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
            <p className="text-md ml-1">Mentores nuevos</p>
          </div>
          <div className="flex p-1 ml-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
          <p className="text-md ml-1">Estudiantes se dieron de baja</p>
          </div>
          <div className="flex p-1 ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
            <p className="text-md ml-1">Mentores se dieron de baja</p>
          </div>
        </div>
        <div className="h-48 border-2 m-5 border-slate-600 rounded-lg">
            <h2 className="font-bold text-center text-xl mx-6 my-3">Acciones Rápidas</h2>
          <div className="p-2 flex flex-col justify-center">
            <Link href='/register/estudiantes' className="bg-blue-400 hover:bg-blue-700 p-2 text-white rounded-full text-center min-w-[180px] mx-auto">Registrar Estudiante</Link>
            <Link href='/register/mentores' className="bg-blue-400 hover:bg-blue-700 p-2 text-white rounded-full text-center min-w-[180px] mx-auto mt-3">Registrar Mentor</Link>
          </div>
        </div>
      </section>
    </main>
  );
}