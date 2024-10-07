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
      className="p-1 bg-gray-800 dark:bg-gray-200 text-black dark:text-white rounded-lg flex items-center justify-center"
    >
      
      {theme === "light" ? (
        <MoonIcon className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-100" />
      ) : (
        <SunIcon className="w-4 h-4 lg:w-6 lg:h-6 text-orange-500" />
      )}
    </button>
  );
}
