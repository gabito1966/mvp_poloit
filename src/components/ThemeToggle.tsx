'use client'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
   
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1 bg-blue-100 dark:bg-gray-300 text-black dark:hover:border-white dark:hover:border dark:text-white rounded-lg flex items-center hover:border-black border dark:border-0 justify-center"
    >
      
      {theme === "light" ? (
        <MoonIcon className="w-4 h-4 lg:w-6 lg:h-6 text-black" />
      ) : (
        <SunIcon className="w-4 h-4 lg:w-6 lg:h-6 text-slate-700" />
      )}
    </button>
  );
}