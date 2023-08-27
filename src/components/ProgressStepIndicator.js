import React from "react";

import "./ProgressStepIndicator.css";

function ProgressStepIndicator({ number, title, isActive }) {
  return (
    <li
      className={`progress-step-item fs-400 text-white bg-transparent  ${
        isActive ? "progress-step-indicator--active" : undefined
      }`}
    >
      <p>{number}</p>
    </li>
  );
}

export default ProgressStepIndicator;
