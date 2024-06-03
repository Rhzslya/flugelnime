import React, { useEffect, useState } from "react";
import "./home.css";
import "../../../default-layout.css";

export default function Home({ children }) {
  // Fetch Data Anime List Home

  return (
    <section className="home section w-full flex justify-center px-3">
      <div className="home__container max-w-[826px] lg:max-w-[968px] grid">
        <div className="home__content grid pt-16">{children}</div>
      </div>
    </section>
  );
}
