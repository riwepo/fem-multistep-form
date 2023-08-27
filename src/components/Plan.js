import React from "react";

import { getIcon, getPrice } from "../utils";

import "./Plan.css";

function Plan({ plan, timeSpan }) {
  const path = getIcon(plan);
  console.log(path);
  return (
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
  );
}

export default Plan;
