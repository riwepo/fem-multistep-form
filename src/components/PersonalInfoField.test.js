import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import PersonalInfoField from "./PersonalInfoField";

import StepContextProvider, { StepContext } from "../context/step-context";

import { validateName } from "../utils/validators";

import { nullStepContext } from "../context/step-context.test";

const STEP_CODE = "PERSONAL_INFO";

describe("personal info field suite", () => {
  test("label is rendered", () => {
    render(
      <StepContextProvider>
        <PersonalInfoField
          type="text"
          id="name"
          label="label"
          placeholder="placeholder"
          validator={null}
          autoFocus={false}
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
          autoFocus={false}
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
          autoFocus={false}
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
          autoFocus={false}
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
          autoFocus={false}
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
          autoFocus={false}
        />
      </StepContextProvider>
    );

    const inputElement = screen.getByRole("textbox");
    const errorMessageElement = container.querySelector("p"); // eslint-disable-line

    fireEvent.change(inputElement, { target: { value: inputText } });
    fireEvent.blur(inputElement);

    expect(errorMessageElement?.textContent).toEqual(errorMessage);
  });

  test("StepContext setPersonalInfoField is called on blur", () => {
    const mockIsStepInitialised = jest.fn(() => false);
    const mockSetPersonalInfoField = jest.fn();
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
      setPersonalInfoField: mockSetPersonalInfoField,
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
        <PersonalInfoField
          type="text"
          id="name"
          label="label"
          placeholder="placeholder"
          validator={validateName}
          autoFocus={false}
        />
      </MockStepContextProvider>
    );

    const inputElement = screen.getByRole("textbox");
    const inputText = "some name";
    fireEvent.change(inputElement, { target: { value: inputText } });
    fireEvent.blur(inputElement);

    expect(mockSetPersonalInfoField).toBeCalledWith("name", inputText, true);
  });

  test("on first render if field state is not initialised it will not be restored", () => {
    const mockIsStepInitialised = jest.fn(() => false);
    const mockGetPersonalInfoField = jest.fn((code) => ({
      code: "name",
      value: "some value",
      isValid: true,
    }));
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
      getPersonalInfoField: mockGetPersonalInfoField,
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
        <PersonalInfoField
          type="text"
          id="name"
          label="label"
          placeholder="placeholder"
          validator={validateName}
          autoFocus={false}
        />
      </MockStepContextProvider>
    );

    const inputElement = screen.getByRole("textbox");
    expect(mockGetPersonalInfoField).not.toBeCalled();
    expect(inputElement.value).toBe("");
  });

  test("on first render if field state is initialised it will be restored", () => {
    const mockIsStepInitialised = jest.fn(() => true);
    const mockGetPersonalInfoField = jest.fn((code) => ({
      code: "name",
      value: "some value",
      isValid: true,
    }));
    const mockStepContext = {
      ...nullStepContext,
      isStepInitialised: mockIsStepInitialised,
      getPersonalInfoField: mockGetPersonalInfoField,
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
        <PersonalInfoField
          type="text"
          id="name"
          label="label"
          placeholder="placeholder"
          validator={validateName}
          autoFocus={false}
        />
      </MockStepContextProvider>
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement.value).toBe("some value");
  });

  test("autoFocus false", () => {
    render(
      <StepContextProvider>
        <PersonalInfoField
          type="text"
          id="name"
          label="label"
          placeholder="placeholder"
          validator={null}
          autoFocus={false}
        />
      </StepContextProvider>
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).not.toHaveFocus();
  });

  test("autoFocus true", () => {
    render(
      <StepContextProvider>
        <PersonalInfoField
          type="text"
          id="name"
          label="label"
          placeholder="placeholder"
          validator={null}
          autoFocus={true}
        />
      </StepContextProvider>
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveFocus();
  });
});
