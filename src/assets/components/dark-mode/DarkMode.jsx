import React, { useState, useEffect } from "react";
import "./darkmode.css";
import Sun from "./Sun.svg?react";
import Moon from "./Moon.svg?react";

export default function DarkMode({
  Toggle,
  showMenu,
  display,
  setDisplay,
  showSearch,
  setShowSearch,
}) {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleDarkMode}
      />
      <label
        className={`dark_mode_label ${display} ${
          showSearch === "show__search-bar" && "hide"
        }`}
        htmlFor="darkmode-toggle"
      >
        <Moon />
        <Sun />
      </label>
    </>
  );
}
