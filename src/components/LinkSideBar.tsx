"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function LinkSideBar({
  data,
}: {
  data: { url: string; name: string; icon1: string , icon2:string};
}) {
    const pathname = usePathname();
    
  return (
    <>
      <Link
        href={data.url}
        className={clsx("flex flex-row gap-1 items-center px-4 py-2 max-lg:px-1 max-lg:py-1 dark:hover:text-black  hover:bg-blue-50 rounded-lg capitalize transition dark:duration-0",{
          "bg-blue-50 dark:bg-slate-300": data.url === pathname,
        })}
        title={`${data.name}`}
      >
        <div className={
          clsx({
            "text-blue-600": data.url === pathname,
          })
        } dangerouslySetInnerHTML={{ __html: data.url === pathname?  data.icon2:data.icon1 } } />
        <span className={
          clsx("lg:block hidden  dark:duration-0",
            {"dark:text-black dark:duration-0":data.url === pathname}
          )
        }>{data.name}</span>
      </Link>
    </>
  );
}
