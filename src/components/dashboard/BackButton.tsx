import Link from "next/link";
import AnimationDot from "../AnimationDot";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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
        <ArrowLeftIcon className="md:hidden w-5 h-5"/>
        <span className="hidden md:block">
          Volver a {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
        </span>{" "}
      </Link>
    </>
  );
}

export default BackButton;
