import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import StepContextProvider, { StepContext } from "../context/step-context";

import { ADD_ONS } from "../utils/addOns";
import PickAddOns from "./PickAddOns";
import { getTimespanByCode } from "../utils/timespans";
import { getPriceDisplay } from "../utils/utils";

const STEP_CODE = "PICK_ADD_ONS";
const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

test.each(ADD_ONS)("render addOn name %p", (addOn) => {
  render(
    <StepContextProvider>
      <PickAddOns timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const addOnNameElement = screen.getByText(addOn.name);
  expect(addOnNameElement).toBeInTheDocument();
});

test.each(ADD_ONS)("render addOn monthly price %p", (addOn) => {
  const monthlyPriceDisplay =
    "+" + getPriceDisplay(ADD_ONS[0], monthlyTimespan);
  render(
    <StepContextProvider>
      <PickAddOns timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const addOnPriceElements = screen.queryAllByText(monthlyPriceDisplay);
  expect(addOnPriceElements.length).toBeGreaterThan(0);
});

test.each(ADD_ONS)("render addOn yearly price %p", (addOn) => {
  const yearlyPriceDisplay = "+" + getPriceDisplay(ADD_ONS[0], yearlyTimespan);
  render(
    <StepContextProvider>
      <PickAddOns timespan={yearlyTimespan} />
    </StepContextProvider>
  );
  const addOnPriceElements = screen.queryAllByText(yearlyPriceDisplay);
  expect(addOnPriceElements.length).toBeGreaterThan(0);
});

test.each(ADD_ONS)("addons initially not selected", (addOn) => {
  render(
    <StepContextProvider>
      <PickAddOns timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const checkmarkImageElements = screen.getAllByRole("img");
  checkmarkImageElements.forEach((element) => {
    const divElement = element.closest("div"); // eslint-disable-line
    expect(divElement).toHaveAttribute("aria-selected", "false");
  });
});

test("clicking on add-on actvates it", () => {
  const { container } = render(
    <StepContextProvider>
      <PickAddOns timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const addOnDivs = container.querySelectorAll(".add-on"); // eslint-disable-line
  const addOnDivsArray = [...addOnDivs];
  fireEvent.click(addOnDivsArray[0]);
  expect(addOnDivsArray[0]).toHaveClass("add-on--active");
  const activeDivCount = addOnDivsArray.filter((div) =>
    div.classList.contains("add-on--active")
  ).length;
  expect(activeDivCount).toBe(1);
});

test("clicking on add-on sets value in StepContext", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "ONLINE",
          value: "false",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return {
      code: "code",
      value: "value",
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

  const { container } = render(
    <MockStepContextProvider>
      <PickAddOns timespan={monthlyTimespan} />
    </MockStepContextProvider>
  );
  const addOnDivs = container.querySelectorAll(".add-on"); // eslint-disable-line
  const addOnDivsArray = [...addOnDivs];
  fireEvent.click(addOnDivsArray[0]);
  expect(mockSetStepFieldState).toBeCalledWith(
    STEP_CODE,
    ADD_ONS[0].code,
    "true",
    true
  );
});

test("clicking second time on add-on clears value in StepContext", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "ONLINE",
          value: "false",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return {
      code: "code",
      value: "value",
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

  const { container } = render(
    <MockStepContextProvider>
      <PickAddOns timespan={monthlyTimespan} />
    </MockStepContextProvider>
  );
  const addOnDivs = container.querySelectorAll(".add-on"); // eslint-disable-line
  const addOnDivsArray = [...addOnDivs];
  fireEvent.click(addOnDivsArray[0]);
  expect(mockSetStepFieldState).toBeCalledWith(
    STEP_CODE,
    ADD_ONS[0].code,
    "true",
    true
  );
  fireEvent.click(addOnDivsArray[0]);
  expect(mockSetStepFieldState).toBeCalledWith(
    STEP_CODE,
    ADD_ONS[0].code,
    "false",
    true
  );
});

test("on initial render add-ons selected set from StepContext", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        {
          code: "ONLINE",
          value: "false",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn((stepCode, fieldCode) => {
    return {
      code: "ONLINE",
      value: true.toString(),
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
      <PickAddOns timespan={monthlyTimespan} />
    </MockStepContextProvider>
  );

  const checkmarkImageElements = screen.getAllByRole("img");
  const checkmarkImageElementsArray = [...checkmarkImageElements];
  const firstCheckmarkImageElement = checkmarkImageElementsArray[0];
  const divElement = firstCheckmarkImageElement.closest("div"); // eslint-disable-line
  expect(divElement).toHaveAttribute("aria-selected", "true");
});

// test("step should be valid regardless of add-ons picked", () => {
//   throw new Error("not sure how to test this");
// });
