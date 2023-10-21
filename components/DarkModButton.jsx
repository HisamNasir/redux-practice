"use client";
import React from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button  className="w-full gap-2   border-opacity-20   transition-all duration-100  justify-center p-2 flex bg-black bg-opacity-10 hover:bg-opacity-20  text-sm items-center md:text-sm rounded-lg"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}

    >
      <FaSun /> / <FaMoon />
    </button>
  );
};

export default DarkModButton;