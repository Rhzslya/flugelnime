import React, { useState } from "react";
import "./search.css";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
export default function Search({
  showSearch,
  setShowSearch,
  navigate,
  setSearchQuery,
  searchQuery,
  handleSubmit,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    handleSubmit();
    navigate(`/search?q=${searchQuery}&page=1`);
    setSearchQuery("");
  };

  return (
    <>
      <div className={`search__bar ${showSearch}`}>
        <form onSubmit={handleSearch}>
          <div className="search__bar-box">
            <i className="uil uil-search"></i>
            <input
              type="text"
              placeholder="Cari Anime Disini"
              className="search__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i
              className="uil uil-times nav__close hide-search"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowSearch("");
              }}
            ></i>
          </div>
        </form>
      </div>

      <i
        className={`uil uil-search show ${
          showSearch === "show__search-bar" && "hide"
        }`}
        onClick={() => {
          setShowMenu(!showMenu);
          setShowSearch("show__search-bar");
        }}
      ></i>
    </>
  );
}
