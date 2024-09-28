'use client';

import clsx from "clsx";
import { AnimatedNumber } from './AnimatedNumber';

interface CardProps {
  name: string;
  icon: string;
  cant: number;
  line?: boolean;
}

export function Card({ name, icon, cant, line }: CardProps) {
  return (
    <div
      className="h-[100px] flex shadow-blue-50 flex-row items-center justify-center justify-items-center rounded-xl bg-gray-50 p-5 shadow-md text-blue-400"
      title={`${name}`}
    >
      <div className="relative w-fit h-fit bg-blue-50 rounded-lg p-1">
        <div
          className="relative z-10"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <div className={clsx("absolute h-1 w-full inset-0 bg-blue-400 transform rounded-md rotate-45 top-1/2",
          {
            "hidden": !line
          }
        )}></div>
      </div>
      <div className="text-black h-full flex flex-col p-1 justify-center">
        <h4 className="text-xs font-medium ml-4 text-nowrap capitalize">{name}</h4>
        <AnimatedNumber value={cant} className="truncate text-left font-bold text-2xl ml-4" />
      </div>
    </div>
  );
}