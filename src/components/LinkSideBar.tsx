"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function LinkSideBar({
  data,
}: {
  data: { url: string; name: string; icon: string };
}) {
    const pathname = usePathname();

  return (
    <>
      <Link
        href={data.url}
        className={clsx("flex flex-row gap-1 items-center px-4 py-2 max-lg:px-1 max-lg:py-1 hover:bg-blue-50 rounded-sm capitalize ",{
          "bg-blue-50": data.url === pathname,
        })}
        title={`${data.name}`}
      >
        <div dangerouslySetInnerHTML={{ __html: data.icon }} />
        <span className="lg:block hidden">{data.name}</span>
      </Link>
    </>
  );
}
