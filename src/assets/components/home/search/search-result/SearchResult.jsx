import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./search-result.css";

export default function SearchResult({ setSearchAnimes, children }) {
  useEffect(() => {
    return () => {
      setSearchAnimes([]);
    };
  }, []);

  return (
    <section className="search__result section">
      <div className="search__result container-grid grid">
        <div className="search__content grid">{children}</div>
      </div>
    </section>
  );
}
