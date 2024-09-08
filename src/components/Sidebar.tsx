// components/Sidebar.tsx
import { roboto } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import LinkSideBar from "./LinkSideBar";
import { signOut, singIn } from "@/lib/server/session";
import clsx from "clsx";

const Sidebar: React.FC = () => {
  const links = [
    {
      url: "/",
      name: "inicio",
      icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-home"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          </svg>`,
    },
    {
      url: "/estudiante",
      name: "estudiante",
      icon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-school"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>`,
    },
    {
      url: "/mentor",
      name: "mentores",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 16V19H20V16H4ZM4 14H20V7H4V14ZM9 3V5H15V3H9ZM11 11H13V13H11V11Z"></path></svg>`,
    },
    // {
    //     url:"/ong",
    //     name:"ong",
    //     icon: `<svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="20"
    //     height="20"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     className="icon icon-tabler icons-tabler-outline icon-tabler-building-community"
    //   >
    //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //     <path d="M15 21h-13a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6l5 -5h4l5 5h6a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-13" />
    //   </svg>`
    // },
    // {
    //     url:"/tecnologia",
    //     name:"tecnologia",
    //     icon: `<svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="20"
    //     height="20"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     className="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop"
    //   >
    //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //     <rect x="3" y="5" width="18" height="14" rx="2" />
    //     <path d="M3 17h18" />
    //   </svg>`

    // },
    {
      url: "/grupo",
      name: "grupos",
      icon: `  <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
          `,
    },
  ];

  const login = {
    url: "/auth/login",
    name: "iniciar sesión",
    icon: `     <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-login"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M21 12h-13l3 -3" />
            <path d="M11 15l-3 -3" />
          </svg>`,
  };

  const session = singIn();

  
  return (
    <nav
      className={`${roboto.className} lg:w-64 max-lg:w-12 max-lg:px-0 fixed  flex flex-col h-screen bg-white text-black border-2 border-gray-200 px-2`}
    >
      <div>
        <ul className="space-y-4 p-2">
          <li className="max-lg:hidden">
            <Link href="/">
              <div className="flex p-2 gap-3  hover:bg-gray-100 rounded-sm">
                {/* <h1 className="align-middle text-2xl">Polo It</h1> */}
                <Image
                  src="/logo-polo-it.png"
                  alt="logo"
                  width={75}
                  height={20}
                />
              </div>
            </Link>
          </li>
          {links.map((link, i) => (
            <li key={`${link.name}${i}`}>
              <LinkSideBar data={link} />
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx("flex flex-row gap-1 items-center mt-auto py-4 border-t-2 gray-300 max-lg:px-1 max-lg:py-1 hover:bg-gray-100 rounded-sm capitalize ")}>
        <form
          className={clsx(
            " items-center px-4 py-2 max-lg:px-1 max-lg:py-1 hover:bg-gray-100 rounded-sm ",
            {
              hidden: !session,
            }
          )}
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex flex-row gap-1 " type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-login-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
              <path d="M3 12h13l-3 -3" />
              <path d="M13 15l3 -3" />
            </svg>
            <span className=" md:block hidden w-full capitalize text-left  ">
              cerrar sesión
            </span>
          </button>
        </form>
        <div className={clsx("", { hidden: session })}>
          <LinkSideBar data={login} />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
