"use client";

import { revalidateFuntion } from "@/lib/server/serverCache";
import { generatePagination } from "@/lib/utils";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
          router={router}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
                router={router}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          router ={router}
        />
      </div>
    </>
  );
}

function handleRedirection(url:string, router:any){
  revalidateFuntion(url);
  router.push(url);
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  router
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
  router: any;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-400 border-blue-400 text-white hover:bg-blue-700 hover:cursor-pointer":
        isActive,
      "hover:bg-gray-100 bg-white dark:bg-gray-600  dark:hover:bg-white dark:hover:text-black": !isActive && position !== "middle",
      "text-gray-300 bg-white dark:bg-gray-600": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={()=>handleRedirection(href, router)} className={className}>
      {page}
    </button>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  router
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
  router:any
}) {

  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border bg-white dark:hover:bg-white",
    {
      "pointer-events-none text-gray-300 dark:bg-gray-600 dark:text-gray-400": isDisabled,
      "hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-200 dark:hover:text-black": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <div className="rounded-md  hover:bg-gray-100  w-5 h-fit">
        <svg className="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
        </svg>
      </div>
    ) : (
      <div className="rounded-md  hover:bg-gray-100 w-5 h-fit ">
        <svg className="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </svg>
      </div>
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button onClick={()=>handleRedirection(href, router)} className={className} >
      {icon}
    </button>
  );
}