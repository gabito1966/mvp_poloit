import { fetchCardData } from "@/database/data";
import React from "react";

export default async function LastestInscriptos() {

    const icons = [
        {name:"estudiantes inscriptos",
          icon:`
            <svg xmlns="http://www.w3.org/2000/svg" width="56"  height="56" viewBox="0 0 24 24" fill="currentColor"><path d="M2 13H8V21H2V13ZM16 8H22V21H16V8ZM9 3H15V21H9V3ZM4 15V19H6V15H4ZM11 5V19H13V5H11ZM18 10V19H20V10H18Z"></path></svg>
          `
        },
        {
          name:"estudiantes inactivos",
          icon:`
             <svg xmlns="http://www.w3.org/2000/svg" width="56"  height="56" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path></svg>
          `
        },
        {
          name:"mentores inactivos",
          icon:`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="56" height="56" fill="currentColor"><path d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 21.5L15.0611 23.0451L15.6224 19.7725L13.2447 17.4549L16.5305 16.9775L18 14L19.4695 16.9775L22.7553 17.4549L20.3776 19.7725L20.9389 23.0451L18 21.5Z"></path></svg>
          `
        },
        {
          name:"Total de equipos",
          icon:`
            <svg xmlns="http://www.w3.org/2000/svg"  width="56" height="56" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"></path></svg>
          `,
        }
      ]

    const {
        totalEstudiantes,
        totalEstudiantesInactivos,
        totalMentoresInactivos,
        totalEquipos,
      } = await fetchCardData();

      console.log(totalEstudiantes)
      console.log(totalEstudiantesInactivos)
      console.log(totalMentoresInactivos)
      console.log(totalEquipos)

  return (
    <section className="p-5 flex flex-col-4 gap-5 justify-between text-blue-700">
      {icons.map((element, i) => {
        return (
          <div key={`${element}-${i}`} className="h-[80px] flex flex-row align-middle justify-center rounded-xl bg-blue-50 p-2 shadow-md" title={`${element.name}`}>
            <div className=" w-fit h-fit" dangerouslySetInnerHTML={{ __html: element.icon }} />
            <div className="text-black h-full flex flex-col p-2 justify-between">
            <h4 className=" text-xs font-medium text-nowrap capitalize">
              {element.name}
            </h4>
            <span className="truncate  text-left font-bold	 text-2xl">
                12
            </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function Card({
    name,
    icon,
    cant
  }: {
    name: string;
    icon: string;
    cant: number;
  }) {
    
  
    return (
        <div className="h-[80px] flex flex-row align-middle justify-center rounded-xl bg-blue-50 p-2 shadow-md" title={`${name}`}>
        <div className=" w-fit h-fit" dangerouslySetInnerHTML={{ __html: icon }} />
        <div className="text-black h-full flex flex-col p-2 justify-between">
        <h4 className=" text-xs font-medium text-nowrap capitalize">
          {name}
        </h4>
        <span className="truncate  text-left font-bold	 text-2xl">
            12
        </span>
        </div>
      </div>

    );
  }
