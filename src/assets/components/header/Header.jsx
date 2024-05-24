import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { sectionsID } from "./SectionsID";

export default function Header({ children, showSearch, setShowSearch }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <nav className="nav container-grid">
        <a
          href=""
          className={`nav__logo ${showSearch === "show__search-bar" && "hide"}`}
        >
          Flugelnime
        </a>

        <div
          className={`nav__menu ${showSearch === "show__search-bar" && "hide"}`}
        >
          <ul className={!showMenu ? "nav__list show__menu" : "nav__list"}>
            {sectionsID.map((item, index) => (
              <li className="nav__item" key={index}>
                <Link
                  to={
                    item === "home"
                      ? ""
                      : `/${item.replace(/\s+/g, "-").toLowerCase()}`
                  }
                  className="nav__link"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          {showMenu ? (
            <i
              className="uil uil-times nav__close"
              onClick={() => setShowMenu(!showMenu)}
            ></i>
          ) : (
            <div className="nav__toggle" onClick={() => setShowMenu(!showMenu)}>
              <i className="uil uil-bars"></i>
            </div>
          )}
        </div>

        {children}
      </nav>
    </header>
  );
}
