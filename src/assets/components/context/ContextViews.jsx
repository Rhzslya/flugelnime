import React from "react";

const ContextViews = ({ children }) => {
  return (
    <section className="context section w-full flex justify-center px-3">
      <div className="context__container w-[968px] lg:max-w-[968px] grid">
        <div className="context__content grid pt-16">{children}</div>
      </div>
    </section>
  );
};

export default ContextViews;
