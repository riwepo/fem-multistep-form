import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import SelectPlan from "./SelectPlan";

import { PLANS } from "../utils/plans";
import { getPriceDisplay } from "../utils/utils";
import { getTimespanByCode } from "../utils/timespans";

test.each(PLANS)("render plan %p", (plan) => {
  render(<SelectPlan />);
  const planTitleElement = screen.getByText(plan.name);
  expect(planTitleElement).toBeInTheDocument();
});

test("toggle switch rendered", () => {
  render(<SelectPlan />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("initial active plan is first plan", () => {
  const { container } = render(<SelectPlan />);
  const cardPlanDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  expect(cardPlanDivs[0]).toHaveClass("plan--active");
  const cardPlanDivsArray = [...cardPlanDivs];
  const activeDivCount = cardPlanDivsArray.filter((div) =>
    div.classList.contains("plan--active")
  ).length;
  expect(activeDivCount).toBe(1);
});

test("initial active timespan is monthly", () => {
  render(<SelectPlan />);
  const monthlyElement = screen.getByText("Monthly");
  const yearlyElement = screen.getByText("Yearly");
  expect(monthlyElement).toBeInTheDocument();
  expect(monthlyElement).toHaveClass("month-title--active");
  expect(yearlyElement).toBeInTheDocument();
  expect(yearlyElement).not.toHaveClass("year-title--active");
});

test("clicking on plan actvates it", () => {
  const { container } = render(<SelectPlan />);
  const cardPlanDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  const planDivs = container.querySelectorAll(".plan"); // eslint-disable-line
  const planDivsArray = [...planDivs];
  fireEvent.click(planDivsArray[1]);
  expect(cardPlanDivs[1]).toHaveClass("plan--active");
  const cardPlanDivsArray = [...cardPlanDivs];
  const activeDivCount = cardPlanDivsArray.filter((div) =>
    div.classList.contains("plan--active")
  ).length;
  expect(activeDivCount).toBe(1);
});

test("toggling timespan updates all prices", () => {
  render(<SelectPlan />);
  const monthly = getTimespanByCode("MONTH");
  PLANS.forEach((plan) => {
    const priceDisplay = getPriceDisplay(plan, monthly);
    const priceElement = screen.getByText(priceDisplay);
    expect(priceElement).toBeInTheDocument();
  });

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);

  const yearly = getTimespanByCode("YEAR");
  PLANS.forEach((plan) => {
    const priceDisplay = getPriceDisplay(plan, yearly);
    const priceElement = screen.getByText(priceDisplay);
    expect(priceElement).toBeInTheDocument();
  });
});
