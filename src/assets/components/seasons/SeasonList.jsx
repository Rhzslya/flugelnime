import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ScheduleList = () => {
  const [schedule, setSchedule] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const getSchedule = "https://api.jikan.moe/v4/seasons";

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  useEffect(() => {
    getAPI();
  }, []);
  const getAPI = async () => {
    try {
      const response = await fetch(getSchedule);
      const data = await response.json();
      const filteredData = data.data.map((item) => ({
        year: item.year,
        winter: item.seasons[0],
        spring: item.seasons[1],
        summer: item.seasons[2],
        fall: item.seasons[3],
      }));

      const startYear = filteredData.findIndex((item) => item.year === 2000);
      const slicedData =
        startYear !== -1 ? filteredData.slice(0, startYear + 1) : filteredData;
      setSchedule(slicedData);
    } catch (error) {
      console.log("Failed Fetch API");
    }
  };

  const capitalizeFirst = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className=" bg-slate-600 border-4 w-[100%] rounded ">
      <div className="last__title title__list rounded-t">
        <h3 className="text-neutral-100 font-bold text-base bg-slate-600  rounded-t px-6 pt-2 sm:text-xl ">
          All Seasons
        </h3>
      </div>

      <div className="anime__box-list box__list bg-slate-600 px-6">
        <div className="grid  gap-2 min-[293px]:gap-3 md:gap-4 grid-cols min-[240px]:grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4  md:grid-cols-4  lg:grid-cols-5 py-4">
          {schedule.map((item, index) => (
            <div className="" key={index}>
              <div className="relative bg-neutral-100 text-center py-1 rounded-t ">
                <h4 className=" text-sky-300 font-bold text-[14px] text-sm  sm:text-base">
                  {item.year}
                </h4>
              </div>
              <div className="seasons-links rounded-b bg-slate-400  flex flex-col justify-center  text-neutral-100 text-xs sm:text-sm">
                <div className="">
                  <Link
                    to={`/seasons/${item.year}/${item.spring}`}
                    className="block py-[2px] px-[4px] hover:bg-pink-300 te duration-300 font-semibold"
                  >
                    {capitalizeFirst(item.spring)}
                  </Link>
                </div>
                <div className="">
                  <Link
                    to={`/seasons/${item.year}/${item.summer}`}
                    className=" block py-[2px] px-[4px] hover:bg-pink-300 te duration-300 font-semibold"
                  >
                    {capitalizeFirst(item.summer)}
                  </Link>
                </div>
                <div className="">
                  <Link
                    to={`/seasons/${item.year}/${item.fall}`}
                    className="block py-[2px] px-[4px] hover:bg-pink-300 te duration-300 font-semibold"
                  >
                    {capitalizeFirst(item.fall)}
                  </Link>
                </div>
                <div className="">
                  <Link
                    to={`/seasons/${item.year}/${item.winter}`}
                    className=" block py-[2px] px-[4px] hover:bg-pink-300 te duration-300 font-semibold"
                  >
                    {capitalizeFirst(item.winter)}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;
