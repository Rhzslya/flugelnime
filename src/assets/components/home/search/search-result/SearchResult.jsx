import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./search-result.css";

export default function SearchResult({
  setSearchAnimes,
  children,
  setCurrentPageSearch,
}) {
  useEffect(() => {
    return () => {
      setSearchAnimes([]);
      setCurrentPageSearch(1);
    };
  }, []);

  return (
    <section className="search section w-full flex justify-center px-3">
      <div className="search__container w-[968px] lg:max-w-[968px] grid">
        <div className="search__content grid pt-16">{children}</div>
      </div>
    </section>
  );
}
