import React from "react";
import AnimeDetail from "./AnimeDetail";
const Detail = () => {
  return (
    <section className="detail section w-full flex justify-center px-3 dark:bg-slate-800">
      <div className="detail__container max-w-[826px] lg:max-w-[968px] grid">
        <div className="detail__content grid pt-16">
          <AnimeDetail />
        </div>
      </div>
    </section>
  );
};

export default Detail;
