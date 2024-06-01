import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MyPagination from "../pagination/MyPagination";
import { useLocation, Link, useNavigate } from "react-router-dom";
import LoadingComponents from "../loading-comp/LoadingComponent";
import ModalLoading from "../loading-comp/ModalLoading";
import { useMouseHovered } from "react-use";
export default function OngoingResult() {
  const [modalData, setModalData] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [height, setHeight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [whenHovered, setWhenHovered] = useState(false);
  const animeBox = useRef(null);
  const modalBox = useRef(null);
  const outElement = useRef(null);
  const ref = useRef(null);
  const [modalHeight, setModalHeight] = useState(null);
  const [animeByStatus, setAnimeByStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const airingAnime = (page) =>
    `https://api.jikan.moe/v4/anime?status=airing&page=${page}`;

  const { docX, docY } = useMouseHovered(ref, {
    bound: false,
    whenHovered: whenHovered,
  });

  const [modalStyle, setModalStyle] = useState({
    top: 0,
    left: 0,
  });
  // const modalStyle = {
  //   top: docY + 15,
  //   left: docX + 15,
  // };

  useEffect(() => {
    const getAnimeByStatus = async () => {
      try {
        const response = await fetch(airingAnime(currentPage));
        const data = await response.json();

        const getAnimeByStatus = data.data.map((anime) => ({
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
        setAnimeByStatus((prevOngoing) => {
          const existingIds = new Set(prevOngoing.map((anime) => anime.mal_id));

          const uniqueNewAnimes = getAnimeByStatus.filter(
            (anime) => !existingIds.has(anime.mal_id)
          );

          return [...prevOngoing, ...uniqueNewAnimes];
        });
      } catch (error) {
        console.error("Failed Fetch Anime");
      } finally {
        setLoading(false);
      }
    };

    getAnimeByStatus();
  }, [currentPage]);

  const postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = animeByStatus.slice(firstPostIndex, lastPostIndex);
  const totalPost = animeByStatus.length;

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
        top: docY > height / 2 ? docY - modalHeight : docY + 15,
        left: docX + 15,
      });
    }
    setWhenHovered(modalData !== null);
  }, [modalData, modalHeight]);

  console.log(modalStyle);
  console.log(modalHeight);
  return (
    <div className="home__anime__list container" ref={outElement}>
      {loading ? (
        <div className="loading-comp flex items-center justify-center h-[544px]">
          <LoadingComponents type="spokes" color="#fff" />
        </div>
      ) : (
        <div className="anime__box-list box__list" ref={animeBox}>
          <ul className="grid">
            {currentPost.map((anime, index) => (
              <li key={index}>
                <div
                  className="hover__container"
                  onMouseEnter={() => handleMouseEnter(anime)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  ref={ref}
                >
                  <a href="#" className="anime__link z-50 w-[full] ">
                    <div className="limit content__list">
                      <img
                        src={anime.images.webp.large_image_url}
                        alt={anime.title}
                        className="anime__img"
                      />
                      <div className="play__icon">
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
                      <div className="anime__title">
                        <h4>{anime.title}</h4>
                        <div className="anime__desc">
                          <span>{anime.type}</span>
                          <span>Episode: {anime.episodes}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            ))}
            {modalLoading ? (
              <div
                className="absolute"
                ref={modalBox}
                style={{ top: docY + 15, left: docX + 15 }}
              >
                <ModalLoading type="spokes" color="#fff" />
              </div>
            ) : (
              modalData && (
                <div
                  className={`modal__hover show-modal`}
                  style={modalStyle}
                  ref={modalBox}
                >
                  <div className="modal__content">
                    <h4 className="modal__title">{modalData.title}</h4>
                    <div className="modal__info">
                      <svg
                        className="info__stars"
                        height="16px"
                        width="16px"
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
                      <span className="info__score">{modalData.score}</span>
                      <span className="info__eps">
                        Eps : {modalData.episodes}
                      </span>
                      <span className="info__type">{modalData.type}</span>
                    </div>
                    <div className="anime__synopsis">
                      <p>{modalData.synopsis}</p>
                    </div>
                    <div className="anime__status">
                      <span>
                        Duration : <strong>{modalData.duration}</strong>
                      </span>
                      <span>
                        Status : <strong>{modalData.status}</strong>
                      </span>
                      <span>
                        Genre : <strong>{modalData.genres}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </ul>
        </div>
      )}
      <MyPagination
        currentPage={currentPage}
        currentPost={currentPost}
        pageNumbers={pageNumbers}
        onPageChange={onPageChange}
      />
    </div>
  );
}
