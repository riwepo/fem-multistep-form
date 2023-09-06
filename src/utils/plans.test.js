import { PLANS, getPlanByCode } from "./plans";

describe("plans test suite", () => {
  test("get existing plan by code", () => {
    const plan = getPlanByCode("ARCADE");
    expect(plan).toBe(PLANS[0]);
  });

  test("should throw an error if plan code bad", () => {
    expect(() => {
      getPlanByCode("ARCADEXXX");
    }).toThrow("Code ARCADEXXX matched 0 items");
  });
});
