import React from "react";
import { render, screen } from "@testing-library/react";

import Checkbox from "./Checkbox";

describe("check box test suite", () => {
  test("if not active aria-selected is false", () => {
    render(<Checkbox isActive={false} />);
    const checkmarkImageElement = screen.getByRole("img");
    const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
    expect(divElement).toHaveAttribute("aria-selected", "false");
  });

  test("if active aria-selected is true", () => {
    render(<Checkbox isActive={true} />);
    const checkmarkImageElement = screen.getByRole("img");
    const divElement = checkmarkImageElement.closest("div"); // eslint-disable-line
    expect(divElement).toHaveAttribute("aria-selected", "true");
  });
});
