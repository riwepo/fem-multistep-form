import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import SelectPlan from "./SelectPlan";

import StepContextProvider, { StepContext } from "../context/step-context";

import { PLANS } from "../utils/plans";
import { getPriceDisplay } from "../utils/utils";
import { getTimespanByCode } from "../utils/timespans";

const stepCode = "SELECT_PLAN";

test.each(PLANS)("render plan %p", (plan) => {
  render(
    <StepContextProvider>
      <SelectPlan />
    </StepContextProvider>
  );
  const planTitleElement = screen.getByText(plan.name);
  expect(planTitleElement).toBeInTheDocument();
});

test("toggle switch rendered", () => {
  render(
    <StepContextProvider>
      <SelectPlan />
    </StepContextProvider>
  );
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("initially no plan is active", () => {
  const { container } = render(
    <StepContextProvider>
      <SelectPlan />
    </StepContextProvider>
  );
  const cardPlanDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  const cardPlanDivsArray = [...cardPlanDivs];
  const activeDivCount = cardPlanDivsArray.filter((div) =>
    div.classList.contains("plan--active")
  ).length;
  expect(activeDivCount).toBe(0);
});

test("initial active timespan is monthly", () => {
  render(
    <StepContextProvider>
      <SelectPlan />
    </StepContextProvider>
  );
  const monthlyElement = screen.getByText("Monthly");
  const yearlyElement = screen.getByText("Yearly");
  expect(monthlyElement).toBeInTheDocument();
  expect(monthlyElement).toHaveClass("month-title--active");
  expect(yearlyElement).toBeInTheDocument();
  expect(yearlyElement).not.toHaveClass("year-title--active");
});

test("clicking on plan actvates it", () => {
  const { container } = render(
    <StepContextProvider>
      <SelectPlan />
    </StepContextProvider>
  );
  const cardPlanDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  const planDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  const planDivsArray = [...planDivs];
  fireEvent.click(planDivsArray[1]);
  expect(cardPlanDivs[1]).toHaveClass("plan--active");
  const cardPlanDivsArray = [...cardPlanDivs];
  const activeDivCount = cardPlanDivsArray.filter((div) =>
    div.classList.contains("plan--active")
  ).length;
  expect(activeDivCount).toBe(1);
});

test("toggling timespan updates all prices", () => {
  render(
    <StepContextProvider>
      <SelectPlan />
    </StepContextProvider>
  );
  const monthly = getTimespanByCode("MONTH");
  PLANS.forEach((plan) => {
    const priceDisplay = getPriceDisplay(plan, monthly);
    const priceElement = screen.getByText(priceDisplay);
    expect(priceElement).toBeInTheDocument();
  });

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);

  const yearly = getTimespanByCode("YEAR");
  PLANS.forEach((plan) => {
    const priceDisplay = getPriceDisplay(plan, yearly);
    const priceElement = screen.getByText(priceDisplay);
    expect(priceElement).toBeInTheDocument();
  });
});

test("selecting a plan calls setStepFieldState on StepContext", () => {
  const testStepStates = [
    {
      code: stepCode,
      fieldStates: [{ code: "selected_plan", value: "fred", isValid: true }],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return { code: "code", value: "value", isValid: "isValid" };
  });
  const mockSetStepFieldState = jest.fn();
  const mockIsStepValid = jest.fn();

  function MockStepContextProvider({ children }) {
    return (
      <StepContext.Provider
        value={{
          stepStates: testStepStates,
          getStepFieldState: mockGetStepFieldState,
          setStepFieldState: mockSetStepFieldState,
          isStepValid: mockIsStepValid,
        }}
      >
        {children}
      </StepContext.Provider>
    );
  }

  const { container } = render(
    <MockStepContextProvider>
      <SelectPlan />
    </MockStepContextProvider>
  );

  const planElement = container.querySelector(".plan"); // eslint-disable-line
  planElement && fireEvent.click(planElement);
  expect(mockSetStepFieldState).toBeCalledWith(
    stepCode,
    "selected_plan",
    "ARCADE",
    true
  );
});
