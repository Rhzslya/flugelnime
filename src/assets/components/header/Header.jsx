import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sectionsID } from "./SectionsID";

export default function Header({
  children,
  showSearch,
  setShowSearch,
  currentPage,
  setCurrentPage,
  showMenu,
  setShowMenu,
}) {
  const navigate = useNavigate();
  const handleHomeClick = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    navigate("/");
  };

  const capitalizeFirst = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <header className="w-full h-[48px] left-0 z-50 fixed flex justify-center border-b-[1px] bg-[#c5cbda] opacity-90 backdrop-blur-xl ">
      <nav className="flex w-full px-2 min-[480px]:px-8 lg:w-[85%] h-full lg:px-0 justify-between items-center gap-1">
        <div className="flex gap-6 ">
          <div className="flex items-center font-bold m lg:ml-0 order-1 lg:order-none">
            <NavLink to={"/"}>Flugelnime</NavLink>
          </div>

          <div
            className={`nav__menu ${
              showSearch === "show__search-bar" && "hide"
            } `}
          >
            <ul
              className={`${
                !showMenu ? "hidden lg:flex" : "flex"
              } gap-2  lg:gap-4 flex-col lg:flex-row absolute left-0 top-[48px] px-2 min-[480px]:px-8 py-2 lg:px-0 lg:py-0 lg:top-0 bg-[#c5cbda] opacity-90 backdrop-blur-x w-full lg:relative `}
            >
              {sectionsID.map((item, index) => (
                <li
                  className={`nav__item font-bold hover:text-pink-300 duration-300`}
                  key={index}
                >
                  <NavLink
                    to={
                      item === "home"
                        ? "/"
                        : `/${item.replace(/\s+/g, "-").toLowerCase()}`
                    }
                    className={({ isActive }) =>
                      isActive
                        ? "nav__link text-pink-300"
                        : "nav__link hover:text-pink-300"
                    }
                    onClick={item === "home" ? handleHomeClick : undefined}
                  >
                    {capitalizeFirst(item)}
                  </NavLink>
                </li>
              ))}
            </ul>
            {showMenu ? (
              <div className={`block lg:hidden`}>
                <i
                  className="uil uil-times text-xl"
                  onClick={() => setShowMenu(!showMenu)}
                ></i>
              </div>
            ) : (
              <div
                className={`block lg:hidden`}
                onClick={() => setShowMenu(!showMenu)}
              >
                <i className="uil uil-bars text-xl"></i>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">{children}</div>
      </nav>
    </header>
  );
}
