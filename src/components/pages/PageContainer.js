import React, { useContext } from "react";

import ProgressIndicator from "../ProgressIndicator";
import StepControl from "../StepControl";

import { StepContext } from "../../context/step-context";

import { STEPS } from "../../utils/steps";

import "./PageContainer.css";

function PageContainer({ step, children }) {
  const stepContext = useContext(StepContext);
  const isStepValid = stepContext.getIsValid(step.code);

  return (
    <div className="page-container grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepCode={step.code} />
      </div>
      <div className="child-container">{children}</div>
      <StepControl canGoBack={false} isValid={isStepValid} isLastPage={false} />
    </div>
  );
}

export default PageContainer;
