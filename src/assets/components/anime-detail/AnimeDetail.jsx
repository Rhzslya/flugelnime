import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFoundPage from "../../../Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AnimeDetail = () => {
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setErrorMessage(response.status);
          }
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await response.json();
        const anime = data.data;
        const filteredData = {
          title: anime.title,
          studios:
            anime.studios.length > 1
              ? anime.studios.map((studio) => studio.name).join(", ")
              : anime.studios[0]?.name,
          images: anime.images,
          genres: anime.genres.map((genre) => ({
            id: genre.mal_id,
            name: genre.name,
          })),
          synopsis: anime.synopsis,
          mal_id: anime.mal_id,
          status: anime.status,
          released: anime.year,
          duration: anime.duration,
          season: anime.season,
          type: anime.type,
          episodes: anime.episodes === null ? "-" : anime.episodes,
          rating: anime.rating,
          day: anime.broadcast.day,
          score: anime.score,
        };

        setAnimeDetail(filteredData);
      } catch (error) {
        setErrorMessage("An unknown error occurred");
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (notFound) {
    return <NotFoundPage errorMessage={errorMessage} />;
  }

  return (
    <div className="bg-slate-600 border-4 w-[100%] rounded ">
      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="detail__box-list box-list  bg-slate-600 p-3 md:p-4 lg:p-6 block md:flex gap-3 w-full lg:w-[960px]">
            <div className="flex justify-center">
              <div>
                <Skeleton className=" min-h-[160px] w-[120px] min-[300px]:w-[140px] sm:w-[160px] lg:w-[180px] sm:h-[200px] md:h-[230px] lg:h-[250px]" />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="box__title">
                <Skeleton className="h-[20px] w-[150px] min-[290px]:h-[30px] min-[290px]:w-[200px]" />
              </div>
              <div className="mt-2">
                <Skeleton
                  count={5}
                  className="min-[480px]:w-[435px] sm:w-[590px] md:w-[520px] min-[849px]:w-[614px]"
                />
              </div>
              <div className="grid min-[480px]:grid-cols-2 gap-[2px] text-neutral-100 text-xs sm:text-sm text-nowrap mt-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="relative flex items-center gap-1">
                    <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                    <Skeleton width={150} />
                  </div>
                ))}
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[20px] w-[60px] min-[290px]:h-[30px] min-[290px]:w-[80px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <div className="detail__box-list box-list dark:bg-slate-900 bg-slate-600 p-3 md:p-4 lg:p-6 block md:flex gap-3 w-full lg:w-[960px]">
          <div className="flex justify-center">
            <div className=" h-full w-[120px] min-[300px]:w-[140px]  sm:w-[160px] lg:w-[180px] sm:h-[200px] md:h-[230px] lg:h-[250px]">
              <img
                className="block w-full h-full object-cover"
                src={animeDetail?.images.webp.large_image_url}
                alt=""
              />
            </div>
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="box__title">
              <h3 className="text-neutral-100 font-bold text-base sm:text-xl">
                {animeDetail.title}
              </h3>
            </div>
            <div className="block text-neutral-100 text-sm mb-1 overflow-y-auto max-h-[200px]">
              <span>{animeDetail.synopsis}</span>
            </div>
            <div className="grid min-[480px]:grid-cols-2 gap-[2px] text-neutral-100 text-xs sm:text-sm text-nowrap">
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Status</strong> : {animeDetail.status}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Released</strong> : {animeDetail.released}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Duration</strong> : {animeDetail.duration}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Released On</strong> : {animeDetail.day}
                </span>
              </div>

              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Episodes</strong> : {animeDetail.episodes}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Rating</strong> : {animeDetail.rating}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Type</strong> : {animeDetail.type}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Season</strong> : {animeDetail.season}
                </span>
              </div>
              <div className="relative flex items-center gap-1">
                <span className=" w-2 h-2 bg-sky-300 rounded-full"></span>
                <span>
                  <strong>Score</strong> : {animeDetail.score}
                </span>
              </div>
            </div>
            <div
              className={`${
                animeDetail.genres.length > 3
                  ? "grid grid-cols-2 sm:flex"
                  : "flex"
              } gap-1 `}
            >
              {animeDetail.genres.map((genre, index) => (
                <React.Fragment key={index}>
                  <Link
                    to={`/flugelnime/genres/${genre.id}`}
                    state={{ genreName: genre.name }}
                    className="text-neutral-100 hover:text-pink-300 hover:bg-neutral-100 duration-300 px-1 border-[1px] border-neutral-100 rounded w-fit text-sm"
                  >
                    {genre.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>

            <div className=""></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetail;
