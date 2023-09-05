import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MonthYearToggleSwitch from "./MonthYearToggleSwitch";
import { getTimespanByCode } from "../utils/timespans";

const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");

test("if active timespan is month, toggle should be inactive", () => {
  const { container } = render(
    <MonthYearToggleSwitch
      activeTimespan={monthlyTimespan}
      onTimespanChange={null}
    />
  );
  const indicatorElement = container.querySelector(".toggle-switch .indicator"); // eslint-disable-line
  expect(indicatorElement).not.toHaveClass("indicator--active");
});

test("if active timespan is year, toggle should be active", () => {
  const { container } = render(
    <MonthYearToggleSwitch
      activeTimespan={yearlyTimespan}
      onTimespanChange={null}
    />
  );
  const indicatorElement = container.querySelector(".toggle-switch .indicator"); // eslint-disable-line
  expect(indicatorElement).toHaveClass("indicator--active");
});

test("if active timespan is month, month is aria-selected, year is not", () => {
  render(
    <MonthYearToggleSwitch
      activeTimespan={monthlyTimespan}
      onTimespanChange={null}
    />
  );
  const monthParagraphElement = screen.getByText("Monthly");
  const yearParagraphElement = screen.getByText("Yearly");
  expect(monthParagraphElement).toHaveAttribute("aria-selected", "true");
  expect(yearParagraphElement).toHaveAttribute("aria-selected", "false");
});

test("if active timespan is year, year is aria-selected, month is not", () => {
  render(
    <MonthYearToggleSwitch
      activeTimespan={yearlyTimespan}
      onTimespanChange={null}
    />
  );
  const monthParagraphElement = screen.getByText("Monthly");
  const yearParagraphElement = screen.getByText("Yearly");
  expect(monthParagraphElement).toHaveAttribute("aria-selected", "false");
  expect(yearParagraphElement).toHaveAttribute("aria-selected", "true");
});

test("after click on toggle, onTimespanChange is called", () => {
  const onTimespanChange = jest.fn();

  render(
    <MonthYearToggleSwitch
      activeTimespan={monthlyTimespan}
      onTimespanChange={onTimespanChange}
    />
  );
  const toggleSwitchElement = screen.getByRole("button");
  fireEvent.click(toggleSwitchElement);
  expect(onTimespanChange).toBeCalledWith(true);
});
