import React from "react";

import "./ProgressStepIndicator.css";

function ProgressStepIndicator({ step, isActive }) {
  return (
    <li className="progress-step-indicator flex">
      <p
        className={`indicator fs-500 text-white bg-transparent ${
          isActive ? "indicator--active" : undefined
        }`}
      >
        {step.number}
      </p>
      <div className="info">
        <p className="step-name fs-500 uppercase letter-spacing-3 text-white">{`STEP ${step.number}`}</p>
        <p className="title fs-500 uppercase letter-spacing-3 text-white">
          {step.title}
        </p>
      </div>
    </li>
  );
}

export default ProgressStepIndicator;
