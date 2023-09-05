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
  const firstStepCode = STEPS[0].code;
  expect(() => {
    getPrevStep(firstStepCode);
  }).toThrow(`invalid prev step ${firstStepCode}`);
});

test("getPrevStep on second step returns first step", () => {
  const firstStepCode = STEPS[0].code;
  const secondStepCode = STEPS[1].code;
  const step = getPrevStep(secondStepCode);
  expect(step.code).toBe(firstStepCode);
});

test("getNextStep on last step throws", () => {
  const lastStepCode = STEPS[STEPS.length - 1].code;
  expect(() => {
    getNextStep(lastStepCode);
  }).toThrow(`invalid next step ${lastStepCode}`);
});

test("getNextStep on second last step returns last step", () => {
  const secondLastStepCode = STEPS[STEPS.length - 2].code;
  const lastStepCode = STEPS[STEPS.length - 1].code;
  const step = getNextStep(secondLastStepCode);
  expect(step.code).toBe(lastStepCode);
});
