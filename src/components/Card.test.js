import React from "react";
import { render, screen } from "@testing-library/react";

import Card from "./Card";

test("renders Card content", () => {
  const text = "hello world";
  render(
    <Card className={undefined}>
      <h1>{text}</h1>
    </Card>
  );
  const h1Element = screen.getByText(text);
  expect(h1Element).toBeInTheDocument();
});