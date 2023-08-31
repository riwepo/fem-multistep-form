import {
  STEPS,
  getStepByCode,
  hasPrevStep,
  hasNextStep,
  getPrevStep,
  getNextStep,
} from "./steps";

test("get existing step by code", () => {
  const step = getStepByCode("PERSONAL_INFO");
  expect(step).toBe(STEPS[0]);
});

test("should throw an error if step code bad", () => {
  expect(() => {
    getStepByCode("PERSONAL_INFOXXX");
  }).toThrow("Code PERSONAL_INFOXXX matched 0 items");
});

test("hasPrevStep on first step returns false", () => {
  const result = hasPrevStep(STEPS[0].code);
  expect(result).toBe(false);
});

test("hasPrevStep on second step returns true", () => {
  const result = hasPrevStep(STEPS[1].code);
  expect(result).toBe(true);
});

test("hasNextStep on last step returns false", () => {
  const result = hasNextStep(STEPS[STEPS.length - 1].code);
  expect(result).toBe(false);
});

test("hasNextStep on second last step returns true", () => {
  const result = hasPrevStep(STEPS[STEPS.length - 2].code);
  expect(result).toBe(true);
});

test("getPrevStep on first step throws", () => {
  expect(() => {
    getPrevStep("PERSONAL_INFO");
  }).toThrow("invalid prev step PERSONAL_INFO");
});

test("getPrevStep on second step returns step", () => {
  const step = getPrevStep("SELECT_PLAN");
  expect(step.code).toBe("PERSONAL_INFO");
});

test("getNextStep on last step throws", () => {
  expect(() => {
    getNextStep("PICK_ADD_ONS");
  }).toThrow("invalid next step PICK_ADD_ONS");
});

test("getNextStep on second last step returns step", () => {
  const step = getNextStep("SELECT_PLAN");
  expect(step.code).toBe("PICK_ADD_ONS");
});
