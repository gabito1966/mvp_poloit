import Link from "next/link";

export default function LinkFooter({
  dataFooter,
}: {
  dataFooter: { nombre: string; link: string };
}) {
  return (
    <Link
      href={dataFooter.link}
      className="flex text-center w-fit justify-center items-center text-sm max-sm:text-xs link__footer"
      title={`linedin ${dataFooter.nombre}`}
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M8 11l0 5" />
        <path d="M8 8l0 .01" />
        <path d="M12 16l0 -5" />
        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
      </svg>
      <p>{dataFooter.nombre}</p>
    </Link>
  );
}
