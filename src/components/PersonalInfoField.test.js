import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import PersonalInfoField from "./PersonalInfoField";

import StepContextProvider, { StepContext } from "../context/step-context";

import { validateName } from "../utils/validators";

const STEP_CODE = "PERSONAL_INFO";

test("label is rendered", () => {
  render(
    <StepContextProvider>
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={null}
      />
    </StepContextProvider>
  );
  const labelElement = screen.getByText("label");
  expect(labelElement).toBeInTheDocument();
});

test("error message is empty", () => {
  const { container } = render(
    <StepContextProvider>
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={null}
      />
    </StepContextProvider>
  );

  const errorMessageElement = container.querySelector("p"); // eslint-disable-line
  expect(errorMessageElement).toBeInTheDocument();
  expect(errorMessageElement?.textContent).toEqual("");
});

test("input is rendered", () => {
  render(
    <StepContextProvider>
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={null}
      />
    </StepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

test("error message if input is empty and is blurred", () => {
  const { container } = render(
    <StepContextProvider>
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={validateName}
      />
    </StepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");
  const errorMessageElement = container.querySelector("p"); // eslint-disable-line

  fireEvent.blur(inputElement);

  expect(errorMessageElement?.textContent).toEqual("Please enter a name");
});

test("validator is called if input has text and is blurred", () => {
  const inputText = "hello world";
  const validator = jest.fn();
  render(
    <StepContextProvider>
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={validator}
      />
    </StepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");

  fireEvent.change(inputElement, { target: { value: inputText } });
  fireEvent.blur(inputElement);

  expect(validator).toBeCalledWith(inputText);
});

test("validator error message is displayed as error", () => {
  const inputText = "hello world";
  const errorMessage = "error message";
  const validator = jest.fn((text) => {
    return errorMessage;
  });

  const { container } = render(
    <StepContextProvider>
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={validator}
      />
    </StepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");
  const errorMessageElement = container.querySelector("p"); // eslint-disable-line

  fireEvent.change(inputElement, { target: { value: inputText } });
  fireEvent.blur(inputElement);

  expect(errorMessageElement?.textContent).toEqual(errorMessage);
});

test("StepContext setStepFieldState is called on blur", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        { code: "name", value: "fred", isValid: true, isInitialised: true },
        {
          code: "email",
          value: "fred@nerk.com",
          isValid: true,
          isInitialised: true,
        },
        {
          code: "phone",
          value: "1234567890",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];
  const mockGetStepFieldState = jest.fn(() => {
    return {
      code: "name",
      value: "some name",
      isValid: true,
      isInitialised: true,
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
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={validateName}
      />
    </MockStepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");
  const inputText = "some name";
  fireEvent.change(inputElement, { target: { value: inputText } });
  fireEvent.blur(inputElement);

  expect(mockSetStepFieldState).toBeCalledWith(
    STEP_CODE,
    "name",
    inputText,
    true
  );
});

test("on first render if field state is not initialised it will not be restored", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        { code: "name", value: "fred", isValid: true, isInitialised: false },
        {
          code: "email",
          value: "fred@nerk.com",
          isValid: true,
          isInitialised: true,
        },
        {
          code: "phone",
          value: "1234567890",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];

  const mockGetStepFieldState = jest.fn(() => {
    return {
      code: "name",
      value: "fred",
      isValid: true,
      isInitialised: false,
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
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={validateName}
      />
    </MockStepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");
  expect(inputElement.value).toBe("");
});

test("on first render if field state is initialised it will be restored", () => {
  const testStepStates = [
    {
      code: STEP_CODE,
      fieldStates: [
        { code: "name", value: "fred", isValid: true, isInitialised: false },
        {
          code: "email",
          value: "fred@nerk.com",
          isValid: true,
          isInitialised: true,
        },
        {
          code: "phone",
          value: "1234567890",
          isValid: true,
          isInitialised: true,
        },
      ],
    },
  ];

  const mockGetStepFieldState = jest.fn(() => {
    return {
      code: "name",
      value: "fred",
      isValid: true,
      isInitialised: true,
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
      <PersonalInfoField
        type="text"
        id="name"
        label="label"
        placeholder="placeholder"
        validator={validateName}
      />
    </MockStepContextProvider>
  );

  const inputElement = screen.getByRole("textbox");
  expect(inputElement.value).toBe("fred");
});
