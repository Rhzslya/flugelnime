import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Search({
  showSearch,
  setShowSearch,
  setSearchQuery,
  searchQuery,
  setCurrentPageSearch,
  setSearchAnimes,
  setLoadingSearch,
  showMenuNav,
  setShowMenuNav,
}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const baseURL = "https://api.jikan.moe/v4/anime";
  const seasonUpComing = "https://api.jikan.moe/v4/seasons/upcoming";
  const [showSearchBar, setShowSearchBar] = useState(true);
  const handleSearch = (e) => {
    e.preventDefault();
    handleSubmit();
    navigate(`/flugelnime/search?q=${searchQuery}`);
    setSearchQuery("");
    setCurrentPageSearch(1);
    setSearchAnimes([]);
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
        episodes: anime.episodes === null ? "-" : anime.episodes,
        score: anime.score,
        genres: anime.genres.map((genre) => genre.name).join(", "),
        synopsis: anime.synopsis,
        duration: anime.duration,
        status: anime.status,
        mal_id: anime.mal_id,
        day: anime.broadcast.day,
      }));
      setSearchAnimes(filteredAnimes);
    } catch (error) {
      console.error("Failed to fetch API", error);
    } finally {
      setLoadingSearch(false);
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
    navigate(`/flugelnime/search?q=${searchQuery}&page=1`);
    setCurrentPageSearch(1);
    setSearchAnimes([]);
    fetchSearchAnimes(searchQuery);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     // window.innerWidth >= 430 ? setShowMenu(true) : setShowMenu(false);
  //     if (window.innerWidth >= 430) {
  //       setShowMenu(true);
  //       setShowSearchBar(true);
  //     } else {
  //       setShowMenu(false);
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  // Pages && Pagination
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 430) {
        setShowSearchBar(!showMenuNav);
      } else {
        setShowSearchBar(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenuNav]);

  return (
    <>
      {showSearchBar && (
        <div className={`search__bar ${showSearch}`}>
          <form onSubmit={handleSearch}>
            <div className="search__bar-box p-1 justify-end items-center flex absolute dark:bg-slate-800 bg-[#c5cbda]  min-[430px]:bg-transparent top-[48px] w-full z-10 left-0 min-[430px]:top-0 min-[430px]:relative">
              <input
                type="text"
                placeholder="Cari Anime Disini"
                className="search__input h-[20px] rounded-sm min-[430px]:h-[30px] w-full min-[430px]:block  min-[430px]:w-[140px] min-[460px]:w-auto min-[430px]:rounded bg-neutral-100 px-2 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowMenu(true)}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
