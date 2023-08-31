import React, { useContext, useState } from "react";

import StepCard from "./StepCard";
import Plan from "./Plan";
import MonthYearToggleSwitch from "./MonthYearToggleSwitch";

import { StepContext } from "../context/step-context";

import { PLANS } from "../utils/plans";
import { getStepByCode } from "../utils/steps";
import { TIME_SPANS, getTimespanByCode } from "../utils/timespans";

import "./SelectPlan.css";

function SelectPlan() {
  const [activePlanCode, setActivePlanCode] = useState("");
  const stepContext = useContext(StepContext);

  const activateHandler = (planCode) => {
    setActivePlanCode(planCode);
    stepContext.setIsValid("SELECT_PLAN", true);
  };
  const [activeTimeSpanCode, setActiveTimespanCode] = useState(
    TIME_SPANS[0].code
  );
  const timespanChangeHandler = (isToggleActive) => {
    const newTimeSpanCode = isToggleActive ? "MONTH" : "YEAR";
    setActiveTimespanCode(newTimeSpanCode);
  };
  const activeTimespan = getTimespanByCode(activeTimeSpanCode);

  const selectPlanStep = getStepByCode("SELECT_PLAN");

  return (
    <StepCard className="select-plan" stepInfo={selectPlanStep}>
      {PLANS.map((plan) => {
        return (
          <Plan
            key={plan.id}
            plan={plan}
            timeSpan={activeTimespan}
            isActive={activePlanCode === plan.code}
            onActivated={activateHandler}
          />
        );
      })}

      <MonthYearToggleSwitch
        activeTimespan={activeTimespan}
        onTimespanChange={timespanChangeHandler}
      />
    </StepCard>
  );
}

export default SelectPlan;
