import React, { useState, useContext, useEffect } from "react";

import Card from "./Card";
import Checkbox from "./Checkbox";

import { StepContext } from "../context/step-context";

import { getPriceDisplay } from "../utils/utils";

import "./AddOn.css";

const STEP_CODE = "PICK_ADD_ONS";

function AddOn({ addOn, timespan }) {
  const [isActive, setIsActive] = useState(false);
  const stepContext = useContext(StepContext);

  // on first render, set state of form from the context
  useEffect(() => {
    const stepFieldState = stepContext.getStepFieldState(STEP_CODE, addOn.code);
    setIsActive(stepFieldState.value === true.toString());
  }, []);

  const clickHandler = () => {
    setIsActive((current) => !current);
    stepContext.setStepFieldState(
      STEP_CODE,
      addOn.code,
      (!isActive).toString(),
      true
    );
  };
  return (
    <Card
      className={`add-on ${isActive ? "add-on--active" : undefined}`}
      onClick={clickHandler}
    >
      <div className="container flex">
        <Checkbox isActive={isActive} />
        <div>
          <p className="text-marine-blue">{addOn.name}</p>
          <p>{addOn.description}</p>
        </div>
        <p className="text-purplish-blue">
          +{getPriceDisplay(addOn, timespan)}
        </p>
      </div>
    </Card>
  );
}

export default AddOn;
