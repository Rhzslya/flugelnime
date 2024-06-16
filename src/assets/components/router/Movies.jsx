export default function Movies({ children }) {
  return (
    <section className="movies section w-full flex justify-center px-3">
      <div className="movies__container w-[968px] lg:max-w-[968px] grid">
        <div className="movies__content grid min-[430px]:pt-8 pt-12 md:pt-0">
          {children}
        </div>
      </div>
    </section>
  );
}
