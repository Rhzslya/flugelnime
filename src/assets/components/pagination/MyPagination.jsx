import "./mypagination.css";

export default function MyPagination({
  currentPage,
  pageNumbers,
  onPageChange,
}) {
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
    <div className="bg-slate-600">
      <nav>
        <ul className="flex justify-center items-center min-h-[50px] py-2">
          <li>
            <button
              className={`flex justify-center items-center text-sm bg-sky-100 py-1 px-2 rounded-s-lg border border-gray-700 font-medium hover:bg-sky-300 hover:text-neutral-100 duration-300 ${
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
                className={`flex justify-center items-center  py-1 px-3 border-y border-r border-gray-700 font-medium hover:bg-sky-300 hover:text-neutral-100 duration-300 ${
                  currentPage === page
                    ? "bg-sky-300 text-neutral-100 text-base"
                    : "bg-sky-100 text-sm"
                }`}
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
              className={`flex justify-center items-center text-sm bg-sky-100 py-1 px-2 rounded-e-lg border-y border-r border-gray-700 font-medium hover:bg-sky-300 hover:text-neutral-100 duration-300 ${
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
