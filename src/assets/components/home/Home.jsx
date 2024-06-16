import React, { useEffect, useState } from "react";
import "./home.css";

export default function Home({ children }) {
  return (
    <section className="home section w-full flex justify-center px-3">
      <div className="home__container max-w-[826px] lg:max-w-[968px] grid">
        <div className="home__content grid min-[430px]:pt-8 pt-12 md:pt-0 ">
          {children}
        </div>
      </div>
    </section>
  );
}
