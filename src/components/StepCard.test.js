import React from "react";
import { render, screen } from "@testing-library/react";

import StepCard from "./StepCard";
import { STEPS } from "../utils/steps";

describe("step card test suite", () => {
  test("renders StepCard content", () => {
    const step = STEPS[0];
    const text = "hello world";
    render(
      <StepCard className={undefined} stepInfo={step}>
        <h1>{text}</h1>
      </StepCard>
    );
    const h1Element = screen.getByText(text);
    expect(h1Element).toBeInTheDocument();
  });

  test("renders step title", () => {
    const step = STEPS[0];
    const text = "hello world";
    render(
      <StepCard className={undefined} stepInfo={step}>
        <h1>{text}</h1>
      </StepCard>
    );
    const stepTitleElement = screen.getByText(step.title);
    expect(stepTitleElement).toBeInTheDocument();
  });

  test("renders step description", () => {
    const step = STEPS[0];
    const text = "hello world";
    render(
      <StepCard className={undefined} stepInfo={step}>
        <h1>{text}</h1>
      </StepCard>
    );
    const stepDescriptionElement = screen.getByText(step.description);
    expect(stepDescriptionElement).toBeInTheDocument();
  });
});
