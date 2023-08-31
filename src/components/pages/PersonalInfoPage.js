import React, { useState } from "react";

import PersonalInfo from "../PersonalInfo";
import ProgressIndicator from "../ProgressIndicator";

import { STEPS } from "../../utils/steps";

import "./PersonalInfoPage.css";
import StepControl from "../StepControl";

function PersonalInfoPage() {
  const [isPageValid, setIsPageValid] = useState(false);
  const validChangeHandler = (state) => {
    const isValid = Object.values(state).every((item) => item === true);
    setIsPageValid(isValid);
  };
  return (
    <div className="personal-info-page grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepCode={"PERSONAL_INFO"} />
      </div>

      <PersonalInfo onValidChange={validChangeHandler} />
      <StepControl canGoBack={false} isValid={isPageValid} isLastPage={false} />
    </div>
  );
}

export default PersonalInfoPage;
