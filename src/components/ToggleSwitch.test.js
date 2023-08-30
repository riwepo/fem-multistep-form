import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import ToggleSwitch from "./ToggleSwitch";

test("button rendered", () => {
  render(<ToggleSwitch isActive={false} onChange={null} />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("indicator rendered", () => {
  const { container } = render(
    <ToggleSwitch isActive={false} onChange={null} />
  );
  const indicatorElement = container.querySelector(".indicator"); // eslint-disable-line
  expect(indicatorElement).toBeInTheDocument();
});

test("indicator not active", () => {
  const { container } = render(
    <ToggleSwitch isActive={false} onChange={null} />
  );
  const indicatorElement = container.querySelector(".indicator"); // eslint-disable-line
  expect(indicatorElement).not.toHaveClass("indicator--active");
});

test("indicator active", () => {
  const { container } = render(
    <ToggleSwitch isActive={true} onChange={null} />
  );
  const indicatorElement = container.querySelector(".indicator"); // eslint-disable-line
  expect(indicatorElement).toHaveClass("indicator--active");
});

test("onChange called on click", () => {
  const onChange = jest.fn();
  render(<ToggleSwitch isActive={false} onChange={onChange} />);
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(onChange).toBeCalledWith(true);
});
