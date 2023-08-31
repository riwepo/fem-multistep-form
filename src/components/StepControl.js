import React from "react";

import "./StepControl.css";

function StepControl({
  canGoBack,
  isValid,
  isLastPage,
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
        className={`btn btn-next ${isLastPage ? "btn-next--last" : undefined}`}
        disabled={!isValid}
        onClick={onFwdClicked}
      >
        {isLastPage ? "Confirm" : "Next step"}
      </button>
    </div>
  );
}

export default StepControl;
