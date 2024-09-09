"use client"

import { revalidateFuntion } from "@/lib/server/serverCache";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

function EditButton({ url }: { url: string }) {

  const router = useRouter();

  const handleRedirect = () => {

    revalidateFuntion(url);
    router.push(url);
  }

  return (
    <button onClick={handleRedirect} className="h-fit" title="Editar">
      <div className="rounded-md  hover:bg-gray-100 w-5 h-fit">
        <svg className="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
          </svg>
        </svg>
      </div>
    </button>
  );
}

export default EditButton;
