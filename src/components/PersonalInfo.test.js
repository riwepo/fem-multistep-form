import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalInfo from "./PersonalInfo";

import StepContextProvider from "../context/step-context";

test("name input is rendered", () => {
  render(
    <StepContextProvider>
      <PersonalInfo />
    </StepContextProvider>
  );
  const nameInput = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInput).toBeInTheDocument();
});

test("email input is rendered", () => {
  render(
    <StepContextProvider>
      <PersonalInfo />
    </StepContextProvider>
  );
  const emailInput = screen.getByPlaceholderText("e.g. stephenking@gmail.com");
  expect(emailInput).toBeInTheDocument();
});

test("phone input is rendered", () => {
  render(
    <StepContextProvider>
      <PersonalInfo />
    </StepContextProvider>
  );
  const phoneInput = screen.getByPlaceholderText("e.g. 0123456789");
  expect(phoneInput).toBeInTheDocument();
});
