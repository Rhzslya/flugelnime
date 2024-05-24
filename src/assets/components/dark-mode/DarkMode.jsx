import React, { useState } from "react";
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
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleMode = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <>
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleMode}
      />
      <label
        className={`dark_mode_label ${display} ${
          showSearch === "show__search-bar" && "hide"
        }`}
        htmlFor="darkmode-toggle"
      >
        <Sun />
        <Moon />
      </label>
    </>
  );
}
