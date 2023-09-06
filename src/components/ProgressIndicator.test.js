import React from "react";

import { render, screen } from "@testing-library/react";

import ProgressIndicator from "./ProgressIndicator";

import { STEPS } from "../utils/steps";

describe("progress indicator test suite", () => {
  const stepsShown = STEPS.filter((step) => step.showInProgress);
  test.each(stepsShown)("render step %p", (step) => {
    render(<ProgressIndicator steps={STEPS} activeStepNumber={step.number} />);
    const stepTitleElement = screen.getByText(step.title);
    expect(stepTitleElement).toBeInTheDocument();
  });

  test("first step marked active", () => {
    render(
      <ProgressIndicator steps={STEPS} activeStepNumber={STEPS[0].number} />
    );
    const step1Element = screen.getByText(STEPS[0].number);
    const step2Element = screen.getByText(STEPS[1].number);
    const step3Element = screen.getByText(STEPS[2].number);
    expect(step1Element).toHaveClass("indicator--active");
    expect(step2Element).not.toHaveClass("indicator--active");
    expect(step3Element).not.toHaveClass("indicator--active");
  });

  test("second step marked active", () => {
    render(
      <ProgressIndicator steps={STEPS} activeStepNumber={STEPS[1].number} />
    );
    const step1Element = screen.getByText(STEPS[0].number);
    const step2Element = screen.getByText(STEPS[1].number);
    const step3Element = screen.getByText(STEPS[2].number);
    expect(step1Element).not.toHaveClass("indicator--active");
    expect(step2Element).toHaveClass("indicator--active");
    expect(step3Element).not.toHaveClass("indicator--active");
  });
});
