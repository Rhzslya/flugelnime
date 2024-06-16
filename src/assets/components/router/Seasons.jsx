const Seasons = ({ children }) => {
  return (
    <section className="schedule section w-full flex justify-center px-3">
      <div className="schedule__container w-[968px] lg:max-w-[968px] grid">
        <div className="schedule__content min-[430px]:pt-8 pt-12 md:pt-0">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Seasons;
