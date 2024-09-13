
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mood-angry"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" /><path d="M8 9l2 1" /><path d="M16 9l-2 1" /><path d="M14.5 16.05a3.5 3.5 0 0 0 -5 0" /></svg>
      <h2 className="text-xl font-semibold">Error 404 Pagina no Encontrada</h2>
      <p>No se pudo encontrar la pagina que estabas buscando</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-800"
      >
        Volver
      </Link>
    </main>
  );
}
