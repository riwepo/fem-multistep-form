import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import AddOn from "./AddOn";
import { getAddOnByCode } from "../utils/addOns";
import { getTimespanByCode } from "../utils/timespans";
import StepContextProvider, { StepContext } from "../context/step-context";

import { nullStepContext } from "../context/step-context.test";

const monthlyTimespan = getTimespanByCode("MONTH");
const onlineAddOn = getAddOnByCode("ONLINE");

describe("add-on test suite", () => {
  test("renders AddOn with name and description", () => {
    render(
      <StepContextProvider>
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={false}
        />
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
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={false}
        />
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
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={false}
        />
      </StepContextProvider>
    );
    const checkmarkImageElement = screen.getByRole("img");
    const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
    divElement && fireEvent.click(divElement);
    expect(divElement).toHaveAttribute("aria-selected", "true");
  });

  test("initial state of selected is not set from context if step not initialised", () => {
    const mockIsStepInitialised = jest.fn((code) => false);
    const mockGetAddOn = jest.fn((code) => ({ isSelected: true }));
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
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
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={false}
        />
      </MockStepContextProvider>
    );

    const checkmarkImageElement = screen.getByRole("img");
    const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
    expect(mockGetAddOn).not.toBeCalled();
    expect(divElement).toHaveAttribute("aria-selected", "false");
  });

  test("initial state of selected is set from context if step is initialised", () => {
    const mockIsStepInitialised = jest.fn((code) => true);
    const mockGetAddOn = jest.fn((code) => ({ isSelected: true }));
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockGetAddOn,
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
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={false}
        />
      </MockStepContextProvider>
    );

    const checkmarkImageElement = screen.getByRole("img");
    const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
    expect(divElement).toHaveAttribute("aria-selected", "true");
  });

  test("autoFocus false", () => {
    const { container } = render(
      <StepContextProvider>
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={false}
        />
      </StepContextProvider>
    );
    const addOnDivElement = container.querySelector(".add-on"); // eslint-disable-line
    expect(addOnDivElement).toBeInTheDocument();
    expect(addOnDivElement).not.toHaveFocus();
  });

  test("autoFocus true", () => {
    const { container } = render(
      <StepContextProvider>
        <AddOn
          addOn={onlineAddOn}
          timespan={monthlyTimespan}
          autoFocus={true}
        />
      </StepContextProvider>
    );
    const addOnDivElement = container.querySelector(".add-on"); // eslint-disable-line
    expect(addOnDivElement).toBeInTheDocument();
    expect(addOnDivElement).toHaveFocus();
  });
});
