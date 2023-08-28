import React, { useState } from "react";

import StepCard from "./StepCard";
import Plan from "./Plan";

import { PLANS, TIME_SPANS, STEPS } from "../utils";

import "./SelectPlan.css";

function SelectPlan() {
  const [activePlanId, setActivePlanId] = useState("1");
  const activateHandler = (planId) => {
    setActivePlanId(planId);
  };
  return (
    <StepCard cardInfo={STEPS[1]}>
      <Plan
        plan={PLANS.arcade}
        timeSpan={TIME_SPANS.month}
        isActive={activePlanId === PLANS.arcade.id}
        onActivated={activateHandler}
      />
      <Plan
        plan={PLANS.advanced}
        timeSpan={TIME_SPANS.month}
        isActive={activePlanId === PLANS.advanced.id}
        onActivated={activateHandler}
      />
      <Plan
        plan={PLANS.pro}
        timeSpan={TIME_SPANS.month}
        isActive={activePlanId === PLANS.pro.id}
        onActivated={activateHandler}
      />
    </StepCard>
  );
}

export default SelectPlan;
