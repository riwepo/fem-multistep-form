import React from "react";

import ProgressStepIndicator from "./ProgressStepIndicator";

import "./ProgressIndicator.css";

function ProgressIndicator({ steps, activeStepCode }) {
  return (
    <ul className="progress-indicator flex">
      {steps.map((step) => {
        return (
          <ProgressStepIndicator
            key={step.id}
            step={step}
            isActive={step.code === activeStepCode}
          />
        );
      })}
    </ul>
  );
}

export default ProgressIndicator;
