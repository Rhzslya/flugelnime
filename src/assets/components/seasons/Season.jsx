const Season = ({ children }) => {
  return (
    <section className="season section w-full flex justify-center px-3 dark:bg-slate-800">
      <div className="season__container w-[968px] lg:max-w-[968px] grid">
        <div className="season__content grid min-[430px]:pt-8 pt-12 md:pt-0">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Season;
