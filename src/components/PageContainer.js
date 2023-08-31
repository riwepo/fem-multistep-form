import React, { useState, useContext } from "react";

import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";

import { StepContext } from "../context/step-context";

import { STEPS } from "../utils/steps";

import "./PageContainer.css";
import PersonalInfo from "./PersonalInfo";
import SelectPlan from "./SelectPlan";

function PageContainer() {
  const [activeStepCode, setActiveStepCode] = useState("PERSONAL_INFO");
  const stepContext = useContext(StepContext);
  const isStepValid = stepContext.getIsValid(activeStepCode);

  const backClickHandler = () => {
    console.log("back clicked");
  };

  const fwdClickHandler = () => {
    console.log("fwd clicked");
  };

  return (
    <div className="page-container grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepCode={activeStepCode} />
      </div>
      {activeStepCode === "PERSONAL_INFO" && <PersonalInfo />}
      {activeStepCode === "SELECT_PLAN" && <SelectPlan />}
      <StepControl
        canGoBack={false}
        isValid={isStepValid}
        isLastPage={false}
        onBackClicked={backClickHandler}
        onFwdClicked={fwdClickHandler}
      />
    </div>
  );
}

export default PageContainer;
