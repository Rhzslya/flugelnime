import React, { useEffect, useState } from "react";
import "./recomendation-anime.css";
import { Link } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import TopAnimeReviews from "./TopAnimeReviews";
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
            "https://api.jikan.moe/v4/anime?order_by=popularity"
          );
          const data = await response.json();

          const allRecomendationAnimes = data.data
            .map((anime) => ({
              title: anime.title,
              images: anime.images,
              type: anime.type,
              episodes: anime.episodes,
              score: anime.score,
              genres: anime.genres.map((genre) => ({
                id: genre.mal_id,
                name: genre.name,
              })),
              synopsis:
                anime.synopsis.length > 100
                  ? anime.synopsis.substring(0, 100) + "..."
                  : anime.synopsis,
              duration: anime.duration,
              status: anime.status,
              rank: anime.rank,
            }))
            .filter((anime) => anime.score !== null)
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);

          localStorage.setItem(
            "recomendedAnimes",
            JSON.stringify(allRecomendationAnimes)
          );
          localStorage.setItem(
            "recomendedAnimesTimeStamp",
            Date.now().toString()
          );

          setRecomendedAnimes(allRecomendationAnimes);
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

  return (
    <div className="relative grid grid-cols-4 gap-4  ">
      <div className=" bg-gray-100 p-1 rounded md:col-span-3 col-span-4  ">
        <div className="max-w-[100%] h-[300px] min-[480px]:h-[350px] sm:h-[400px] w-full m-auto relative group ">
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-60 rounded"></div>
          {recomendedAnimes.length > 0 && (
            <div
              className="w-full h-full rounded bg-center duration-500 img__slider"
              style={{
                backgroundImage: `url(${
                  recomendedAnimes.length > 0 &&
                  recomendedAnimes[currentIndex].images.webp.large_image_url
                })`,
              }}
            >
              <div className="w-full h-full backdrop-blur-xl bg-black/30  rounded opacity-95 overflow-hidden px-2 py-1.5 sm:px-4 sm:py-3 ">
                <div className="absolute px-2 top-2 min-[300px]:top-6">
                  <h3 className="text-neutral-100 font-bold text-[14px] min-[300px]:text-base sm:text-xl">
                    Recomended Animes
                  </h3>
                </div>
                <div
                  className="absolute min-[300px]:block"
                  style={{ right: "16px", top: "12px" }}
                >
                  <svg
                    className="fill-orange-400 w-[30px] min-[300px]:w-[50px]"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 47.94 47.94"
                    xmlSpace="preserve"
                    fill="#000000"
                    stroke="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
                    </g>
                  </svg>
                  <span className="absolute text-neutral-100 text-[10px] min-[300px]:text-sm font-bold top-2/4 left-[15px] min-[300px]:left-[25px] -translate-x-2/4 -translate-y-2/4">
                    {recomendedAnimes[currentIndex].score}
                  </span>
                </div>

                <div
                  className="absolute -rotate-45 bg-lime-500 px-10 text-xs sm:text-sm"
                  style={{ right: "-45px", bottom: "35px" }}
                >
                  <span className=" text-neutral-100 text-sm font-bold text-center">
                    {recomendedAnimes[currentIndex].status}
                  </span>
                </div>

                <div className="slide__box grid  gap-4 h-[100%] grid-cols-4 ">
                  <div className=" relative bg-gradient-to-t p-2 col-span-3 flex items-center ">
                    <div className="">
                      <h3 className="uppercase text-neutral-100 font-bold text-[14px] min-[300px]:text-base sm:text-xl">
                        {recomendedAnimes[currentIndex].title}
                      </h3>
                      <div className="slide__info block mt-2">
                        <span className="text-neutral-100 block text-xs sm:text-sm">
                          <strong>Rank : </strong>
                          {recomendedAnimes[currentIndex].rank}
                        </span>
                        <div className="mt-1 text-xs sm:text-sm">
                          {recomendedAnimes[currentIndex].genres.map(
                            (genre, index) => (
                              <React.Fragment key={index}>
                                <Link
                                  to={`/genres/${genre.id}`}
                                  className="text-pink-300 hover:text-sky-300 duration-300 "
                                >
                                  {genre.name}
                                </Link>
                                {index <
                                  recomendedAnimes[currentIndex].genres.length -
                                    1 && ", "}
                              </React.Fragment>
                            )
                          )}
                        </div>

                        <span className="text-neutral-100 block mt-1 text-xs sm:text-sm">
                          {recomendedAnimes[currentIndex].synopsis}
                        </span>

                        <span className="text-neutral-100 block mt-2 text-xs sm:text-sm">
                          <strong>Type : </strong>
                          {recomendedAnimes[currentIndex].type}
                        </span>
                        <span className="text-neutral-100 block mt-2 text-xs sm:text-sm">
                          <strong>Episodes : </strong>
                          {recomendedAnimes[currentIndex].episodes}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="slide__img bg-gray-100 m-auto rounded   md:col-span-1  ">
                    <img
                      className="w-full block rounded"
                      src={
                        recomendedAnimes[currentIndex].images.webp
                          .large_image_url
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft size={30} onClick={prevSlide} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight size={30} onClick={nextSlide} />
          </div>
          <div className="flex top-4 justify-center py-2">
            {recomendedAnimes.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`text-2xl cursor-pointer  hover:scale-150 transition-all duration-500 ${
                  currentIndex === slideIndex ? "scale-150" : ""
                }`}
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:bg-gray-100 p-1 rounded col-span-4 md:col-span-1 md:block">
        <TopAnimeReviews />
      </div>
    </div>
  );
}
