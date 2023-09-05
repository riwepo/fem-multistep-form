import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import AddOn from "./AddOn";
import { getAddOnByCode } from "../utils/addOns";
import { getTimespanByCode } from "../utils/timespans";
import StepContextProvider, { StepContext } from "../context/step-context";

const STEP_CODE = "PICK_ADD_ONS";
const monthlyTimespan = getTimespanByCode("MONTH");
const onlineAddOn = getAddOnByCode("ONLINE");

test("renders AddOn with name and description", () => {
  render(
    <StepContextProvider>
      <AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const nameElement = screen.getByText(onlineAddOn.name);
  expect(nameElement).toBeInTheDocument();
  const descriptionElement = screen.getByText(onlineAddOn.description);
  expect(descriptionElement).toBeInTheDocument();
});

test("div surrounding img initially has aria-selected false", () => {
  const onlineAddOn = getAddOnByCode("ONLINE");
  render(
    <StepContextProvider>
      <AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const checkmarkImageElement = screen.getByRole("img");
  const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
  expect(divElement).toHaveAttribute("aria-selected", "false");
});

// here I want to test if the click has an effect
// the only thing I can measure is the aria-selected attribute
test("after click div surrounding img has aria-selected true", () => {
  const onlineAddOn = getAddOnByCode("ONLINE");
  render(
    <StepContextProvider>
      <AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />
    </StepContextProvider>
  );
  const checkmarkImageElement = screen.getByRole("img");
  const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
  divElement && fireEvent.click(divElement);
  expect(divElement).toHaveAttribute("aria-selected", "true");
});

test("initial state of selected is set from context", () => {
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
      <AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />
    </MockStepContextProvider>
  );

  const checkmarkImageElement = screen.getByRole("img");
  const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
  expect(divElement).toHaveAttribute("aria-selected", "true");
});
