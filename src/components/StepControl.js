import React, { useRef } from "react";

import "./StepControl.css";

function StepControl({
  canGoBack,
  isValid,
  isConfirm,
  onBackClicked,
  onFwdClicked,
}) {
  const backButtonRef = useRef(null);
  const fwdButtonRef = useRef(null);

  const backClickHandler = () => {
    backButtonRef.current.blur();
    onBackClicked();
  };
  const fwdClickHandler = () => {
    fwdButtonRef.current.blur();
    onFwdClicked();
  };
  return (
    <div className="step-control flex">
      <button
        className={`btn btn-back ${
          canGoBack ? "btn-back--visible" : undefined
        }`}
        onClick={backClickHandler}
        ref={backButtonRef}
      >
        Go back
      </button>
      <button
        className={`btn btn-next ${isConfirm ? "btn-next--last" : undefined}`}
        disabled={!isValid}
        onClick={fwdClickHandler}
        ref={fwdButtonRef}
      >
        {isConfirm ? "Confirm" : "Next step"}
      </button>
    </div>
  );
}

export default StepControl;
