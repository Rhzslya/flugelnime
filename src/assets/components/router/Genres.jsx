import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Genres() {
  const genresAPI = "https://api.jikan.moe/v4/genres/anime";
  const [genres, setGenres] = useState([]);
  // Genres Mapping by Name
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

  return (
    <section className="genres section">
      <div className="genres__container container-grid grid">
        <div className="box__content genres__content min-[430px]:pt-8 pt-12 md:pt-0  grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {genres.map((item) => (
            <Link
              key={item.id}
              to={`/genres/${item.id}`}
              state={{ genreName: item.name }}
              className="bg-sky-300 p-2 rounded-lg shadow-md hover:bg-pink-300 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="text-neutral-100 text-xs sm:text-sm text-nowrap font-semibold">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
