import React from "react";

import ProgressStepIndicator from "./ProgressStepIndicator";

import "./ProgressIndicator.css";

function ProgressIndicator({ steps, activeStepNumber }) {
  return (
    <ul className="progress-indicator flex">
      {steps
        .filter((step) => step.showInProgress)
        .map((step) => {
          return (
            <ProgressStepIndicator
              key={step.id}
              step={step}
              isActive={step.number === activeStepNumber}
            />
          );
        })}
    </ul>
  );
}

export default ProgressIndicator;
