import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import PersonalInfo from "./PersonalInfo";

test("name input is rendered", () => {
  render(<PersonalInfo onValidChange={null} />);
  const nameInput = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInput).toBeInTheDocument();
});

test("email input is rendered", () => {
  render(<PersonalInfo onValidChange={null} />);
  const emailInput = screen.getByPlaceholderText("e.g. stephenking@lorem.com");
  expect(emailInput).toBeInTheDocument();
});

test("phone input is rendered", () => {
  render(<PersonalInfo onValidChange={null} />);
  const phoneInput = screen.getByPlaceholderText("e.g. +1 234 567 890");
  expect(phoneInput).toBeInTheDocument();
});

test("onValidChanged called flag for field", () => {
  const onValidChange = jest.fn();
  render(<PersonalInfo onValidChange={onValidChange} />);

  const validName = "Stephen King";
  const nameInputElement = screen.getByPlaceholderText("e.g. Stephen King");
  fireEvent.change(nameInputElement, { target: { value: validName } });
  fireEvent.blur(nameInputElement);
  expect(onValidChange).toBeCalledWith({
    name: true,
    email: false,
    phone: false,
  });

  const validEmail = "stephenking@lorem.com";
  const emailInputElement = screen.getByPlaceholderText(
    "e.g. stephenking@lorem.com"
  );
  fireEvent.change(emailInputElement, { target: { value: validEmail } });
  fireEvent.blur(emailInputElement);
  expect(onValidChange).toBeCalledWith({
    name: true,
    email: true,
    phone: false,
  });

  const validPhone = "0466250293";
  const phoneInputElement = screen.getByPlaceholderText("e.g. +1 234 567 890");
  fireEvent.change(phoneInputElement, { target: { value: validPhone } });
  fireEvent.blur(phoneInputElement);
  expect(onValidChange).toBeCalledWith({
    name: true,
    email: true,
    phone: true,
  });
});
