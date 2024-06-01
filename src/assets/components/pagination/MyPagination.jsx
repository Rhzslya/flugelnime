import React, { useEffect, useState } from "react";
import "./mypagination.css";

export default function MyPagination({
  currentPage,
  pageNumbers,
  onPageChange,
}) {
  const [visiblePrevious, setVisiblePrevious] = useState(false);
  const totalPages = pageNumbers.length;
  let startPage, endPage;

  if (totalPages <= 3) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage === 1) {
    startPage = 1;
    endPage = 3;
  } else if (currentPage === totalPages) {
    startPage = totalPages - 2;
    endPage = totalPages;
  } else {
    startPage = currentPage - 1;
    endPage = currentPage + 1;
  }

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);
  return (
    <div className="box__pagination">
      <nav>
        <ul className="pagination">
          <li>
            <button
              className={`pagination-button hover:bg-slate-300 ${
                currentPage === 1 ? "hidden" : ""
              }`}
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            >
              Previous
            </button>
          </li>
          {visiblePages.map((page) => (
            <li key={page}>
              <button
                className={`pagination-button ${
                  currentPage === page ? "active" : ""
                } hover:bg-slate-300`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className={`pagination-button hover:bg-slate-300 ${
                currentPage === totalPages ? "hidden" : ""
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
