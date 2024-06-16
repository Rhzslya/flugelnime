import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./assets/components/header/Header";
import Search from "./assets/components/home/search/Search";
import DarkMode from "./assets/components/dark-mode/DarkMode";
import Home from "./assets/components/home/Home";
import HomeAnimeList from "./assets/components/home/HomeAnimeList";

import AnimeList from "./assets/components/router/AnimeList";
import Genres from "./assets/components/router/Genres";
import GenresBox from "./assets/components/genres-component/GenresBox";
import GenresAnime from "./assets/components/genres-component/GenresAnime";
import Seasons from "./assets/components/router/Seasons";
import Season from "./assets/components/seasons/Season";
import SeasonList from "./assets/components/seasons/SeasonList";
import SeasonAnime from "./assets/components/seasons/SeasonAnime";
import Movies from "./assets/components/router/Movies";
import AnimeMovies from "./assets/components/anime-movies/AnimeMovies";
import Ongoing from "./assets/components/ongoing-anime/Ongoing";
import OngoingResult from "./assets/components/ongoing-anime/OngoingResult";
import SearchResult from "./assets/components/home/search/search-result/SearchResult";
import ResultData from "./assets/components/home/search/search-result/ResultData";
import RecomendationAnimes from "./assets/components/home/RecomendationAnimes";
import Detail from "./assets/components/anime-detail/Detail";
import NotFoundPage from "./Context";
import ContextViews from "./assets/components/context/ContextViews";

function App() {
  const [showSearch, setShowSearch] = useState("");
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  // Router Search
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // API Anime

  const [searchAnimes, setSearchAnimes] = useState([]);

  // Location Search

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location]);
  return (
    <>
      <Header
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      >
        <Search
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          navigate={navigate}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setCurrentPageSearch={setCurrentPageSearch}
          setSearchAnimes={setSearchAnimes}
          setLoadingSearch={setLoadingSearch}
          showMenuNav={showMenu}
          setShowMenuNav={setShowMenu}
        />
        <DarkMode showSearch={showSearch} setShowSearch={setShowSearch} />
      </Header>

      <main className="main">
        {
          /* <Home animes={animes} /> */

          <Routes>
            <Route
              path="/flugelnime/"
              element={
                <Home>
                  <RecomendationAnimes />
                  <HomeAnimeList
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </Home>
              }
            />
            <Route path="/flugelnime/:id" element={<Detail />} />
            <Route path="/flugelnime/anime-list" element={<AnimeList />} />
            <Route path="/flugelnime/genres" element={<Genres />} />
            <Route
              path="/flugelnime/seasons"
              element={
                <Seasons>
                  <SeasonList />
                </Seasons>
              }
            />
            <Route
              path="/flugelnime/seasons/:year/:season"
              element={
                <Season>
                  <SeasonAnime />
                </Season>
              }
            />
            <Route
              path="/flugelnime/genres/:genreId"
              element={
                <GenresBox>
                  <GenresAnime />
                </GenresBox>
              }
            />

            <Route
              path="/flugelnime/movies"
              element={
                <Movies>
                  <AnimeMovies />
                </Movies>
              }
            />

            <Route
              path="/flugelnime/ongoing"
              element={
                <Ongoing>
                  <OngoingResult />
                </Ongoing>
              }
            />
            <Route
              path="/flugelnime/search"
              element={
                <SearchResult
                  setSearchAnimes={setSearchAnimes}
                  setCurrentPageSearch={setCurrentPageSearch}
                >
                  <ResultData
                    currentPageSearch={currentPageSearch}
                    searchQuery={searchQuery}
                    setCurrentPageSearch={setCurrentPageSearch}
                    searchAnimes={searchAnimes}
                    navigate={navigate}
                    loadingSearch={loadingSearch}
                    setLoadingSearch={setLoadingSearch}
                  />
                </SearchResult>
              }
            />
            <Route
              path="/flugelnime/*"
              element={
                <ContextViews>
                  <NotFoundPage />
                </ContextViews>
              }
            />
          </Routes>
        }
      </main>
    </>
  );
}

export default App;
