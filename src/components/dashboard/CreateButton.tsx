import Link from "next/link";

function CreateButton({ url }: { url: string }) {
  const p = url.split("/")[2];

  return (
    <>
      <Link
        href={url}
        className=" text-nowrap flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        title={`crear ${p}`}
      >
        {/* <PlusIcon className="h-5 md:ml-4" /> */}
        <div className="h-5 md:ml-4  md:hidden">
          <svg className="h-5 w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
          </svg>
        </div>
        <span className="hidden md:block">Crear {p}</span>{" "}
      </Link>
    </>
  );
}

export default CreateButton;
