import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MonthYearToggleSwitch from "./MonthYearToggleSwitch";
import { getTimespanByCode } from "../utils/timespans";

test("if active timespan is month, month is aria-selected, year is not", () => {
  const monthTimespan = getTimespanByCode("MONTH");

  render(
    <MonthYearToggleSwitch
      activeTimespan={monthTimespan}
      onTimespanChange={null}
    />
  );
  const monthParagraphElement = screen.getByText("Monthly");
  const yearParagraphElement = screen.getByText("Yearly");
  expect(monthParagraphElement).toHaveAttribute("aria-selected", "true");
  expect(yearParagraphElement).toHaveAttribute("aria-selected", "false");
});

test("if active timespan is year, year is aria-selected, month is not", () => {
  const yearTimespan = getTimespanByCode("YEAR");

  render(
    <MonthYearToggleSwitch
      activeTimespan={yearTimespan}
      onTimespanChange={null}
    />
  );
  const monthParagraphElement = screen.getByText("Monthly");
  const yearParagraphElement = screen.getByText("Yearly");
  expect(monthParagraphElement).toHaveAttribute("aria-selected", "false");
  expect(yearParagraphElement).toHaveAttribute("aria-selected", "true");
});

test("after click on toggle, onTimespanChange is called", () => {
  const yearTimespan = getTimespanByCode("YEAR");
  const onTimespanChange = jest.fn();

  render(
    <MonthYearToggleSwitch
      activeTimespan={yearTimespan}
      onTimespanChange={onTimespanChange}
    />
  );
  const toggleSwitchElement = screen.getByRole("button");
  fireEvent.click(toggleSwitchElement);
  expect(onTimespanChange).toBeCalledWith(true);
});
