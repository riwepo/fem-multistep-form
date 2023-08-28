import React from "react";

import Card from "./Card";

import { getIcon, getPrice } from "../utils";

import "./Plan.css";

function Plan({ plan, timeSpan }) {
  return (
    <Card>
      <div className="plan flex">
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
