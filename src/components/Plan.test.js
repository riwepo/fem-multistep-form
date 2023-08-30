import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Plan from "./Plan";
import { getPlanByCode } from "../utils/plans";
import { getTimespanByCode } from "../utils/timespans";

test("name is rendered", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={false}
      onActivated={null}
    />
  );
  const nameElement = screen.getByText(arcadePlan.name);
  expect(nameElement).toBeInTheDocument();
});

test("price is rendered", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={false}
      onActivated={null}
    />
  );
  const priceElement = screen.getByText("$9/mo");
  expect(priceElement).toBeInTheDocument();
});

test("bonus is rendered", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={true}
      onActivated={null}
    />
  );

  const bonusElement = screen.getByText("2 months free");
  expect(bonusElement).toBeInTheDocument();
});

test("bonus is not active for monthly plan", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={true}
      onActivated={null}
    />
  );

  const bonusElement = screen.getByText("2 months free");
  expect(bonusElement).toBeInTheDocument();
  expect(bonusElement).not.toHaveClass("bonus--active");
});

test("bonus is active for yearly plan", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const yearyTimespan = getTimespanByCode("YEAR");
  render(
    <Plan
      plan={arcadePlan}
      timeSpan={yearyTimespan}
      isActive={true}
      onActivated={null}
    />
  );

  const bonusElement = screen.getByText("2 months free");
  expect(bonusElement).toBeInTheDocument();
  expect(bonusElement).toHaveClass("bonus--active");
});

test("plan not active", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  const { container } = render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={false}
      onActivated={null}
    />
  );
  const cardElement = container.querySelector(".card-plan"); // eslint-disable-line
  expect(cardElement).toBeInTheDocument();
  expect(cardElement).not.toHaveClass("card-plan--active");
});

test("plan active", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  const { container } = render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={true}
      onActivated={null}
    />
  );
  const cardElement = container.querySelector(".card-plan"); // eslint-disable-line
  expect(cardElement).toBeInTheDocument();
  expect(cardElement).toHaveClass("card-plan--active");
});

test("onActivate called on click", () => {
  const arcadePlan = getPlanByCode("ARCADE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  const onActivated = jest.fn();
  const { container } = render(
    <Plan
      plan={arcadePlan}
      timeSpan={monthlyTimespan}
      isActive={false}
      onActivated={onActivated}
    />
  );
  const planDivElement = container.querySelector(".plan"); // eslint-disable-line
  expect(planDivElement).toBeInTheDocument();
  planDivElement && fireEvent.click(planDivElement);
  expect(onActivated).toBeCalledWith(arcadePlan.code);
});
