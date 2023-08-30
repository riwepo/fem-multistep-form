import { STEPS, getStepByCode } from "./steps";

test("get existing step by code", () => {
  const step = getStepByCode("PERSONAL_INFO");
  expect(step).toBe(STEPS[0]);
});

test("should throw an error if step code bad", () => {
  expect(() => {
    getStepByCode("PERSONAL_INFOXXX");
  }).toThrow("Code PERSONAL_INFOXXX matched 0 items");
});
