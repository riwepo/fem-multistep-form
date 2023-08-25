import React from "react";

import "./StepControl.css";

function StepControl({ canGoBack, isValid, isLastPage }) {
  return (
    <div className="step-control flex">
      <button
        className={`btn btn-back ${
          canGoBack ? "btn-back--visible" : undefined
        }`}
      >
        Go back
      </button>
      <button
        className={`btn btn-next ${isLastPage ? "btn-next--last" : undefined}`}
        disabled={!isValid}
      >
        {isLastPage ? "Confirm" : "Next step"}
      </button>
    </div>
  );
}

export default StepControl;
