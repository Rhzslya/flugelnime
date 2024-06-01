import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Genres({ setGenresMap }) {
  const [genres, setGenres] = useState([]);
  const genresAPI = "https://api.jikan.moe/v4/genres/anime";
  const animeByGenres = "https://api.jikan.moe/v4/genres/anime";
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

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(genresAPI);
        const data = await response.json();

        const genresList = data.data.map((item) => ({
          name: item.name,
          id: item.mal_id,
        }));
        setGenres(genresList);
      } catch (error) {
        console.error("Failed Fetch Genres");
      }
    };
    getGenres();
  }, []);

  console.log(genres);
  return (
    <section className="genres section">
      <div className="genres__container container-grid grid">
        <div className="box__content genres__content grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {genres.map((item) => (
            <Link
              key={item.id}
              to={`/genres/${item.name.toLowerCase()}`}
              className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <h3 className="text-sm font-semibold text-gray-800">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
