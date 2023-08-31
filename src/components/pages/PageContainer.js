import React, { useState } from "react";

import ProgressIndicator from "../ProgressIndicator";
import StepControl from "../StepControl";

import { STEPS } from "../../utils/steps";

import "./PageContainer.css";

function PageContainer({ step, children }) {
  const [isPageValid, setIsPageValid] = useState(false);
  const validChangeHandler = (state) => {
    const isValid = Object.values(state).every((item) => item === true);
    setIsPageValid(isValid);
  };

  return (
    <div className="page-container grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepCode={step.code} />
      </div>
      <div className="child-container">{children}</div>
      <StepControl canGoBack={false} isValid={isPageValid} isLastPage={false} />
    </div>
  );
}

export default PageContainer;
