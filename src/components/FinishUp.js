import React, { useContext } from "react";

import Card from "./Card";
import StepCard from "./StepCard";

import { StepContext } from "../context/step-context";

import { ADD_ONS, getAddOnByCode } from "../utils/addOns";
import { getStepByCode } from "../utils/steps";

import "./PickAddOns.css";
import { getPlanByCode } from "../utils/plans";
import { getPriceDisplay } from "../utils/utils";

const STEP_CODE = "FINISH_UP";

const getSelectedPlan = (stepContext) => {
  const selectedPlanFieldState = stepContext.getStepFieldState(
    "SELECT_PLAN",
    "selected_plan"
  );
  const selectedPlanCode = selectedPlanFieldState.value;
  const selectedPlan = getPlanByCode(selectedPlanCode);
  return selectedPlan;
};

const getSelectedAddOnCodes = (stepContext) => {
  const addOnFieldStates = ADD_ONS.map((addOn) => {
    return stepContext.getStepFieldState("PICK_ADD_ONS", addOn.code);
  });
  const selectedAddOnFields = addOnFieldStates.filter(
    (addOn) => addOn.value === true.toString()
  );
  const selectedAddOnCodes = selectedAddOnFields.map((field) => field.code);
  return selectedAddOnCodes;
};

const finishUpStep = getStepByCode(STEP_CODE);

const displayAddOn = (addOnCode, timespan) => {
  const addOn = getAddOnByCode(addOnCode);
  return (
    <div key={addOn.id} className="flex">
      <p>{addOn.name}</p>
      <p className="fw-bolder">{getPriceDisplay(addOn, timespan)}</p>
    </div>
  );
};

function FinishUp({ timespan }) {
  const stepContext = useContext(StepContext);
  const selectedPlan = getSelectedPlan(stepContext);
  const selectedAddOnCodes = getSelectedAddOnCodes(stepContext);

  return (
    <StepCard className="finish-up" stepInfo={finishUpStep}>
      <Card className="container bg-light-gray text-marine-blue" onClick={null}>
        <div className="flex">
          <p className="fs-400 fw-bold text-marine-blue capitalize">{`${selectedPlan.name} (${timespan.name})`}</p>
          <p className="fs-400 fw-bold text-marine-blue">
            {getPriceDisplay(selectedPlan, timespan)}
          </p>
        </div>
        {selectedAddOnCodes.map((addOnCode) => {
          return displayAddOn(addOnCode, timespan);
        })}
      </Card>
    </StepCard>
  );
}

export default FinishUp;
