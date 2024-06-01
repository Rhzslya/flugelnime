import React, { useState, useEffect } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Search({
  showSearch,
  setShowSearch,
  setSearchQuery,
  searchQuery,
  setCurrentPage,
  setSearchAnimes,
}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const baseURL = "https://api.jikan.moe/v4/anime";
  const seasonUpComing = "https://api.jikan.moe/v4/seasons/upcoming";

  const handleSearch = (e) => {
    e.preventDefault();
    handleSubmit();
    navigate(`/search?q=${searchQuery}`);
    setSearchQuery("");
    setCurrentPage(1);
    setSearchAnimes([]);
  };

  const toggleSearch = () => {
    setShowMenu(!showMenu);
    setShowSearch(showSearch ? "" : "show__search-bar");
  };

  // Fetch Search Data
  const fetchSearchAnimes = async (query) => {
    try {
      const url = query ? `${baseURL}?q=${query}` : seasonUpComing;
      const response = await fetch(url);
      const data = await response.json();
      const filteredAnimes = data.data.map((anime) => ({
        title: anime.title,
        images: anime.images,
        type: anime.type,
        episodes: anime.episodes,
        score: anime.score,
        genres: anime.genres.map((genre) => genre.name).join(", "),
        synopsis: anime.synopsis,
        duration: anime.duration,
        status: anime.status,
      }));
      setSearchAnimes(filteredAnimes);
    } catch (error) {
      console.error("Failed to fetch API", error);
    }
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      fetchSearchAnimes(query);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    navigate(`/search?q=${searchQuery}&page=1`);
    setCurrentPage(1);
    setSearchAnimes([]);
    fetchSearchAnimes(searchQuery);
  };
  // Pages && Pagination

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
              onClick={toggleSearch}
            ></i>
          </div>
        </form>
      </div>
      <i
        className={`uil uil-search show ${
          showSearch === "show__search-bar" ? "hide" : ""
        }`}
        onClick={toggleSearch}
      ></i>
    </>
  );
}
