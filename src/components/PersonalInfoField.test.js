import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import PersonalInfoField from "./PersonalInfoField";

test("label is rendered", () => {
  render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={null}
      onValidChange={null}
    />
  );
  const labelElement = screen.getByText("label");
  expect(labelElement).toBeInTheDocument();
});

test("error message is empty", () => {
  const { container } = render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={null}
      onValidChange={null}
    />
  );

  const errorMessageElement = container.querySelector("p"); // eslint-disable-line
  expect(errorMessageElement).toBeInTheDocument();
  expect(errorMessageElement?.textContent).toEqual("");
});

test("input is rendered", () => {
  render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={null}
      onValidChange={null}
    />
  );

  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

test("error message if input is empty and is blurred", () => {
  const onValidChange = jest.fn();
  const { container } = render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={null}
      onValidChange={onValidChange}
    />
  );

  const inputElement = screen.getByRole("textbox");
  const errorMessageElement = container.querySelector("p"); // eslint-disable-line

  fireEvent.blur(inputElement);

  expect(errorMessageElement?.textContent).toEqual("This field is required.");
});

test("onValidChange called with false if input is empty and is blurred", () => {
  const onValidChange = jest.fn();
  render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={null}
      onValidChange={onValidChange}
    />
  );

  const inputElement = screen.getByRole("textbox");

  fireEvent.blur(inputElement);

  expect(onValidChange).toBeCalledWith("id", false);
});

test("validator is called if input has text and is blurred", () => {
  const inputText = "hello world";
  const validator = jest.fn();
  const onValidChange = jest.fn();
  render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={validator}
      onValidChange={onValidChange}
    />
  );

  const inputElement = screen.getByRole("textbox");

  fireEvent.change(inputElement, { target: { value: inputText } });
  fireEvent.blur(inputElement);

  expect(validator).toBeCalledWith(inputText);
});

test("onValidChange called with true if input is valid and is blurred", () => {
  const inputText = "hello world";
  const validator = jest.fn((value) => "");
  const onValidChange = jest.fn();
  render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={validator}
      onValidChange={onValidChange}
    />
  );

  const inputElement = screen.getByRole("textbox");
  fireEvent.change(inputElement, { target: { value: inputText } });
  fireEvent.blur(inputElement);

  expect(onValidChange).toBeCalledWith("id", true);
});

test("validator error message is displayed as error", () => {
  const inputText = "hello world";
  const errorMessage = "error message";
  const validator = jest.fn((text) => {
    return errorMessage;
  });
  const onValidChange = jest.fn();
  const { container } = render(
    <PersonalInfoField
      type="text"
      id="id"
      label="label"
      placeholder="placeholder"
      validator={validator}
      onValidChange={onValidChange}
    />
  );

  const inputElement = screen.getByRole("textbox");
  const errorMessageElement = container.querySelector("p"); // eslint-disable-line

  fireEvent.change(inputElement, { target: { value: inputText } });
  fireEvent.blur(inputElement);

  expect(errorMessageElement?.textContent).toEqual(errorMessage);
});
