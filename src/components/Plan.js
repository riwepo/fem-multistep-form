import React from "react";

import Card from "./Card";

import { getIcon, getPrice } from "../utils";

import "./Plan.css";

function Plan({ plan, timeSpan, isActive, onActivated }) {
  const clickHandler = (event) => {
    onActivated && onActivated();
  };
  return (
    <Card className={`card-plan ${isActive ? "card-plan--active" : undefined}`}>
      <div className="plan flex" onClick={clickHandler}>
        <img src={getIcon(plan)} alt="plan icon" />
        <div>
          <h2 className="text-marine-blue capitalize">{plan.name}</h2>
          <p className="text-cool-grey">{`$${getPrice(plan, timeSpan)}/${
            timeSpan.display
          }`}</p>
          <p
            className={`bonus ${
              timeSpan.hasBonus ? "bonus--active" : undefined
            } text-marine-blue`}
          >
            2 months free
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Plan;
