import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import FinishUp from "./FinishUp";

import { StepContext } from "../context/step-context";

import { getTimespanByCode } from "../utils/timespans";

const STEP_CODE = "FINISH_UP";
const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

test("selected plan is rendered with month", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "selected_plan",
          value: "fred",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return {
      code: "selected_plan",
      value: "ARCADE",
      isValid: true,
      isInitilialised: true,
    };
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

  render(
    <MockStepContextProvider>
      <FinishUp timespan={monthlyTimespan} onGoToPlanClick={null} />
    </MockStepContextProvider>
  );

  const planElement = screen.getByText("arcade (monthly)");
  expect(planElement).toBeInTheDocument();
});

test("selected plan is rendered with year", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "selected_plan",
          value: "fred",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return {
      code: "selected_plan",
      value: "ARCADE",
      isValid: true,
      isInitilialised: true,
    };
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

  render(
    <MockStepContextProvider>
      <FinishUp timespan={yearlyTimespan} onGoToPlanClick={null} />
    </MockStepContextProvider>
  );

  const planElement = screen.getByText("arcade (yearly)");
  expect(planElement).toBeInTheDocument();
});

test("selected add-ons are rendered", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "selected_plan",
          value: "fred",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    if (stepCode === "SELECT_PLAN") {
      return {
        code: "selected_plan",
        value: "ARCADE",
        isValid: true,
        isInitilialised: true,
      };
    } else if (stepCode === "PICK_ADD_ONS" && fieldCode === "ONLINE")
      return {
        code: "ONLINE",
        value: true.toString(),
        isValid: true,
        isInitilialised: true,
      };
    else {
      return {
        code: "code",
        value: false.toString(),
        isValid: true,
        isInitilialised: true,
      };
    }
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

  render(
    <MockStepContextProvider>
      <FinishUp timespan={monthlyTimespan} onGoToPlanClick={null} />
    </MockStepContextProvider>
  );

  const onlineAddOnElement = screen.getByText("Online service");
  expect(onlineAddOnElement).toBeInTheDocument();
});

test("got to plan click callback is called", () => {
  const clickHandler = jest.fn();

  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "selected_plan",
          value: "fred",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return {
      code: "selected_plan",
      value: "ARCADE",
      isValid: true,
      isInitilialised: true,
    };
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

  render(
    <MockStepContextProvider>
      <FinishUp timespan={monthlyTimespan} onGoToPlanClick={clickHandler} />
    </MockStepContextProvider>
  );

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(clickHandler).toBeCalled();
});
