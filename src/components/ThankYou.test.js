import React from "react";

import { render, screen } from "@testing-library/react";

import ThankYou from "./ThankYou";

describe("thank you test suite", () => {
  test("renders heading", () => {
    render(<ThankYou />);
    const headingElement = screen.getByText("Thank you!");
    expect(headingElement).toBeInTheDocument();
  });
  test("renders text", () => {
    render(<ThankYou />);
    const textElement = screen.getByText("thanks for confirming your", {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });
  test("renders image", () => {
    render(<ThankYou />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });
  test("on step 4", () => {
    throw new Error("not implemented");
  });
  test("no step control shown", () => {
    throw new Error("not implemented");
  });
});
