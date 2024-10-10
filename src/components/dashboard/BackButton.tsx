import Link from "next/link";
import AnimationDot from "../AnimationDot";

function BackButton({ url, estado }: { url: string; estado?: boolean }) {
  const p = url.split("/")[1];

  return (
    <>
      <Link
        href={url}
        className="relative text-nowrap flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 gap-2"
        title={`volver ${p}`}
      >
        {estado && <AnimationDot />}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 md:hidden"
          width={24}
          height={24}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span className="hidden md:block">
          Volver a {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
        </span>{" "}
      </Link>
    </>
  );
}

export default BackButton;
