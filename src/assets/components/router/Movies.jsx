import React, { useEffect, useState } from "react";

export default function Movies({ children }) {
  return (
    <section className="movies section">
      <div className="movies__container container-grid grid">{children}</div>
    </section>
  );
}
