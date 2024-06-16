import React from "react";

const NotFoundPage = ({ errorMessage }) => {
  return (
    <div className="flex items-center flex-col">
      <img
        src="/flugelnime/404.png"
        alt="error"
        className="block max-h-[800px]"
      />
      <h3 className="text-pink-500 font-bold text-base sm:text-xl text-center">
        Page Not Found {errorMessage}
      </h3>
    </div>
  );
};

export default NotFoundPage;
