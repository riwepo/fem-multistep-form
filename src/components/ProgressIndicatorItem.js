import React from "react";

import "./ProgressIndicatorItem.css";

function ProgressIndicatorItem({ step, isActive }) {
  return (
    <li
      className={`progress-indicator-item fs-400 text-white bg-transparent  ${
        isActive ? "progress-indicator-item--active" : undefined
      }`}
    >
      <p>{step}</p>
    </li>
  );
}

export default ProgressIndicatorItem;
