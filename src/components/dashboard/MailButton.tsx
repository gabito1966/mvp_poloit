"use client";

import { revalidateFuntion } from "@/lib/server/serverCache";
import { useRouter } from "next/navigation";

export default function MailButton() {
  const router = useRouter();

  const handleClick = () => {
    revalidateFuntion("/mensaje");
    router.push("/mensaje");
  };

  return (
    <>
      <button
        className=" hover:text-blue-600"
        title="Enviar Email"
        onClick={handleClick}
      >
        <div className="h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"></path>
          </svg>
        </div>
      </button>
    </>
  );
}
