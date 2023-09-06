import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import StepContextProvider, { StepContext } from "../context/step-context";

import { ADD_ONS } from "../utils/addOns";
import PickAddOns from "./PickAddOns";
import { getTimespanByCode } from "../utils/timespans";
import { getPriceDisplay } from "../utils/utils";

import { nullStepContext } from "../context/step-context.test";

const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

describe("pick add-ons test suite", () => {
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
    const yearlyPriceDisplay =
      "+" + getPriceDisplay(ADD_ONS[0], yearlyTimespan);
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
    const mockIsStepInitialised = jest.fn((code) => false);
    const mockSelectAddOn = jest.fn((code, isSelected) => {});
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
      selectAddOn: mockSelectAddOn,
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
        <PickAddOns timespan={monthlyTimespan} />
      </MockStepContextProvider>
    );
    const addOnDivs = container.querySelectorAll(".add-on"); // eslint-disable-line
    const addOnDivsArray = [...addOnDivs];
    fireEvent.click(addOnDivsArray[0]);
    expect(mockSelectAddOn).toBeCalledWith(ADD_ONS[0].code, true);
  });

  test("clicking second time on add-on clears value in StepContext", () => {
    const mockIsStepInitialised = jest.fn((code) => false);
    const mockSelectAddOn = jest.fn((code, isSelected) => {});
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
      selectAddOn: mockSelectAddOn,
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
        <PickAddOns timespan={monthlyTimespan} />
      </MockStepContextProvider>
    );
    const addOnDivs = container.querySelectorAll(".add-on"); // eslint-disable-line
    const addOnDivsArray = [...addOnDivs];
    fireEvent.click(addOnDivsArray[0]);
    expect(mockSelectAddOn).toBeCalledWith(ADD_ONS[0].code, true);
    fireEvent.click(addOnDivsArray[0]);
    expect(mockSelectAddOn).toBeCalledWith(ADD_ONS[0].code, false);
  });

  test("on initial render add-ons selected set from StepContext", () => {
    const mockIsStepInitialised = jest.fn((code) => true);
    const mockGetAddOn = jest.fn((code) => ({ code: code, isSelected: true }));
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
        <PickAddOns timespan={monthlyTimespan} />
      </MockStepContextProvider>
    );

    const checkmarkImageElements = screen.getAllByRole("img");
    const checkmarkImageElementsArray = [...checkmarkImageElements];
    const firstCheckmarkImageElement = checkmarkImageElementsArray[0];
    const divElement = firstCheckmarkImageElement.closest("div"); // eslint-disable-line
    expect(divElement).toHaveAttribute("aria-selected", "true");
  });
});

// test("step should be valid regardless of add-ons picked", () => {
//   throw new Error("not sure how to test this");
// });
