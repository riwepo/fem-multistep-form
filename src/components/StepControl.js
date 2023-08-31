import React from "react";

import "./StepControl.css";

function StepControl({
  canGoBack,
  isValid,
  isLastStep,
  onBackClicked,
  onFwdClicked,
}) {
  return (
    <div className="step-control flex">
      <button
        className={`btn btn-back ${
          canGoBack ? "btn-back--visible" : undefined
        }`}
        onClick={onBackClicked}
      >
        Go back
      </button>
      <button
        className={`btn btn-next ${isLastStep ? "btn-next--last" : undefined}`}
        disabled={!isValid}
        onClick={onFwdClicked}
      >
        {isLastStep ? "Confirm" : "Next step"}
      </button>
    </div>
  );
}

export default StepControl;
