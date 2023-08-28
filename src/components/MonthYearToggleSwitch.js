import React, { useState } from "react";

import Card from "./Card";
import ToggleSwitch from "./ToggleSwitch";

import "./MonthYearToggleSwitch.css";

function MonthYearToggleSwitch() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Card>
      <div className="month-year-toggle-switch flex">
        <p
          className={`month-title ${
            !isActive ? "month-title--active" : undefined
          }`}
        >
          Monthly
        </p>
        <ToggleSwitch isActive={isActive} onChange={setIsActive} />
        <p
          className={`year-title ${
            isActive ? "year-title--active" : undefined
          }`}
        >
          Yearly
        </p>
      </div>
    </Card>
  );
}

export default MonthYearToggleSwitch;
