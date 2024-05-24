import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Router,
  Routes,
  Route,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./assets/components/header/Header";
import Search from "./assets/components/home/search/Search";
import DarkMode from "./assets/components/dark-mode/DarkMode";
import Home from "./assets/components/home/Home";
import HomeAnimeList from "./assets/components/home/HomeAnimeList";

import AnimeList from "./assets/components/router/AnimeList";
import Genres from "./assets/components/router/Genres";
import GenresAnime from "./assets/components/genres-component/GenresAnime";
import LiveAction from "./assets/components/router/LiveAction";
import Movies from "./assets/components/router/Movies";
import AnimeMovies from "./assets/components/anime-movies/AnimeMovies";
import Ongoing from "./assets/components/router/Ongoing";
import SearchResult from "./assets/components/home/search/search-result/SearchResult";
import ResultData from "./assets/components/home/search/search-result/ResultData";
import RecomendationAnimes from "./assets/components/home/RecomendationAnimes";

import MyPagination from "./assets/components/pagination/MyPagination";
function App() {
  const [showSearch, setShowSearch] = useState("");

  // Router Search
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // API Anime
  const baseURL = "https://api.jikan.moe/v4/anime";
  const seasonNowAnime = "https://api.jikan.moe/v4/seasons/now";
  const seasonUpComing = "https://api.jikan.moe/v4/seasons/upcoming";
  const animeByGenres = "https://api.jikan.moe/v4/genres/anime";

  const [animes, setAnimes] = useState([]);
  const [searchAnimes, setSearchAnimes] = useState([]);
  const [recomAnimes, setRecomAnimes] = useState([]);
  const [test, setTest] = useState([]);
  const [genresMap, setGenresMap] = useState({});

  // Fetch Data Anime List Home
  useEffect(() => {
    const getAPI = async () => {
      try {
        // Save Data in Local Storage
        const cachedData = localStorage.getItem("seasonNowAnime");
        const cachedTimeStamp = localStorage.getItem("seasonNowAnimeTimeStamp");
        const cachedExpiry = 24 * 60 * 60 * 1000;

        const isCachedValid =
          cachedData &&
          cachedTimeStamp &&
          Date.now() - cachedTimeStamp < cachedExpiry;

        if (isCachedValid) {
          setAnimes(JSON.parse(cachedData));
        } else {
          const response = await fetch(seasonNowAnime);
          const data = await response.json();

          const sortedAnimes = data.data.sort((a, b) => {
            const dateA = new Date(a.aired.from);
            const dateB = new Date(b.aired.from);
            return dateB - dateA;
          });

          const filteredAnimes = sortedAnimes.map((anime) => ({
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

          // Data
          localStorage.setItem(
            "seasonNowAnime",
            JSON.stringify(filteredAnimes)
          );
          localStorage.setItem(
            "seasonNowAnimeTimeStamp",
            Date.now().toString()
          );
          setAnimes(filteredAnimes);
        }
      } catch (error) {
        console.error("Failed Fetch API");
      }
    };

    const fetchDataWithDelay = () => {
      setTimeout(getAPI, 1000);
    };
    fetchDataWithDelay();
  }, []);
  // Fetch Search Data
  const handleSubmit = async () => {
    try {
      if (searchQuery.trim() === "") {
        const response = await fetch(seasonUpComing);
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
      } else {
        const response = await fetch(`${baseURL}?q=${searchQuery}`);
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
      }
    } catch (error) {
      console.error("Failed Fetch API");
    }
  };

  // Pages && Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = searchAnimes.slice(firstPostIndex, lastPostIndex);
  const totalPost = searchAnimes.length;

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  // get Query
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let queryVal = useQuery();
  let getQuery = queryVal.get("q");

  // Genres Mapping by Name
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const cachedData = localStorage.getItem("animeByGenres");
        const cachedTimeStamp = localStorage.getItem("animeByGenresTimeStamp");
        const cachedExpiry = 24 * 60 * 60 * 1000;

        const isCachedValid =
          cachedData &&
          cachedTimeStamp &&
          Date.now() - cachedTimeStamp < cachedExpiry;

        if (isCachedValid) {
          setGenresMap(JSON.parse(cachedData));
        } else {
          const response = await fetch(animeByGenres);
          const data = await response.json();

          const genresMapping = data.data.reduce((acc, genre) => {
            acc[genre.name.toLowerCase()] = genre.mal_id;

            return acc;
          }, {});
          localStorage.setItem("animeByGenres", JSON.stringify(genresMapping));

          localStorage.setItem("animeByGenresTimeStamp", Date.now().toString());

          setGenresMap(genresMapping);
        }
      } catch {
        console.error("Failed to Fetch Genres Mapping");
      }
    };

    const fetchDataWithDelay = () => {
      setTimeout(fetchGenres, 1200);
    };

    fetchDataWithDelay();
  }, []);

  // Location Search
  const buildQueryString = (page) => {
    const params = new URLSearchParams(location.search);

    if (page !== 1) {
      params.set("page", page);
    } else {
      params.delete("page");
    }
    return `?${params.toString()}`;
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const queryString = buildQueryString(pageNumber);
    navigate(queryString);
  };
  return (
    <>
      <Header showSearch={showSearch} setShowSearch={setShowSearch}>
        <DarkMode showSearch={showSearch} setShowSearch={setShowSearch} />
        <Search
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          navigate={navigate}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          handleSubmit={handleSubmit}
        />
      </Header>

      <main className="main">
        {
          /* <Home animes={animes} /> */

          <Routes>
            <Route
              path="/"
              element={
                <Home animes={animes}>
                  <RecomendationAnimes />
                  <HomeAnimeList animes={animes} />
                </Home>
              }
            />
            <Route path="/anime-list" element={<AnimeList />} />
            <Route path="/genres" element={<Genres />} />
            <Route
              path="genres/:genreName"
              element={<GenresAnime genresMap={genresMap} />}
            />
            <Route path="/live-action" element={<LiveAction />} />
            <Route
              path="/movies"
              element={
                <Movies>
                  <AnimeMovies />
                </Movies>
              }
            />

            <Route path="/ongoing" element={<Ongoing />} />
            <Route
              path="/search"
              element={
                <SearchResult setSearchAnimes={setSearchAnimes}>
                  <ResultData
                    currentPost={currentPost}
                    pageNumbers={pageNumbers}
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                    getQuery={getQuery}
                    setCurrentPage={setCurrentPage}
                    onPageChange={onPageChange}
                  />
                </SearchResult>
              }
            />
          </Routes>
        }
      </main>
    </>
  );
}

export default App;
