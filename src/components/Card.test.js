import React from "react";
import { render, screen } from "@testing-library/react";

import Card from "./Card";

describe("card test suite", () => {
  test("renders Card content", () => {
    const text = "hello world";
    render(
      <Card className={undefined} autoFocus={false} onClick={null}>
        <h1>{text}</h1>
      </Card>
    );
    const h1Element = screen.getByText(text);
    expect(h1Element).toBeInTheDocument();
  });

  test("autoFocus false", () => {
    const text = "hello world";
    render(
      <Card className={undefined} autoFocus={false} onClick={null}>
        <h1>{text}</h1>
      </Card>
    );
    const h1Element = screen.getByText(text);
    expect(h1Element).not.toHaveFocus();
  });

  test("autoFocus true", () => {
    const text = "hello world";
    const { container } = render(
      <Card className={undefined} autoFocus={true} onClick={null}>
        <h1>{text}</h1>
      </Card>
    );
    const cardDivElement = container.querySelector(".card"); // eslint-disable-line
    expect(cardDivElement).toHaveFocus();
  });
});
