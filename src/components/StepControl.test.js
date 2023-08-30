import React from "react";

import { render, screen } from "@testing-library/react";

import StepControl from "./StepControl";

test("back button has class visible", () => {
  render(<StepControl canGoBack={true} isValid={true} isLastPage={false} />);
  const backButtonElement = screen.getByText("Go back");
  expect(backButtonElement).toHaveClass("btn-back--visible");
});

test("back button doesn't have class visible", () => {
  render(<StepControl canGoBack={false} isValid={true} isLastPage={false} />);
  const backButtonElement = screen.getByText("Go back");
  expect(backButtonElement).not.toHaveClass("btn-back--visible");
});

test("not last page fwd button says 'Next step'", () => {
  render(<StepControl canGoBack={true} isValid={true} isLastPage={false} />);
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).toBeInTheDocument();
});

test("last page fwd button says 'Confirm'", () => {
  render(<StepControl canGoBack={true} isValid={true} isLastPage={true} />);
  const fwdButtonElement = screen.getByText("Confirm");
  expect(fwdButtonElement).toBeInTheDocument();
});

test("if valid forward button is enabled", () => {
  render(<StepControl canGoBack={true} isValid={true} isLastPage={false} />);
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).not.toHaveAttribute("disabled");
});

test("if invalid forward button is disabled", () => {
  render(<StepControl canGoBack={true} isValid={false} isLastPage={false} />);
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).toHaveAttribute("disabled");
});
