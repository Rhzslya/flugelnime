import React, { useEffect, useState } from "react";
import MyPagination from "../pagination/MyPagination";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function AnimeMovies() {
  const [getMovies, setGetMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const animeMoviesAPI = (page) =>
    `https://api.jikan.moe/v4/anime?type=movie&page=${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(animeMoviesAPI(currentPage));
        const data = await response.json();

        const getMoviesList = data.data.map((item) => ({
          title: item.title,
          type: item.type,
        }));

        setGetMovies((prevMovies) => [...prevMovies, ...getMoviesList]);
      } catch (error) {
        console.error("Failed Fetch API");
      }
    };
    fetchMovies();
  }, [currentPage]); // Menggunakan currentPage sebagai dependensi useEffect

  const postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = getMovies.slice(firstPostIndex, lastPostIndex);
  const totalPost = getMovies.length;

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

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
    <div className="movies__anime__list box__content">
      <div className="last__title title__list">
        <h3>Movies</h3>
      </div>

      <div className="movies__box-lis box__list">
        <ul className="grid">
          {currentPost.map((movie, index) => (
            <li key={index}>
              <h3>{movie.title}</h3>
            </li>
          ))}
        </ul>
      </div>
      <MyPagination
        currentPage={currentPage}
        currentPost={currentPost}
        pageNumbers={pageNumbers}
        onPageChange={onPageChange}
      />
    </div>
  );
}
