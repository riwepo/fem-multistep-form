import React, { useState } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import SelectPlan from "./SelectPlan";

import StepContextProvider, { StepContext } from "../context/step-context";

import { PLANS } from "../utils/plans";
import { getPriceDisplay } from "../utils/utils";
import { getTimespanByCode } from "../utils/timespans";

import { nullStepContext } from "../context/step-context.test";

const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

describe("select plan test suite", () => {
  test.each(PLANS)("render plan %p", (plan) => {
    render(
      <StepContextProvider>
        <SelectPlan timespan={monthlyTimespan} onTimespanChange={null} />
      </StepContextProvider>
    );
    const planTitleElement = screen.getByText(plan.name);
    expect(planTitleElement).toBeInTheDocument();
  });

  test("toggle switch rendered", () => {
    render(
      <StepContextProvider>
        <SelectPlan timespan={monthlyTimespan} onTimespanChange={null} />
      </StepContextProvider>
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("initially no plan is active", () => {
    const { container } = render(
      <StepContextProvider>
        <SelectPlan timespan={monthlyTimespan} onTimespanChange={null} />
      </StepContextProvider>
    );
    const cardPlanDivs = container.querySelectorAll(".plan"); // eslint-disable-line
    const cardPlanDivsArray = [...cardPlanDivs];
    const activeDivCount = cardPlanDivsArray.filter((div) =>
      div.classList.contains("plan--active")
    ).length;
    expect(activeDivCount).toBe(0);
  });

  test("clicking on plan actvates it", () => {
    const { container } = render(
      <StepContextProvider>
        <SelectPlan timespan={monthlyTimespan} onTimespanChange={null} />
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

  test("toggling timespan calls callback", () => {
    const onTimespanChange = jest.fn();
    render(
      <StepContextProvider>
        <SelectPlan
          timespan={monthlyTimespan}
          onTimespanChange={onTimespanChange}
        />
      </StepContextProvider>
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(onTimespanChange).toBeCalledWith("YEAR");
  });

  test("toggling timespan updates all prices", () => {
    const onTimespanChange = jest.fn();

    render(
      <StepContextProvider>
        <SelectPlan
          timespan={monthlyTimespan}
          onTimespanChange={onTimespanChange}
        />
      </StepContextProvider>
    );
    PLANS.forEach((plan) => {
      const priceDisplay = getPriceDisplay(plan, monthlyTimespan);
      const priceElement = screen.getByText(priceDisplay);
      expect(priceElement).toBeInTheDocument();
    });

    render(
      <StepContextProvider>
        <SelectPlan
          timespan={yearlyTimespan}
          onTimespanChange={onTimespanChange}
        />
      </StepContextProvider>
    );
    PLANS.forEach((plan) => {
      const priceDisplay = getPriceDisplay(plan, yearlyTimespan);
      const priceElement = screen.getByText(priceDisplay);
      expect(priceElement).toBeInTheDocument();
    });
  });

  test("selecting a plan calls setSelectedPlan on StepContext", () => {
    const mockIsStepInitialised = jest.fn((code) => false);
    const mockSetSelectedPlanCode = jest.fn();
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
      setSelectedPlanCode: mockSetSelectedPlanCode,
    };

    function MockStepContextProvider({ children }) {
      return (
        <StepContext.Provider value={mockStepContext}>
          {children}
        </StepContext.Provider>
      );
    }

    const { container } = render(
      <MockStepContextProvider>
        <SelectPlan timespan={monthlyTimespan} onTimespanChange={null} />
      </MockStepContextProvider>
    );

    const planElement = container.querySelector(".plan"); // eslint-disable-line
    planElement && fireEvent.click(planElement);
    expect(mockSetSelectedPlanCode).toBeCalledWith("ARCADE");
  });
});
