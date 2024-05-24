import React, { useEffect, useState } from "react";
import "./mypagination.css";

import { Pagination } from "flowbite-react";

export default function MyPagination({
  currentPage,
  pageNumbers,
  onPageChange,
}) {
  return (
    <div className="box__pagination">
      <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers.length}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
