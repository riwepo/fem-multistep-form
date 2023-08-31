import React, { useState, useContext } from "react";

import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";

import { StepContext } from "../context/step-context";

import {
  STEPS,
  hasPrevStep,
  getPrevStep,
  hasNextStep,
  getNextStep,
} from "../utils/steps";

import "./PageContainer.css";
import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";

function PageContainer() {
  const [activeStepCode, setActiveStepCode] = useState("PERSONAL_INFO");
  const stepContext = useContext(StepContext);
  const isStepValid = stepContext.getIsValid(activeStepCode);

  const isFirstStep = !hasPrevStep(activeStepCode);
  const isLastStep = !hasNextStep(activeStepCode);

  const backClickHandler = () => {
    if (hasPrevStep(activeStepCode)) {
      const prevStep = getPrevStep(activeStepCode);
      setActiveStepCode(prevStep.code);
    }
  };

  const fwdClickHandler = () => {
    if (hasNextStep(activeStepCode)) {
      const nextStep = getNextStep(activeStepCode);
      setActiveStepCode(nextStep.code);
    }
  };

  return (
    <div className="page-container grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepCode={activeStepCode} />
      </div>
      {activeStepCode === "PERSONAL_INFO" && <PersonalInfo />}
      {activeStepCode === "SELECT_PLAN" && <SelectPlan />}
      <StepControl
        canGoBack={!isFirstStep}
        isValid={isStepValid}
        isLastStep={isLastStep}
        onBackClicked={backClickHandler}
        onFwdClicked={fwdClickHandler}
      />
    </div>
  );
}

export default PageContainer;
