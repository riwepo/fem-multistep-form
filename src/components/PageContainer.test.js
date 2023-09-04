import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import PageContainer from "./PageContainer";

import StepContextProvider from "../context/step-context";
import { PLANS } from "../utils/plans";

test("initially renders PersonalInfo", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );
  const nameInput = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInput).toBeInTheDocument();
});

test("initially back button is hidden", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );
  const backButtonElement = screen.getByText("Go back");
  expect(backButtonElement).not.toHaveClass("btn-back--visible");
});

test("initially fwd button is disabled", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).toHaveAttribute("disabled");
});

function enterValidPersonalInfo() {
  const validName = "Stephen King";
  const nameInputElement = screen.getByPlaceholderText("e.g. Stephen King");
  fireEvent.change(nameInputElement, { target: { value: validName } });
  fireEvent.blur(nameInputElement);

  const validEmail = "stephenking@gmail.com";
  const emailInputElement = screen.getByPlaceholderText(
    "e.g. stephenking@gmail.com"
  );
  fireEvent.change(emailInputElement, { target: { value: validEmail } });
  fireEvent.blur(emailInputElement);

  const validPhone = "0123456789";
  const phoneInputElement = screen.getByPlaceholderText("e.g. 0123456789");
  fireEvent.change(phoneInputElement, { target: { value: validPhone } });
  fireEvent.blur(phoneInputElement);
}

test("if we fill out PersonalInfo fwd button is enabled", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );

  enterValidPersonalInfo();

  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).not.toHaveAttribute("disabled");
});

test("if fwd button is enabled and we click we go to select plan step", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );

  enterValidPersonalInfo();

  const fwdButtonElement = screen.getByText("Next step");
  fireEvent.click(fwdButtonElement);

  const planTitleElement = screen.getByText(PLANS[0].name);
  expect(planTitleElement).toBeInTheDocument();
  const nameInputElement = screen.queryByPlaceholderText("e.g. Stephen King");
  expect(nameInputElement).not.toBeInTheDocument();
});

test("back button is visible when we are on plan step", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );

  enterValidPersonalInfo();

  const fwdButtonElement = screen.getByText("Next step");
  fireEvent.click(fwdButtonElement);

  const backButtonElement = screen.getByText("Go back");
  expect(backButtonElement).toHaveClass("btn-back--visible");
});

test("clicking back button takes us back to personal info step", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );

  enterValidPersonalInfo();

  const fwdButtonElement = screen.getByText("Next step");
  fireEvent.click(fwdButtonElement);

  const backButtonElement = screen.getByText("Go back");
  fireEvent.click(backButtonElement);

  const nameInputElement = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInputElement).toBeInTheDocument();
});

test("when we go back to personal info test, information is retained", () => {
  render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );

  enterValidPersonalInfo();

  const fwdButtonElement = screen.getByText("Next step");
  fireEvent.click(fwdButtonElement);

  const backButtonElement = screen.getByText("Go back");
  fireEvent.click(backButtonElement);

  const nameInputElement = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInputElement.value).toBe("Stephen King");
});

test("when we go back to personal info test, step is still valid", () => {
  const { container } = render(
    <StepContextProvider>
      <PageContainer />
    </StepContextProvider>
  );

  enterValidPersonalInfo();

  const fwdButtonElement = screen.getByText("Next step");
  fireEvent.click(fwdButtonElement);

  const backButtonElement = screen.getByText("Go back");
  fireEvent.click(backButtonElement);

  const errorMessageElement = container.querySelector("p.error-message"); // eslint-disable-line
  expect(errorMessageElement).toBeInTheDocument();
  expect(errorMessageElement?.textContent).toEqual("");
});
