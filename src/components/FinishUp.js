import React, { useContext } from "react";

import Card from "./Card";
import StepCard from "./StepCard";

import { StepContext } from "../context/step-context";

import { ADD_ONS, getAddOnByCode } from "../utils/addOns";
import { getStepByCode } from "../utils/steps";

import { getPlanByCode } from "../utils/plans";
import { getPriceDisplay, getTotalPriceDisplay } from "../utils/utils";

import "./FinishUp.css";

const STEP_CODE = "FINISH_UP";

const getSelectedPlan = (stepContext) => {
  const selectedPlanCode = stepContext.getSelectedPlanCode();
  const selectedPlan = getPlanByCode(selectedPlanCode);
  return selectedPlan;
};

const getSelectedAddOnCodes = (stepContext) => {
  const addOnStates = ADD_ONS.map((addOn) => {
    return stepContext.getAddOn(addOn.code);
  });
  const selectedAddOns = addOnStates.filter((addOn) => addOn.isSelected);
  const selectedAddOnCodes = selectedAddOns.map(
    (addOnState) => addOnState.code
  );
  return selectedAddOnCodes;
};

const finishUpStep = getStepByCode(STEP_CODE);

const displayAddOn = (addOnCode, timespan) => {
  const addOn = getAddOnByCode(addOnCode);
  return (
    <div key={addOn.id} className="add-on-container flex">
      <p>{addOn.name}</p>
      <p className="fw-bolder">+{getPriceDisplay(addOn, timespan)}</p>
    </div>
  );
};

const getTotalPriceDisplayFromContext = (stepContext, timespan) => {
  const selectedPlan = getSelectedPlan(stepContext);
  const selectedAddOnCodes = getSelectedAddOnCodes(stepContext);
  const selectedAddOns = selectedAddOnCodes.map((code) => getAddOnByCode(code));
  const items = [selectedPlan, ...selectedAddOns];
  const totalPriceDisplay = getTotalPriceDisplay(items, timespan);
  return totalPriceDisplay;
};

function FinishUp({ timespan, onGoToPlanClick }) {
  const stepContext = useContext(StepContext);
  const selectedPlan = getSelectedPlan(stepContext);
  const selectedAddOnCodes = getSelectedAddOnCodes(stepContext);

  return (
    <StepCard className="finish-up" stepInfo={finishUpStep}>
      <Card className="container bg-light-gray text-marine-blue" onClick={null}>
        <div className="plan-container flex">
          <div>
            <p className="fs-400 fw-bold text-marine-blue capitalize">{`${selectedPlan.name} (${timespan.name})`}</p>
            <button onClick={onGoToPlanClick}>Change</button>
          </div>
          <p className="fs-400 fw-bold text-marine-blue">
            {getPriceDisplay(selectedPlan, timespan)}
          </p>
        </div>
        {selectedAddOnCodes.map((addOnCode) => {
          return displayAddOn(addOnCode, timespan);
        })}
      </Card>
      <div className="total-container flex">
        <p>{`Total (per ${timespan.code.toLowerCase()})`}</p>
        <p className="fs-500 text-purplish-blue fw-bold">
          {getTotalPriceDisplayFromContext(stepContext, timespan)}
        </p>
      </div>
    </StepCard>
  );
}

export default FinishUp;
