import React from "react";
import { render, screen } from "@testing-library/react";

import ProgressStepIndicator from "./ProgressStepIndicator";

import { getStepByCode } from "../utils/steps";

test("number is rendered", () => {
  const personalInfoStep = getStepByCode("PERSONAL_INFO");
  render(<ProgressStepIndicator step={personalInfoStep} isActive={false} />);
  const numberElement = screen.getByText(personalInfoStep.number);
  expect(numberElement).toBeInTheDocument();
});

test("title is rendered", () => {
  const personalInfoStep = getStepByCode("PERSONAL_INFO");
  render(<ProgressStepIndicator step={personalInfoStep} isActive={false} />);
  const titleElement = screen.getByText(personalInfoStep.title);
  expect(titleElement).toBeInTheDocument();
});

test("not active", () => {
  const personalInfoStep = getStepByCode("PERSONAL_INFO");
  render(<ProgressStepIndicator step={personalInfoStep} isActive={false} />);
  const numberElement = screen.getByText(personalInfoStep.number);
  expect(numberElement).not.toHaveClass("indicator--active");
});

test("active", () => {
  const personalInfoStep = getStepByCode("PERSONAL_INFO");
  render(<ProgressStepIndicator step={personalInfoStep} isActive={true} />);
  const numberElement = screen.getByText(personalInfoStep.number);
  expect(numberElement).toHaveClass("indicator--active");
});
