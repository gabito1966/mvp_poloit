
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className=" m-auto lg:mt-40 p-6 bg-gray-100 dark:bg-slate-500 rounded-xl shadow-md ">
      <div className='flex h-full flex-col items-center justify-center gap-2 p-3 bg-white dark:bg-slate-700 rounded-xl'>
<div className='text-blue-400 '>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 17C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17H15C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17H7ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
      </div>
      <h2 className="text-xl font-semibold dark:text-white">Error 404 Pagina no Encontrada</h2>
      <p>No se pudo encontrar la pagina que estabas buscando</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
      >
        Volver
      </Link>
        </div>
    </main>
  );
}
