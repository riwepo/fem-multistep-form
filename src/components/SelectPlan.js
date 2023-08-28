import React from "react";

import StepCard from "./StepCard";
import Plan from "./Plan";

import { PLANS, TIME_SPANS, STEPS } from "../utils";

import "./SelectPlan.css";

function SelectPlan() {
  return (
    <StepCard cardInfo={STEPS[1]}>
      <Plan plan={PLANS.arcade} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.advanced} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.pro} timeSpan={TIME_SPANS.month} />
    </StepCard>
  );
}

export default SelectPlan;
