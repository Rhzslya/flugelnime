import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TopAnimeReviews() {
  const [animeTopRanks, setAnimeTopRanks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animeTopRankAPI = "https://api.jikan.moe/v4/top/anime";

  useState(() => {
    const getAPI = async () => {
      try {
        const cachedData = localStorage.getItem("animeTopRanks");
        const cachedTimeStamp = localStorage.getItem("animeTopRanksTimeStamp");
        const cachedExpiry = 24 * 60 * 60 * 1000;
        const isCachedValid =
          cachedData &&
          cachedTimeStamp &&
          Date.now() - cachedTimeStamp < cachedExpiry;

        if (isCachedValid) {
          setAnimeTopRanks(JSON.parse(cachedData));
        } else {
          const response = await fetch(animeTopRankAPI);
          const data = await response.json();

          const getAnimeTopReviews = data.data.map((anime) => ({
            title: anime.title,
            images: anime.images,
            type: anime.type,
            episodes: anime.episodes,
            score: anime.score,
            genres: anime.genres.map((genre) => genre.name).join(", "),
            synopsis: anime.synopsis,
            duration: anime.duration,
            status: anime.status,
            rank: anime.rank,
          }));

          const shuffledAnimes = getAnimeTopReviews.sort(
            (a, b) => a.rank - b.rank
          );

          const animeMap = {};
          shuffledAnimes.forEach((anime) => {
            if (animeMap[anime.rank]) {
              animeMap[anime.rank] = {
                ...animeMap[anime.rank],
                ...anime,
              };
            } else {
              animeMap[anime.rank] = anime;
            }
          });

          const uniqueAnimes = Object.values(animeMap);
          localStorage.setItem("animeTopRanks", JSON.stringify(uniqueAnimes));
          localStorage.setItem("animeTopRanksTimeStamp", Date.now());
          setAnimeTopRanks(uniqueAnimes);
        }
      } catch (error) {
        console.error("Failed Fetch API");
      }
    };
    getAPI();
  }, []);

  useEffect(() => {
    if (animeTopRanks.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === animeTopRanks.length - 1 ? 0 : prevIndex + 1
        );
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [animeTopRanks]);

  return (
    <div
      className="w-full h-full relative rounded bg-center bg-cover duration-500 img__slider"
      style={{
        backgroundImage: `url(${
          animeTopRanks.length > 0 &&
          animeTopRanks[currentIndex].images.webp.large_image_url
        })`,
      }}
    >
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded"></div>
      <Link to="" className="relative z-10">
        <div className="w-full h-full rounded">
          <div className="h-full">
            {animeTopRanks.length > 0 && (
              <div className="slide__info p-2 ">
                <h3 className="mt-4 text-neutral-100 text-sm">
                  TOP ANIME REVIEWS THIS WEEK
                </h3>

                <div className="mt-2">
                  <h3 className="text-neutral-100 text-sm font-bold">
                    {animeTopRanks[currentIndex].title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
