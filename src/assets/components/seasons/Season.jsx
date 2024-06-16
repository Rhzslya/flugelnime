import React from "react";

const Season = ({ children }) => {
  return (
    <section className="season section w-full flex justify-center px-3">
      <div className="season__container w-[968px] lg:max-w-[968px] grid">
        <div className="season__content grid  pt-8 md:pt-0">{children}</div>
      </div>
    </section>
  );
};

export default Season;
