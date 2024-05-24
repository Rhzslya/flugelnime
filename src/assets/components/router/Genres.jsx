import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const genresAPI = "https://api.jikan.moe/v4/genres/anime";
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
        <div className="genres__content grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
