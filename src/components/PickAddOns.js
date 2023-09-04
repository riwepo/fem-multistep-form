import React, { useContext, useEffect, useState } from "react";

import StepCard from "./StepCard";
import AddOn from "./AddOn";

import { StepContext } from "../context/step-context";

import { ADD_ONS } from "../utils/addOns";
import { getStepByCode } from "../utils/steps";

import "./PickAddOns.css";

const STEP_CODE = "PICK_ADD_ONS";

function PickAddOns({ timespan }) {
  const stepContext = useContext(StepContext);

  // // on first render, set state of form from the context
  // useEffect(() => {
  //   const stepFieldState = stepContext.getStepFieldState(
  //     STEP_CODE,
  //     "selected_plan"
  //   );
  //   const _selectedPlan = stepFieldState.value;
  // }, []);

  const pickAddOnsStep = getStepByCode(STEP_CODE);

  return (
    <StepCard className="pick-add-ons" stepInfo={pickAddOnsStep}>
      {ADD_ONS.map((addOn) => {
        return <AddOn key={addOn.id} addOn={addOn} timespan={timespan} />;
      })}
    </StepCard>
  );
}

export default PickAddOns;
