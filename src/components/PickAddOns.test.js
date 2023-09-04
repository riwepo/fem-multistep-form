import React from "react";

import { render, screen } from "@testing-library/react";

import StepContextProvider, { StepContext } from "../context/step-context";

import { ADD_ONS } from "../utils/addOns";
import PickAddOns from "./PickAddOns";
import { getTimespanByCode } from "../utils/timespans";
import { getPriceDisplay } from "../utils/utils";

const stepCode = "PICK_ADD_ONS";

test.each(ADD_ONS)("render addOn name %p", (addOn) => {
  const timespan = getTimespanByCode("MONTH");
  render(
    <StepContextProvider>
      <PickAddOns timespan={timespan} />
    </StepContextProvider>
  );
  const addOnNameElement = screen.getByText(addOn.name);
  expect(addOnNameElement).toBeInTheDocument();
});

test.each(ADD_ONS)("render addOn monthly price %p", (addOn) => {
  const timespan = getTimespanByCode("MONTH");
  const monthlyPriceDisplay = getPriceDisplay(ADD_ONS[0], timespan);
  render(
    <StepContextProvider>
      <PickAddOns timespan={timespan} />
    </StepContextProvider>
  );
  const addOnPriceElements = screen.queryAllByText(monthlyPriceDisplay);
  expect(addOnPriceElements.length).toBeGreaterThan(0);
});

test.each(ADD_ONS)("render addOn yearly price %p", (addOn) => {
  const timespan = getTimespanByCode("YEAR");
  const yearlyPriceDisplay = getPriceDisplay(ADD_ONS[0], timespan);
  render(
    <StepContextProvider>
      <PickAddOns timespan={timespan} />
    </StepContextProvider>
  );
  const addOnPriceElements = screen.queryAllByText(yearlyPriceDisplay);
  expect(addOnPriceElements.length).toBeGreaterThan(0);
});

// TODO
// selected add ons should be stored in the context and restored on back
