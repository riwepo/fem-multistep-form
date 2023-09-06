import React from "react";

import "./StepControl.css";

function StepControl({
  canGoBack,
  isValid,
  isConfirm,
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
        className={`btn btn-next ${isConfirm ? "btn-next--last" : undefined}`}
        disabled={!isValid}
        onClick={onFwdClicked}
      >
        {isConfirm ? "Confirm" : "Next step"}
      </button>
    </div>
  );
}

export default StepControl;
