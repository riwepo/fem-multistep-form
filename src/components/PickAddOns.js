import React from "react";

import StepCard from "./StepCard";
import AddOn from "./AddOn";
import { ADD_ONS } from "../utils/addOns";
import { getStepByCode } from "../utils/steps";

import "./PickAddOns.css";

const STEP_CODE = "PICK_ADD_ONS";

function PickAddOns({ timespan }) {
  const pickAddOnsStep = getStepByCode(STEP_CODE);
  return (
    <StepCard className="pick-add-ons" stepInfo={pickAddOnsStep} autoFocus={false}>
      {ADD_ONS.map((addOn) => {
        return <AddOn key={addOn.id} addOn={addOn} timespan={timespan} autoFocus={addOn.id === 1} />;
      })}
    </StepCard>
  );
}

export default PickAddOns;
