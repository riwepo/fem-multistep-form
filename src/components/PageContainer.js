import React, { useState, useContext } from "react";

import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";
import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";
import PickAddOns from "./PickAddOns";
import FinishUp from "./FinishUp";

import { StepContext } from "../context/step-context";

import {
  STEPS,
  hasPrevStep,
  getPrevStep,
  hasNextStep,
  getNextStep,
  getStepByCode,
} from "../utils/steps";
import { TIME_SPANS, getTimespanByCode } from "../utils/timespans";

import "./PageContainer.css";
import ThankYou from "./ThankYou";

function PageContainer() {
  const [activeStepCode, setActiveStepCode] = useState(STEPS[0].code);
  const [activeTimespanCode, setActiveTimespanCode] = useState(
    TIME_SPANS[0].code
  );
  const stepContext = useContext(StepContext);
  const isStepValid = stepContext.isStepValid(activeStepCode);
  const isFirstStep = !hasPrevStep(activeStepCode);

  const backClickHandler = () => {
    if (hasPrevStep(activeStepCode)) {
      const prevStep = getPrevStep(activeStepCode);
      setActiveStepCode(prevStep.code);
    }
  };

  const fwdClickHandler = () => {
    if (isStepValid && hasNextStep(activeStepCode)) {
      const nextStep = getNextStep(activeStepCode);
      setActiveStepCode(nextStep.code);
    }
  };

  const timerspanChangeHandler = (timespanCode) => {
    setActiveTimespanCode(timespanCode);
  };

  const goToPlanHandler = () => {
    setActiveStepCode("SELECT_PLAN");
  };

  const activeTimespan = getTimespanByCode(activeTimespanCode);
  const activeStep = getStepByCode(activeStepCode);

  return (
    <div className="page-container grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepNumber={activeStep.number} />
      </div>
      {activeStepCode === "PERSONAL_INFO" && <PersonalInfo />}
      {activeStepCode === "SELECT_PLAN" && (
        <SelectPlan
          timespan={activeTimespan}
          onTimespanChange={timerspanChangeHandler}
        />
      )}
      {activeStepCode === "PICK_ADD_ONS" && (
        <PickAddOns timespan={activeTimespan} />
      )}
      {activeStepCode === "FINISH_UP" && (
        <FinishUp timespan={activeTimespan} onGoToPlanClick={goToPlanHandler} />
      )}
      {activeStepCode === "THANK_YOU" && <ThankYou />}
      {activeStep.nextStep !== "NONE" && (
        <StepControl
          canGoBack={!isFirstStep}
          isValid={isStepValid}
          isConfirm={activeStep.nextStep === "CONFIRM"}
          onBackClicked={backClickHandler}
          onFwdClicked={fwdClickHandler}
        />
      )}
    </div>
  );
}

export default PageContainer;
