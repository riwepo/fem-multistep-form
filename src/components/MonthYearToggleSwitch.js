import React from "react";

import Card from "./Card";
import ToggleSwitch from "./ToggleSwitch";

import { getTimespanByCode } from "../utils/timespans";

import "./MonthYearToggleSwitch.css";

const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

function MonthYearToggleSwitch({ activeTimespan, onTimespanChange }) {
  const isMonthSelected = activeTimespan === monthlyTimespan;
  const isYearSelected = activeTimespan === yearlyTimespan;
  return (
    <Card className="month-year-toggle-switch flex" onClick={null}>
      <p
        className={`month-title ${
          isMonthSelected ? "month-title--active" : undefined
        }`}
        aria-selected={isMonthSelected}
      >
        Monthly
      </p>
      <ToggleSwitch isActive={isYearSelected} onChange={onTimespanChange} />
      <p
        className={`year-title ${
          isYearSelected ? "year-title--active" : undefined
        }`}
        aria-selected={isYearSelected}
      >
        Yearly
      </p>
    </Card>
  );
}

export default MonthYearToggleSwitch;
