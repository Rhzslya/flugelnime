import React, { useEffect, useState } from "react";

export default function AnimeList() {
  const [animeListByTitle, setAnimeListByTitle] = useState([]);
  const getAnimeListByTitleAPI = "https://api.jikan.moe/v4/anime?orderby=title";
  useEffect(() => {
    const getAnimeListByTitle = async () => {
      try {
        const response = await fetch(getAnimeListByTitleAPI);
        const data = await response.json();

        const animeTitle = data;

        setAnimeListByTitle(animeTitle);
      } catch (error) {
        console.error("Failed Fetch API");
      }
    };
    getAnimeListByTitle();
  }, []);
  console.log(animeListByTitle);
  return <h1 className="">Hello world!</h1>;
}
