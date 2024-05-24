import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function GenresAnime({ genresMap }) {
  const { genreName } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const genreId = genresMap[genreName];
  const genreAnimeAPI = `https://api.jikan.moe/v4/anime?genres=${genreId}`;
  useEffect(() => {
    const getAnimeByGenre = async () => {
      if (genreId) {
        try {
          const response = await fetch(genreAnimeAPI);
          const data = await response.json();

          const listAnimeByGenre = data.data.map((anime) => ({
            title: anime.title,
            images: anime.images,
            type: anime.type,
            episodes: anime.episodes,
            score: anime.score,
            genres: anime.genres.map((genre) => genre.name).join(", "),
            synopsis: anime.synopsis,
            duration: anime.duration,
            status: anime.status,
            mal_id: anime.mal_id,
          }));

          setAnimeList(listAnimeByGenre);
        } catch (error) {
          console.error("Failed Fetch Anime By Genre");
        }
      }
    };

    getAnimeByGenre();
  }, [genreId]);

  if (!genreId) {
    return <div>Genre tidak ditemukan</div>;
  }

  return (
    <div>
      <h2>Anime dalam Genre {genreId}</h2>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.mal_id}>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
}
