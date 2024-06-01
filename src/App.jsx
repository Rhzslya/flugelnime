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
import Ongoing from "./assets/components/ongoing-anime/Ongoing";
import OngoingResult from "./assets/components/ongoing-anime/OngoingResult";
import SearchResult from "./assets/components/home/search/search-result/SearchResult";
import ResultData from "./assets/components/home/search/search-result/ResultData";
import RecomendationAnimes from "./assets/components/home/RecomendationAnimes";

function App() {
  const [showSearch, setShowSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Router Search
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // API Anime

  const [searchAnimes, setSearchAnimes] = useState([]);
  const [recomAnimes, setRecomAnimes] = useState([]);
  const [test, setTest] = useState([]);
  const [genresMap, setGenresMap] = useState({});

  // Location Search

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location]);
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
          setCurrentPage={setCurrentPage}
          setSearchAnimes={setSearchAnimes}
        />
      </Header>

      <main className="main">
        {
          /* <Home animes={animes} /> */

          <Routes>
            <Route
              path="/"
              element={
                <Home>
                  <RecomendationAnimes />
                  <HomeAnimeList />
                </Home>
              }
            />
            <Route path="/anime-list" element={<AnimeList />} />
            <Route
              path="/genres"
              element={<Genres setGenresMap={setGenresMap} />}
            />
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

            <Route
              path="/ongoing"
              element={
                <Ongoing>
                  <OngoingResult />
                </Ongoing>
              }
            />
            <Route
              path="/search"
              element={
                <SearchResult
                  setSearchAnimes={setSearchAnimes}
                  setCurrentPage={setCurrentPage}
                >
                  <ResultData
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                    setCurrentPage={setCurrentPage}
                    searchAnimes={searchAnimes}
                    navigate={navigate}
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
