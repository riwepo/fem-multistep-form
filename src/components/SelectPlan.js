import React, { useContext, useEffect, useState } from "react";

import StepCard from "./StepCard";
import Plan from "./Plan";
import MonthYearToggleSwitch from "./MonthYearToggleSwitch";

import { StepContext } from "../context/step-context";

import { PLANS } from "../utils/plans";
import { getStepByCode } from "../utils/steps";

import "./SelectPlan.css";

const STEP_CODE = "SELECT_PLAN";

function SelectPlan({ timespan, onTimespanChange }) {
  const stepContext = useContext(StepContext);
  const [selectedPlanCode, setSelectedPlanCode] = useState();

  // on first render, set state of form from the context
  useEffect(() => {
    const isStepInitialised = stepContext.isStepInitialised(STEP_CODE);
    if (!isStepInitialised) return;
    const selectedPlanCode = stepContext.getSelectedPlanCode();
    setSelectedPlanCode(selectedPlanCode);
  }, []);

  const activateHandler = (planCode) => {
    setSelectedPlanCode(planCode);
    stepContext.setSelectedPlanCode(planCode);
  };

  const timespanChangeHandler = (isToggleActive) => {
    const newTimeSpanCode = isToggleActive ? "YEAR" : "MONTH";
    onTimespanChange(newTimeSpanCode);
  };

  const selectPlanStep = getStepByCode(STEP_CODE);

  return (
    <StepCard
      className="select-plan"
      stepInfo={selectPlanStep}
      autoFocus={false}
    >
      {PLANS.map((plan) => {
        return (
          <Plan
            key={plan.id}
            plan={plan}
            timeSpan={timespan}
            isActive={selectedPlanCode === plan.code}
            autoFocus={plan.id === 1}
            onActivated={activateHandler}
          />
        );
      })}

      <MonthYearToggleSwitch
        activeTimespan={timespan}
        onTimespanChange={timespanChangeHandler}
      />
    </StepCard>
  );
}

export default SelectPlan;
