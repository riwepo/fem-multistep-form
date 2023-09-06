import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import PageContainer from "./PageContainer";

import StepContextProvider from "../context/step-context";
import { PLANS } from "../utils/plans";
import { ADD_ONS } from "../utils/addOns";

describe("page container suite", () => {
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

  test("when we arrive at select plan step, forward button is disabled", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    expect(fwdButtonElement).toHaveAttribute("disabled");
  });

  test("when we select a plan step, forward button becomes enabled", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    fireEvent.click(fwdButtonElement);
    expect(fwdButtonElement).toHaveAttribute("disabled");

    const planElement = container.querySelector(".plan"); // eslint-disable-line
    planElement && fireEvent.click(planElement);

    expect(fwdButtonElement).not.toHaveAttribute("disabled");
  });

  test("when we get to pick-addOns step, forward button is enabled", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    fireEvent.click(fwdButtonElement);
    expect(fwdButtonElement).toHaveAttribute("disabled");

    const planElement = container.querySelector(".plan"); // eslint-disable-line
    planElement && fireEvent.click(planElement);

    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    expect(fwdButtonElement).not.toHaveAttribute("disabled");
  });

  test("when we get to finish-up step, forward button is enabled", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    fireEvent.click(fwdButtonElement);
    expect(fwdButtonElement).toHaveAttribute("disabled");

    const planElement = container.querySelector(".plan"); // eslint-disable-line
    planElement && fireEvent.click(planElement);

    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    expect(fwdButtonElement).not.toHaveAttribute("disabled");
  });

  test("when we get to thank-you step, forward button is not shown", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    fireEvent.click(fwdButtonElement);
    expect(fwdButtonElement).toHaveAttribute("disabled");

    // we are now in select plan
    const planElement = container.querySelector(".plan"); // eslint-disable-line
    expect(planElement).toBeInTheDocument();
    planElement && fireEvent.click(planElement);
    fireEvent.click(fwdButtonElement);

    // we are now in pick add-ons
    const addOnNameElement = screen.getByText(ADD_ONS[0].name);
    expect(addOnNameElement).toBeInTheDocument();
    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    // we are now in finish-up
    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    // we are now in thank you
    expect(fwdButtonElement).not.toBeInTheDocument();
  });

  test("when we get to finish-up step, progress indicator 4 is active", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    fireEvent.click(fwdButtonElement);
    expect(fwdButtonElement).toHaveAttribute("disabled");

    // we are now in select plan
    const planElement = container.querySelector(".plan"); // eslint-disable-line
    expect(planElement).toBeInTheDocument();
    planElement && fireEvent.click(planElement);
    fireEvent.click(fwdButtonElement);

    // we are now in pick add-ons
    const addOnNameElement = screen.getByText(ADD_ONS[0].name);
    expect(addOnNameElement).toBeInTheDocument();
    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    // we are now in finish-up
    const step4Element = screen.getByText("4");
    expect(step4Element).toHaveClass("indicator--active");
  });

  test("when we get to thank-you step, progress indicator 4 is still active", () => {
    const { container } = render(
      <StepContextProvider>
        <PageContainer />
      </StepContextProvider>
    );

    enterValidPersonalInfo();

    const fwdButtonElement = screen.getByText("Next step");
    fireEvent.click(fwdButtonElement);
    expect(fwdButtonElement).toHaveAttribute("disabled");

    // we are now in select plan
    const planElement = container.querySelector(".plan"); // eslint-disable-line
    expect(planElement).toBeInTheDocument();
    planElement && fireEvent.click(planElement);
    fireEvent.click(fwdButtonElement);

    // we are now in pick add-ons
    const addOnNameElement = screen.getByText(ADD_ONS[0].name);
    expect(addOnNameElement).toBeInTheDocument();
    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    // we are now in finish-up
    expect(fwdButtonElement).not.toHaveAttribute("disabled");
    fireEvent.click(fwdButtonElement);

    // we are now in thank you
    const thankYouElement = screen.getByText("Thank you!");
    expect(thankYouElement).toBeInTheDocument();
    const step4Element = screen.getByText("4");
    expect(step4Element).toHaveClass("indicator--active");
  });
});
