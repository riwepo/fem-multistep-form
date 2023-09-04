import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import AddOn from "./AddOn";
import { getAddOnByCode } from "../utils/addOns";
import { getTimespanByCode } from "../utils/timespans";

test("renders AddOn with name and description", () => {
  const onlineAddOn = getAddOnByCode("ONLINE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(<AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />);
  const nameElement = screen.getByText(onlineAddOn.name);
  expect(nameElement).toBeInTheDocument();
  const descriptionElement = screen.getByText(onlineAddOn.description);
  expect(descriptionElement).toBeInTheDocument();
});

test("div surrounding img initially has aria-selected false", () => {
  const onlineAddOn = getAddOnByCode("ONLINE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(<AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />);
  const checkmarkImageElement = screen.getByRole("img");
  const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
  expect(divElement).toHaveAttribute("aria-selected", "false");
});

// here I want to test if the click has an effect
// the only thing I can measure is the aria-selected attribute
test("after click div surrounding img has aria-selected true", () => {
  const onlineAddOn = getAddOnByCode("ONLINE");
  const monthlyTimespan = getTimespanByCode("MONTH");
  render(<AddOn addOn={onlineAddOn} timespan={monthlyTimespan} />);
  const checkmarkImageElement = screen.getByRole("img");
  const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
  divElement && fireEvent.click(divElement);
  expect(divElement).toHaveAttribute("aria-selected", "true");
});
