import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalInfo from "./PersonalInfo";

test("name input is rendered", () => {
  render(<PersonalInfo />);
  const nameInput = screen.getByPlaceholderText("e.g. Stephen King");
  expect(nameInput).toBeInTheDocument();
});

test("email input is rendered", () => {
  render(<PersonalInfo />);
  const emailInput = screen.getByPlaceholderText("e.g. stephenking@lorem.com");
  expect(emailInput).toBeInTheDocument();
});

test("phone input is rendered", () => {
  render(<PersonalInfo />);
  const phoneInput = screen.getByPlaceholderText("e.g. +1 234 567 890");
  expect(phoneInput).toBeInTheDocument();
});
