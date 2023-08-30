import React from "react";

import PersonalInfo from "../PersonalInfo";
import ProgressIndicator from "../ProgressIndicator";

import { STEPS, getStepByCode } from "../../utils/steps";

import "./PersonalInfoPage.css";
import StepControl from "../StepControl";

function PersonalInfoPage() {
  return (
    <div className="personal-info-page flex bg-light-blue">
      <ProgressIndicator steps={STEPS} activeStepCode={"PERSONAL_INFO"} />
      <PersonalInfo />
      <StepControl canGoBack={false} isValid={true} isLastPage={false} />
    </div>
  );
}

export default PersonalInfoPage;
