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
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path></svg>`,
    },
    {
      url: "/estudiante",
      name: "estudiantes",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path></svg>`,
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
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path></svg>
          `,
    },
  ];

  const login = {
    url: "/auth/login",
    name: "iniciar sesión",
    icon: ` <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"></path></svg>`,
  };

  const session = singIn();

  return (
    <nav
      className={`${roboto.className} lg:w-64 max-lg:w-12 max-lg:px-0 fixed  flex flex-col h-full bg-white text-black border-2 border-gray-200 px-2`}
    >
      <div>
        <ul className="space-y-4 p-2">
          <li className="max-lg:hidden w-fit m-auto">
            <Link href="/">
              <div className="flex gap-3 justify-center hover:bg-blue-50 rounded-sm">
                {/* <h1 className="align-middle text-2xl">Polo It</h1> */}
                <Image
                  src="/logo-polo-it.png"
                  alt="logo"
                  width={100}
                  height={40}
                />
              </div>
            </Link>
          </li>
          <li className="lg:hidden">
            <Link href="/">
              <div className="flex justify-center hover:bg-gray-100 rounded-sm">
                {/* <h1 className="align-middle text-2xl">Polo It</h1> */}
                <Image
                  src="/polo-logo-mobile.png"
                  alt="logo"
                  width={20}
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

      <div
        className={clsx(
          "flex flex-row gap-1 items-center mt-auto py-4 max-sm:py-1 border-t-2 gray-300 max-lg:px-1   rounded-sm capitalize "
        )}
      >
        <form
          className={clsx(
            " items-center  hover:bg-blue-50 rounded-sm w-full",
            {
              hidden: !session,
            }
          )}
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex flex-row gap-1 w-full px-4 py-2 max-lg:px-1 max-lg:py-1 " type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
            </svg>
            <span className=" lg:block hidden w-full capitalize text-left  ">
              cerrar sesión
            </span>
          </button>
        </form>
        <div className={clsx("w-full", { hidden: session })}>
          <LinkSideBar data={login} />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
