import React, { useContext, useEffect, useState } from "react";

import StepCard from "./StepCard";
import Plan from "./Plan";
import MonthYearToggleSwitch from "./MonthYearToggleSwitch";

import { StepContext } from "../context/step-context";

import { PLANS } from "../utils/plans";
import { getStepByCode } from "../utils/steps";
import { TIME_SPANS, getTimespanByCode } from "../utils/timespans";

import "./SelectPlan.css";

const STEP_CODE = "SELECT_PLAN";

function SelectPlan() {
  const stepContext = useContext(StepContext);
  const [activeTimeSpanCode, setActiveTimespanCode] = useState(
    TIME_SPANS[0].code
  );
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
            isActive={selectedPlan === plan.code}
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
