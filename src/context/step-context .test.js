import React, { useContext, useEffect } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import StepContextProvider, { StepContext } from "./step-context";

import { STEPS } from "../utils/steps";
import { FIELDS } from "../utils/personal_info";
import { PLANS } from "../utils/plans";
import { ADD_ONS } from "../utils/addOns";

test.each(FIELDS)(
  "getPersonalInfoField returns default state for each field",
  (field) => {
    function TestContext() {
      const stepContext = useContext(StepContext);
      const infoField = stepContext.getPersonalInfoField(field.code);
      const isStepValid = stepContext.isStepValid(STEPS[0].code);
      const isStepInitialised = stepContext.isStepInitialised(STEPS[0].code);
      return (
        <p>{`code: ${infoField.code} value: ${infoField.value} isFieldValid: ${infoField.isValid} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
      );
    }

    const { container } = render(
      <StepContextProvider>
        <TestContext />
      </StepContextProvider>
    );
    const pElement = container.querySelector("p"); // eslint-disable-line
    expect(pElement?.innerHTML).toBe(
      `code: ${field.code} value:  isFieldValid: false isStepValid: false isStepInitialised: false`
    );
  }
);

test("calling setPersonalInfoField on one field sets field value, field valid true and step initialised true but step valid false", () => {
  const field = FIELDS[0];
  function TestContext() {
    const stepContext = useContext(StepContext);
    // note we only update context on initial render or we go into an infinite loop
    useEffect(() => {
      stepContext.setPersonalInfoField(field.code, "some value", true);
    }, []);
    const infoField = stepContext.getPersonalInfoField(field.code);
    const isStepValid = stepContext.isStepValid(STEPS[0].code);
    const isStepInitialised = stepContext.isStepInitialised(STEPS[0].code);

    return (
      <p>{`code: ${infoField.code} value: ${infoField.value} isFieldValid: ${infoField.isValid} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
    );
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe(
    `code: ${field.code} value: some value isFieldValid: true isStepValid: false isStepInitialised: true`
  );
});

test("calling setPersonalInfoField on all field sets step valid true", () => {
  function TestContext() {
    const stepContext = useContext(StepContext);
    // note we only update context on initial render or we go into an infinite loop
    useEffect(() => {
      FIELDS.map((field) =>
        stepContext.setPersonalInfoField(field.code, "some value", true)
      );
    }, []);
    const isStepValid = stepContext.isStepValid(STEPS[0].code);

    return <p>{`isStepValid: ${isStepValid}`}</p>;
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe("isStepValid: true");
});

test("getSelectedPlan returns default values", () => {
  function TestContext() {
    const stepContext = useContext(StepContext);
    const selectedPlan = stepContext.getSelectedPlan();
    const isStepValid = stepContext.isStepValid(STEPS[1].code);
    const isStepInitialised = stepContext.isStepInitialised(STEPS[1].code);

    return (
      <p>{`selectedPlan: ${selectedPlan} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
    );
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe(
    "selectedPlan:  isStepValid: false isStepInitialised: false"
  );
});

test("calling setSelectedPlanCode sets plan code and makes step valid", () => {
  const selectedPlanCode = PLANS[0].code;
  function TestContext() {
    const stepContext = useContext(StepContext);
    // note we only update context on initial render or we go into an infinite loop
    useEffect(() => {
      stepContext.setSelectedPlanCode(selectedPlanCode);
    }, []);
    const selectedPlanCode2 = stepContext.getSelectedPlanCode();
    const isStepValid = stepContext.isStepValid(STEPS[1].code);
    const isStepInitialised = stepContext.isStepInitialised(STEPS[1].code);

    return (
      <p>{`selectedPlan: ${selectedPlanCode2} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
    );
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe(
    "selectedPlan: ARCADE isStepValid: true isStepInitialised: true"
  );
});

test("getAddOn returns default values", () => {
  const selectedAddOnCode = ADD_ONS[0].code;
  function TestContext() {
    const stepContext = useContext(StepContext);
    const addOnState = stepContext.getAddOn(selectedAddOnCode);
    const isStepValid = stepContext.isStepValid(STEPS[2].code);
    const isStepInitialised = stepContext.isStepInitialised(STEPS[2].code);

    return (
      <p>{`addOnCode: ${addOnState.code} isAddOnSelected: ${addOnState.isSelected} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
    );
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe(
    "addOnCode: ONLINE isAddOnSelected: false isStepValid: true isStepInitialised: false"
  );
});

test("calling selectAddOn with true selects it", () => {
  const selectedAddOnCode = ADD_ONS[0].code;
  function TestContext() {
    const stepContext = useContext(StepContext);
    // note we only update context on initial render or we go into an infinite loop
    useEffect(() => {
      stepContext.selectAddOn(selectedAddOnCode, true);
    }, []);
    const addOnState = stepContext.getAddOn(selectedAddOnCode);
    const isStepValid = stepContext.isStepValid(STEPS[2].code);
    const isStepInitialised = stepContext.isStepInitialised(STEPS[2].code);

    return (
      <p>{`addOnCode: ${addOnState.code} isAddOnSelected: ${addOnState.isSelected} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
    );
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe(
    "addOnCode: ONLINE isAddOnSelected: true isStepValid: true isStepInitialised: true"
  );
});

test("calling selectAddOn with false selects it", () => {
  const selectedAddOnCode = ADD_ONS[0].code;
  function TestContext() {
    const stepContext = useContext(StepContext);
    // note we only update context on initial render or we go into an infinite loop
    useEffect(() => {
      stepContext.selectAddOn(selectedAddOnCode, true);
      stepContext.selectAddOn(selectedAddOnCode, false);
    }, []);
    const addOnState = stepContext.getAddOn(selectedAddOnCode);
    const isStepValid = stepContext.isStepValid(STEPS[2].code);
    const isStepInitialised = stepContext.isStepInitialised(STEPS[2].code);

    return (
      <p>{`addOnCode: ${addOnState.code} isAddOnSelected: ${addOnState.isSelected} isStepValid: ${isStepValid} isStepInitialised: ${isStepInitialised}`}</p>
    );
  }

  const { container } = render(
    <StepContextProvider>
      <TestContext />
    </StepContextProvider>
  );
  const pElement = container.querySelector("p"); // eslint-disable-line
  expect(pElement?.innerHTML).toBe(
    "addOnCode: ONLINE isAddOnSelected: false isStepValid: true isStepInitialised: true"
  );
});
