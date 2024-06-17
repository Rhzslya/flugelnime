import { useState, useRef, useLayoutEffect } from "react";
import { useEffect } from "react";
import { useMouseHovered } from "react-use";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyPagination from "../pagination/MyPagination";
import ModalLoading from "../loading-comp/ModalLoading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AnimeList({ currentPage, setCurrentPage }) {
  const [modalData, setModalData] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [height, setHeight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [whenHovered, setWhenHovered] = useState(false);
  const [modalHeight, setModalHeight] = useState(null);
  const ref = useRef(null);
  const animeBox = useRef(null);
  const modalBox = useRef(null);
  const outElement = useRef(null);
  const [animes, setAnimes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showModal]);

  const seasonNowAnime = (page) =>
    `https://api.jikan.moe/v4/seasons/now?&sfw=${true}&page=${page}`;
  const { docX, docY } = useMouseHovered(ref, {
    bound: false,
    whenHovered: whenHovered,
  });

  const [modalStyle, setModalStyle] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    setLoading(true);
    getAPI(currentPage);
  }, [currentPage]);

  const getAPI = async (page) => {
    try {
      const response = await fetch(seasonNowAnime(page));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const sortedAnimes = data.data.sort((a, b) => {
        const dateA = new Date(a.aired.from);
        const dateB = new Date(b.aired.from);
        return dateB - dateA;
      });

      const filteredAnimes = sortedAnimes.map((anime) => ({
        title: anime.title,
        images: anime.images,
        type: anime.type,
        episodes: anime.episodes === null ? "-" : anime.episodes,
        score: anime.score,
        genres: anime.genres.map((genre) => genre.name).join(", "),
        synopsis: anime.synopsis,
        duration: anime.duration,
        status: anime.status,
        mal_id: anime.mal_id,
        day: anime.broadcast.day,
      }));

      // Data
      setAnimes((prevAnimes) => {
        const existingMalIds = new Set(prevAnimes.map((anime) => anime.mal_id));
        const newMalIds = new Set();
        const uniqueNewAnimes = filteredAnimes.filter((anime) => {
          if (existingMalIds.has(anime.mal_id) || newMalIds.has(anime.mal_id)) {
            return false;
          } else {
            newMalIds.add(anime.mal_id);
            return true;
          }
        });

        return [...prevAnimes, ...uniqueNewAnimes].slice(0, 50);
      });
    } catch (error) {
      console.error("Failed to fetch API:", error);
    } finally {
      setLoading(false);
    }
  };

  const postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = animes.slice(firstPostIndex, lastPostIndex);
  const totalPost = animes.length;

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
    setLoading(false);
    const queryString = buildQueryString(pageNumber);
    navigate(queryString);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || currentPage;
    setCurrentPage(+page);
  }, [location.search]);

  const handleMouseEnter = (anime) => {
    setModalLoading(true);
    const id = setTimeout(() => {
      setModalLoading(false);
      setModalData(anime);
    }, 1000);
    setTimeoutId(id);
  };

  const handleMouseLeave = (e) => {
    const targetNode = e.relatedTarget;

    if (targetNode !== modalBox.current && timeoutId) {
      setModalData(null);
      setModalLoading(false);
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  useLayoutEffect(() => {
    if (animeBox.current) {
      setHeight(animeBox.current.offsetHeight);
    }
  }, [currentPost]);

  useLayoutEffect(() => {
    if (modalBox.current) {
      setModalHeight(modalBox.current.offsetHeight);
      setModalStyle({
        top: docY > height ? docY - modalHeight : docY + 15,
        left: docX + 15,
      });
    }
    setWhenHovered(modalData !== null);
  }, [modalData, docX, docY, modalHeight]);

  return (
    <div
      className="  bg-slate-600 border-4 mt-8 sm:mt-12 lg:mt-16 w-[100%] rounded "
      ref={outElement}
    >
      <div className="last__title title__list rounded-t">
        <h3 className="text-neutral-100 font-bold text-base dark:bg-slate-900 bg-slate-600  rounded-t px-6 pt-2 sm:text-xl ">
          Last Update
        </h3>
      </div>

      <>
        <div
          className="anime__box-list box__list dark:bg-slate-900 bg-slate-600 px-6"
          ref={animeBox}
        >
          <ul className="card__anime grid gap-2 min-[293px]:gap-3 md:gap-4 grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4  md:grid-cols-4  lg:grid-cols-5 py-4">
            {loading || currentPost.length < 1
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative h-[100px] min-[280px]:h-[135px] min-[300px]:h-[145px] min-[320px]:h-[160px] min-[340px]:h-[170px] min-[360px]:h-[195px] min-[400px]:h-[220px] min-[440px]:h-[245px] min-[480px]:h-[200px] min-[560px]:h-[230px] sm:h-[200px] md:h-[230px] lg:h-[250px]"
                  >
                    <Skeleton className=" h-[100px] min-[280px]:h-[135px] min-[300px]:h-[145px] min-[320px]:h-[160px] min-[340px]:h-[170px] min-[360px]:h-[195px] min-[400px]:h-[220px] min-[440px]:h-[245px] min-[480px]:h-[200px] min-[560px]:h-[230px] sm:h-[200px] md:h-[230px] lg:h-[250px]" />
                    <div className="anime__title absolute bottom-0 w-full">
                      <div className="relative py-2 px-1 z-10">
                        <div className="overlay absolute w-full h-full bg-slate-600 -bottom-[3px] left-0 -z-10 opacity-85"></div>
                        <h4 className="text-neutral-100 text-nowrap text-xs sm:text-sm font-bold">
                          <Skeleton width={`80%`} />
                        </h4>
                        <div className="anime__desc hidden min-[293px]:flex items-center justify-between">
                          <span className="text-pink-300 text-xs sm:text-sm bg-slate-100 py-0.5 px-1 rounded">
                            <Skeleton width={20} className="inline-block" />
                          </span>
                          <span className="text-sky-300 text-xs sm:text-sm">
                            <Skeleton className="min-[320px]:w-[70px] md:w-[85px]" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : currentPost.map((anime, index) => (
                  <li key={index} className="relative">
                    <Link
                      to={`/flugelnime/${anime.mal_id}`}
                      className="anime__link group"
                      onMouseEnter={() => handleMouseEnter(anime)}
                      onMouseLeave={(e) => handleMouseLeave(e)}
                      ref={ref}
                    >
                      <div className="h-full limit content__list relative overflow-hidden rounded">
                        <span
                          className={`absolute bg-opacity-80 top-[50%] right-0 py-0.5 px-1 text-neutral-100 text-xs sm:text-sm bg-sky-300 ${
                            anime.day === null ? "hidden" : "block"
                          }`}
                        >
                          {anime.day}
                        </span>

                        <img
                          src={anime.images.webp.large_image_url}
                          alt={anime.title}
                          className="w-full h-full min-[280px]:h-[135px] min-[300px]:h-[145px] min-[320px]:h-[160px] min-[340px]:h-[170px] min-[360px]:h-[195px] min-[400px]:h-[220px] min-[440px]:h-[245px] min-[480px]:h-[200px] min-[560px]:h-[230px] sm:h-[200px] md:h-[230px] lg:h-[250px] object-cover ease-in duration-300 block group-hover:scale-105"
                        />
                        <div className="play__icon absolute bottom-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300">
                          <svg
                            fill="#ffffff"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 408.221 408.221"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              <g>
                                <g>
                                  <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11 C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012 c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z" />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className="anime__title absolute bottom-0 w-full">
                          <div className="relative py-2 px-1  z-10">
                            <div className="overlay absolute w-full h-full bg-slate-900 top-0 left-0 -z-10 opacity-85"></div>
                            <h4 className="text-neutral-100 text-nowrap mt-1 text-xs sm:text-sm font-bold">
                              {anime.title.length > 20
                                ? anime.title.substring(0, 20) + "..."
                                : anime.title}
                            </h4>
                            <div className="anime__desc hidden min-[293px]:flex items-center justify-between mt-1">
                              <span className="text-pink-300 text-xs sm:text-sm bg-slate-100 py-0.5 px-1 rounded">
                                {anime.type}
                              </span>
                              <span className="text-sky-300 text-xs sm:text-sm">
                                Episode : {anime.episodes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            {showModal &&
              (modalLoading ? (
                <div
                  className="absolute z-50"
                  ref={modalBox}
                  style={{ top: docY + 15, left: docX + 15 }}
                >
                  <ModalLoading type="spokes" color="#fff" />
                </div>
              ) : (
                modalData && (
                  <div
                    className={`modal__content absolute block bg-slate-600 border-2 border-gray-100 z-50 h-auto max-w-[400px] p-2`}
                    style={modalStyle}
                    ref={modalBox}
                  >
                    <div className="modal__content block">
                      <h4 className="mb-1 text-neutral-100 font-bold text-base">
                        {modalData.title}
                      </h4>
                      <div className="modal__info flex items-center mb-1 text-neutral-100 font-bold text-sm">
                        <svg
                          className="info__stars fill-orange-600 block mr-1"
                          height="20px"
                          width="20px"
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
                            {" "}
                            <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>{" "}
                          </g>
                        </svg>
                        <span className="info__score mr-[20px]">
                          {modalData.score}
                        </span>
                        <span className="info__eps">
                          Eps : {modalData.episodes}
                        </span>
                        <span className="info__type ml-auto text-pink-300 bg-neutral-100 py-0.5 px-1 rounded">
                          {modalData.type}
                        </span>
                      </div>
                      <div className="anime__synopsis text-neutral-100 text-sm mb-1">
                        <p>{modalData.synopsis}</p>
                      </div>
                      <div className="anime__status block text-neutral-100 text-sm mb-1">
                        <span className="block">
                          Duration : <strong>{modalData.duration}</strong>
                        </span>
                        <span className="block">
                          Status : <strong>{modalData.status}</strong>
                        </span>
                        <span className="block">
                          Genre : <strong>{modalData.genres}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              ))}
          </ul>
        </div>
      </>

      <MyPagination
        currentPage={currentPage}
        totalPost={totalPost}
        pageNumbers={pageNumbers}
        onPageChange={onPageChange}
      />
    </div>
  );
}
