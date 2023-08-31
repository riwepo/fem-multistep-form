import React, { useState } from "react";

import SelectPlan from "../SelectPlan";
import ProgressIndicator from "../ProgressIndicator";

import { STEPS } from "../../utils/steps";

import "./SelectPlanPage.css";
import StepControl from "../StepControl";

function SelectPlanPage() {
  const [isPageValid, setIsPageValid] = useState(false);
  const validChangeHandler = (state) => {
    const isValid = Object.values(state).every((item) => item === true);
    setIsPageValid(isValid);
  };
  return (
    <div className="select-plan-page grid">
      <div className="progress-container">
        <ProgressIndicator steps={STEPS} activeStepCode={"SELECT_PLAN"} />
      </div>

      <SelectPlan onValidChange={validChangeHandler} />
      <StepControl canGoBack={false} isValid={isPageValid} isLastPage={false} />
    </div>
  );
}

export default SelectPlanPage;
