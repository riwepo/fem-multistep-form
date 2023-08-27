import React from "react";

import "./ProgressStepIndicator.css";

function ProgressStepIndicator({ number, title, isActive }) {
  return (
    <li className="progress-step-indicator flex">
      <p
        className={`indicator fs-500 text-white bg-transparent ${
          isActive ? "progress-step-indicator--active" : undefined
        }`}
      >
        {number}
      </p>
      <div className="info">
        <p className="step-name fs-500 uppercase letter-spacing-3 text-white">{`STEP ${number}`}</p>
        <p className="title fs-500 uppercase letter-spacing-3 text-white">
          {title}
        </p>
      </div>
    </li>
  );
}

export default ProgressStepIndicator;
