import Link from "next/link";
import AnimationDot from "../AnimationDot";
import { PlusIcon } from "@heroicons/react/24/solid";
import { revalidatePath } from "next/cache";

function CreateButton({ url, estado }: { url: string; estado?: boolean }) {
  const p = url.split("/")[2];
  revalidatePath(url);

  return (
    <>
      <Link
        href={url}
        className="relative text-nowrap flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 gap-2"
        title={`registrar ${p}`}
      >
        {estado && <AnimationDot />}
        <PlusIcon className="w-6 h-6 md:hidden" />
        <span className="hidden md:block">
          Registrar {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
        </span>{" "}
      </Link>
    </>
  );
}

export default CreateButton;
