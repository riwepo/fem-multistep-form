import React from "react";

import { render, screen } from "@testing-library/react";

import ProgressIndicator from "./ProgressIndicator";

import { STEPS } from "../utils/steps";

test.each(STEPS)("render step %p", (step) => {
  render(<ProgressIndicator steps={STEPS} activeStepCode={step.code} />);
  const stepTitleElement = screen.getByText(step.title);
  expect(stepTitleElement).toBeInTheDocument();
});

test("first step marked active", () => {
  render(<ProgressIndicator steps={STEPS} activeStepCode={STEPS[0].code} />);
  const step1Element = screen.getByText(STEPS[0].number);
  const step2Element = screen.getByText(STEPS[1].number);
  const step3Element = screen.getByText(STEPS[2].number);
  expect(step1Element).toHaveClass("indicator--active");
  expect(step2Element).not.toHaveClass("indicator--active");
  expect(step3Element).not.toHaveClass("indicator--active");
});

test("second step marked active", () => {
  render(<ProgressIndicator steps={STEPS} activeStepCode={STEPS[1].code} />);
  const step1Element = screen.getByText(STEPS[0].number);
  const step2Element = screen.getByText(STEPS[1].number);
  const step3Element = screen.getByText(STEPS[2].number);
  expect(step1Element).not.toHaveClass("indicator--active");
  expect(step2Element).toHaveClass("indicator--active");
  expect(step3Element).not.toHaveClass("indicator--active");
});
