import React from "react";
export default function ModalElements({ anime }) {
  return (
    <div className="anime__modal">
      <div className="anime__modal-content">
        <h4>{anime.title}</h4>
        <div className="anime__modal-info">
          <span>{anime.score}</span>
          <span>{anime.duration}</span>
          <span>{anime.type}</span>
        </div>
        <div className="anime__synopsis">
          <p>{anime.synopsis}</p>
        </div>
        <div className="anime__status">
          <span>
            Status : <strong>{anime.status}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
