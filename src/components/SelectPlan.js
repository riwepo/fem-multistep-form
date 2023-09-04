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
  const [selectedPlan, setSelectedPlan] = useState();

  // on first render, set state of form from the context
  useEffect(() => {
    const stepFieldState = stepContext.getStepFieldState(
      STEP_CODE,
      "selected_plan"
    );
    const _selectedPlan = stepFieldState.value;
    setSelectedPlan(_selectedPlan);
  }, []);

  const activateHandler = (planCode) => {
    setSelectedPlan(planCode);
    stepContext.setStepFieldState(STEP_CODE, "selected_plan", planCode, true);
  };

  const timespanChangeHandler = (isToggleActive) => {
    const newTimeSpanCode = isToggleActive ? "MONTH" : "YEAR";
    onTimespanChange(newTimeSpanCode);
  };

  const selectPlanStep = getStepByCode(STEP_CODE);

  return (
    <StepCard className="select-plan" stepInfo={selectPlanStep}>
      {PLANS.map((plan) => {
        return (
          <Plan
            key={plan.id}
            plan={plan}
            timeSpan={timespan}
            isActive={selectedPlan === plan.code}
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
