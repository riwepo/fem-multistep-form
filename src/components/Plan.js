import React from "react";

import Card from "./Card";

import { getIconFilepath, getPriceDisplay } from "../utils/utils";

import "./Plan.css";

function Plan({ plan, timeSpan, isActive, autoFocus, onActivated }) {
  const clickHandler = (event) => {
    onActivated && onActivated(plan.code);
  };
  return (
    <Card
      className={`plan flex ${isActive ? "plan--active" : undefined}`}
      autoFocus={autoFocus}
      onClick={clickHandler}
    >
      <img src={getIconFilepath(plan)} alt="plan icon" />
      <div>
        <h2 className="text-marine-blue capitalize">{plan.name}</h2>
        <p className="text-cool-grey">{getPriceDisplay(plan, timeSpan)}</p>
        <p
          className={`bonus ${
            timeSpan.hasBonus ? "bonus--active" : undefined
          } text-marine-blue`}
        >
          2 months free
        </p>
      </div>
    </Card>
  );
}

export default Plan;
