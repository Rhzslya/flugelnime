import React, { useState, useEffect } from "react";

export default function Ongoing({ children }) {
  return (
    <div className="ongoing section">
      <div className="ongoing__container container-grid grid rounded ">
        <div className="box__content ">
          <div className="last__title title__list rounded-t">
            <h3>Last Update</h3>
          </div>
          <div className="ongoing__content grid p-4 bg-slate-600 rounded-b ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
