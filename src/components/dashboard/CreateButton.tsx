import Link from "next/link";
import AnimationDot from "../AnimationDot";

function CreateButton({ url, estado }: { url: string; estado?: boolean }) {
  const p = url.split("/")[2];

  return (
    <>
      <Link
        href={url}
        className="relative text-nowrap flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 gap-2"
        title={`registrar ${p}`}
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="hidden md:block">
          Registrar {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
        </span>{" "}
      </Link>
    </>
  );
}

export default CreateButton;
