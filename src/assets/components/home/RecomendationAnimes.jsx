import React, { useEffect, useState } from "react";
import "./recomendation-anime.css";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function RecomendationAnimes() {
  const [recomendedAnimes, setRecomendedAnimes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const getAPI = async () => {
      try {
        const cachedData = localStorage.getItem("recomendedAnimes");
        const cachedTimeStamp = localStorage.getItem(
          "recomendedAnimesTimeStamp"
        );
        const cachedExpiry = 24 * 60 * 60 * 1000;
        const isCachedValid =
          cachedData &&
          cachedTimeStamp &&
          Date.now() - cachedTimeStamp < cachedExpiry;

        if (isCachedValid) {
          setRecomendedAnimes(JSON.parse(cachedData));
        } else {
          const response = await fetch(
            "https://api.jikan.moe/v4/recommendations/anime"
          );
          const data = await response.json();

          const allRecomedationAnimes = data.data.flatMap(
            (entryItem) => entryItem.entry
          );

          const shuffledAnimes = allRecomedationAnimes.sort(
            () => Math.random() - 0.5
          );

          const selectedAnimes = shuffledAnimes.slice(0, 5);

          const animeMap = {};

          selectedAnimes.forEach((anime) => {
            if (animeMap[anime.mal_id]) {
              animeMap[anime.mal_id] = {
                ...animeMap[anime.mal_id],
                ...anime,
              };
            } else {
              animeMap[anime.mal_id] = anime;
            }
          });

          const uniqueAnimes = Object.values(animeMap);

          localStorage.setItem(
            "recomendedAnimes",
            JSON.stringify(uniqueAnimes)
          );
          localStorage.setItem(
            "recomendedAnimesTimeStamp",
            Date.now().toString()
          );

          setRecomendedAnimes(uniqueAnimes);
        }
      } catch (error) {
        console.error("Failed Fetch API");
      }
    };

    getAPI();
  }, []);

  useEffect(() => {
    if (recomendedAnimes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === recomendedAnimes.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [recomendedAnimes]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? recomendedAnimes.length - 1
      : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === recomendedAnimes.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  console.log(recomendedAnimes);
  return (
    <div className="max-w-[100%] h-[450px] w-full m-auto py-16 relative group">
      <div className="last__title title__list rounded-t">
        <h3>Recomended Animes</h3>
      </div>
      <div
        className="w-full h-full rounded-b bg-center bg-cover duration-500 img__slider"
        style={{
          backgroundImage: `url(${
            recomendedAnimes.length > 0 &&
            recomendedAnimes.map((anime) => anime.images.webp.large_image_url)[
              currentIndex
            ]
          })`,
        }}
      >
        <div className="w-full h-full bg-neutral-900 rounded-b opacity-95 flex items-center justify-between px-4 py-3">
          {recomendedAnimes.length > 0 && (
            <div className="slide__info">
              <h3>{recomendedAnimes[currentIndex].title}</h3>
            </div>
          )}
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight size={30} onClick={nextSlide} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {recomendedAnimes.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
