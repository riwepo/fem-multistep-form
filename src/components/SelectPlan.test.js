import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import SelectPlan from "./SelectPlan";

import { StepContext } from "../context/step-context";

import { PLANS } from "../utils/plans";
import { getPriceDisplay } from "../utils/utils";
import { getTimespanByCode } from "../utils/timespans";

test.each(PLANS)("render plan %p", (plan) => {
  render(<SelectPlan />);
  const planTitleElement = screen.getByText(plan.name);
  expect(planTitleElement).toBeInTheDocument();
});

test("toggle switch rendered", () => {
  render(<SelectPlan />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("initially no plan is active", () => {
  const { container } = render(<SelectPlan />);
  const cardPlanDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  const cardPlanDivsArray = [...cardPlanDivs];
  const activeDivCount = cardPlanDivsArray.filter((div) =>
    div.classList.contains("plan--active")
  ).length;
  expect(activeDivCount).toBe(0);
});

test("initial active timespan is monthly", () => {
  render(<SelectPlan />);
  const monthlyElement = screen.getByText("Monthly");
  const yearlyElement = screen.getByText("Yearly");
  expect(monthlyElement).toBeInTheDocument();
  expect(monthlyElement).toHaveClass("month-title--active");
  expect(yearlyElement).toBeInTheDocument();
  expect(yearlyElement).not.toHaveClass("year-title--active");
});

test("clicking on plan actvates it", () => {
  const { container } = render(<SelectPlan />);
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
  render(<SelectPlan />);
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

test("selecting a plan calls set step valid on context", () => {
  const stepCode = "SELECT_PLAN";
  const testStepState = [{ code: stepCode, isValid: false }];
  const mockGetIsValid = jest.fn();
  const mockSetIsValid = jest.fn();

  function MockStepContextProvider({ children }) {
    return (
      <StepContext.Provider
        value={{
          stepState: testStepState,
          getIsValid: mockGetIsValid,
          setIsValid: mockSetIsValid,
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
  expect(mockSetIsValid).toBeCalledWith(stepCode, true);
});
