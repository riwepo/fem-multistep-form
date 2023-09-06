import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import FinishUp from "./FinishUp";

import { StepContext } from "../context/step-context";

import { getTimespanByCode } from "../utils/timespans";

import { nullStepContext } from "../context/step-context.test";
import { PLANS } from "../utils/plans";

const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

describe("finish up test suite", () => {
  test("selected plan is rendered with month", () => {
    const mockGetSelectedPlanCode = jest.fn(() => PLANS[0].code);
    const mockGetAddOn = jest.fn((code) => ({
      code: code,
      isSelected: false,
    }));
    const mockStepContext = {
      ...nullStepContext,
      getSelectedPlanCode: mockGetSelectedPlanCode,
      getAddOn: mockGetAddOn,
    };

    function MockStepContextProvider({ children }) {
      return (
        <StepContext.Provider value={mockStepContext}>
          {children}
        </StepContext.Provider>
      );
    }

    render(
      <MockStepContextProvider>
        <FinishUp timespan={monthlyTimespan} onGoToPlanClick={null} />
      </MockStepContextProvider>
    );

    const planElement = screen.getByText("arcade (monthly)");
    expect(planElement).toBeInTheDocument();
  });

  test("selected plan is rendered with year", () => {
    const mockGetSelectedPlanCode = jest.fn(() => PLANS[0].code);
    const mockGetAddOn = jest.fn((code) => ({
      code: code,
      isSelected: false,
    }));
    const mockStepContext = {
      ...nullStepContext,
      getSelectedPlanCode: mockGetSelectedPlanCode,
      getAddOn: mockGetAddOn,
    };

    function MockStepContextProvider({ children }) {
      return (
        <StepContext.Provider value={mockStepContext}>
          {children}
        </StepContext.Provider>
      );
    }

    render(
      <MockStepContextProvider>
        <FinishUp timespan={yearlyTimespan} onGoToPlanClick={null} />
      </MockStepContextProvider>
    );

    const planElement = screen.getByText("arcade (yearly)");
    expect(planElement).toBeInTheDocument();
  });

  test("selected add-ons are rendered", () => {
    const mockGetSelectedPlanCode = jest.fn(() => PLANS[0].code);
    const mockGetAddOn = jest.fn((code) => ({
      code: code,
      isSelected: true,
    }));
    const mockStepContext = {
      ...nullStepContext,
      getSelectedPlanCode: mockGetSelectedPlanCode,
      getAddOn: mockGetAddOn,
    };

    function MockStepContextProvider({ children }) {
      return (
        <StepContext.Provider value={mockStepContext}>
          {children}
        </StepContext.Provider>
      );
    }

    render(
      <MockStepContextProvider>
        <FinishUp timespan={monthlyTimespan} onGoToPlanClick={null} />
      </MockStepContextProvider>
    );

    const onlineAddOnElement = screen.getByText("Online service");
    expect(onlineAddOnElement).toBeInTheDocument();
  });

  test("got to plan click callback is called", () => {
    const mockGetSelectedPlanCode = jest.fn(() => PLANS[0].code);
    const mockGetAddOn = jest.fn((code) => ({
      code: code,
      isSelected: false,
    }));
    const mockStepContext = {
      ...nullStepContext,
      getSelectedPlanCode: mockGetSelectedPlanCode,
      getAddOn: mockGetAddOn,
    };

    function MockStepContextProvider({ children }) {
      return (
        <StepContext.Provider value={mockStepContext}>
          {children}
        </StepContext.Provider>
      );
    }

    const clickHandler = jest.fn();

    render(
      <MockStepContextProvider>
        <FinishUp timespan={monthlyTimespan} onGoToPlanClick={clickHandler} />
      </MockStepContextProvider>
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(clickHandler).toBeCalled();
  });
});
