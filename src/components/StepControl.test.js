import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import StepControl from "./StepControl";

test("back button has class visible", () => {
  render(
    <StepControl
      canGoBack={true}
      isValid={true}
      isLastPage={false}
      onBackClicked={null}
      onFwdClicked={null}
    />
  );
  const backButtonElement = screen.getByText("Go back");
  expect(backButtonElement).toHaveClass("btn-back--visible");
});

test("back button doesn't have class visible", () => {
  render(
    <StepControl
      canGoBack={false}
      isValid={true}
      isLastPage={false}
      onBackClicked={null}
      onFwdClicked={null}
    />
  );
  const backButtonElement = screen.getByText("Go back");
  expect(backButtonElement).not.toHaveClass("btn-back--visible");
});

test("not last page fwd button says 'Next step'", () => {
  render(
    <StepControl
      canGoBack={true}
      isValid={true}
      isLastPage={false}
      onBackClicked={null}
      onFwdClicked={null}
    />
  );
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).toBeInTheDocument();
});

test("last page fwd button says 'Confirm'", () => {
  render(
    <StepControl
      canGoBack={true}
      isValid={true}
      isLastPage={true}
      onBackClicked={null}
      onFwdClicked={null}
    />
  );
  const fwdButtonElement = screen.getByText("Confirm");
  expect(fwdButtonElement).toBeInTheDocument();
});

test("if valid forward button is enabled", () => {
  render(
    <StepControl
      canGoBack={true}
      isValid={true}
      isLastPage={false}
      onBackClicked={null}
      onFwdClicked={null}
    />
  );
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).not.toHaveAttribute("disabled");
});

test("if invalid forward button is disabled", () => {
  render(
    <StepControl
      canGoBack={true}
      isValid={false}
      isLastPage={false}
      onBackClicked={null}
      onFwdClicked={null}
    />
  );
  const fwdButtonElement = screen.getByText("Next step");
  expect(fwdButtonElement).toHaveAttribute("disabled");
});

test("if can go back and back button clicked callback", () => {
  const onBackClicked = jest.fn();
  const onFwdClicked = jest.fn();
  render(
    <StepControl
      canGoBack={true}
      isValid={true}
      isLastPage={false}
      onBackClicked={onBackClicked}
      onFwdClicked={onFwdClicked}
    />
  );
  const backButtonElement = screen.getByText("Go back");
  fireEvent.click(backButtonElement);
  expect(onBackClicked).toBeCalled();
  expect(onFwdClicked).not.toBeCalled();
});

test("if valid and forward button clicked callback", () => {
  const onBackClicked = jest.fn();
  const onFwdClicked = jest.fn();
  render(
    <StepControl
      canGoBack={true}
      isValid={true}
      isLastPage={false}
      onBackClicked={onBackClicked}
      onFwdClicked={onFwdClicked}
    />
  );
  const fwdButtonElement = screen.getByText("Next step");
  fireEvent.click(fwdButtonElement);
  expect(onBackClicked).not.toBeCalled();
  expect(onFwdClicked).toBeCalled();
});
