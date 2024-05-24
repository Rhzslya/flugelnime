import React from "react";
import "./home.css";
import "../../../default-layout.css";

export default function Home({ children }) {
  return (
    <section className="home section">
      <div className="home__container container-grid grid">
        <div className="home__content grid box__content">{children}</div>
      </div>
    </section>
  );
}
