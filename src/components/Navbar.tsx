
'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSun, CiDark } from "react-icons/ci";


function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; // default to dark
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (<nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-6 transition-colors duration-300">
    <Link href="/" className="hover:no-underline">
      <div className="flex items-center gap-2 select-none cursor-pointer">
        <span
          className={`bg-clip-text text-transparent text-3xl font-extrabold tracking-tight drop-shadow-sm ${isDarkMode
            ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400"
            : "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
            }`}
        >
          SKILL
        </span>
        <span
          className={`text-3xl font-extrabold tracking-tight drop-shadow-sm ${isDarkMode ? "text-white" : "text-gray-900"
            }`}
        >
          Scope
        </span>
        <span className="text-lg font-bold text-pink-500 align-super">.</span>
      </div>
    </Link>
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md border transition-all duration-200 
        ${isDarkMode
          ? "bg-gray-800 border-gray-900 hover:bg-gray-900"
          : "bg-yellow-300 border-yellow-400 text-gray-900 hover:bg-yellow-400"
        }`}
    >
      <span className="flex items-center justify-center w-6 h-6">
        {isDarkMode ? <CiSun size={22} /> : <CiDark size={22} />}
      </span>
      <span className="hidden sm:inline font-semibold text-sm">
        {isDarkMode ? "Light mode" : "Dark mode"}
      </span>
    </button>

  </nav>);
}

export default Navbar;