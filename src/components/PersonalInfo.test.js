import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import PersonalInfo from "./PersonalInfo";

import { StepContext } from "../context/step-context";

test("name input is rendered", () => {
  render(<PersonalInfo />);
  const nameInput = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInput).toBeInTheDocument();
});

test("email input is rendered", () => {
  render(<PersonalInfo />);
  const emailInput = screen.getByPlaceholderText("e.g. stephenking@lorem.com");
  expect(emailInput).toBeInTheDocument();
});

test("phone input is rendered", () => {
  render(<PersonalInfo />);
  const phoneInput = screen.getByPlaceholderText("e.g. +1 234 567 890");
  expect(phoneInput).toBeInTheDocument();
});

test("StepContext setIsValid called with correct values", () => {
  const stepCode = "PERSONAL_INFO";
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

  render(
    <MockStepContextProvider>
      <PersonalInfo />
    </MockStepContextProvider>
  );

  const validName = "Stephen King";
  const nameInputElement = screen.getByPlaceholderText("e.g. Stephen King");
  fireEvent.change(nameInputElement, { target: { value: validName } });
  fireEvent.blur(nameInputElement);
  expect(mockSetIsValid).toBeCalledWith(stepCode, false);

  const validEmail = "stephenking@lorem.com";
  const emailInputElement = screen.getByPlaceholderText(
    "e.g. stephenking@lorem.com"
  );
  fireEvent.change(emailInputElement, { target: { value: validEmail } });
  fireEvent.blur(emailInputElement);
  expect(mockSetIsValid).toBeCalledWith(stepCode, false);

  const validPhone = "0466250293";
  const phoneInputElement = screen.getByPlaceholderText("e.g. +1 234 567 890");
  fireEvent.change(phoneInputElement, { target: { value: validPhone } });
  fireEvent.blur(phoneInputElement);
  expect(mockSetIsValid).toBeCalledWith(stepCode, true);
});
