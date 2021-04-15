import "./style.scss";
import React from "react";

export default function Loading() {
  return (
    <div className="loading">
      <p>Lade Daten...</p>
      <ul className="loading-wheel">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
