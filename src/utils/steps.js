import { getItemByCode } from "./utils";

export const STEPS = [
  {
    id: 1,
    number: "1",
    code: "PERSONAL_INFO",
    title: "Personal info",
    description: "Please provide your name, email address and phone number.",
  },
  {
    id: 2,
    number: "2",
    code: "SELECT_PLAN",
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
  },
  {
    id: 3,
    number: "3",
    code: "PICK_ADD_ONS",
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
  },
];

export function getStepByCode(code) {
  return getItemByCode(STEPS, code);
}

export function hasNextStep(code) {
  const step = getStepByCode(code);
  const index = STEPS.indexOf(step);
  return index < STEPS.length - 1;
}

export function getNextStep(code) {
  if (!hasNextStep(code)) throw new Error(`invalid next step ${code}`);
  const step = getStepByCode(code);
  const index = STEPS.indexOf(step);
  return STEPS[index + 1];
}

export function hasPrevStep(code) {
  const step = getStepByCode(code);
  const index = STEPS.indexOf(step);
  return index > 0;
}

export function getPrevStep(code) {
  if (!hasPrevStep(code)) throw new Error(`invalid prev step ${code}`);
  const step = getStepByCode(code);
  const index = STEPS.indexOf(step);
  return STEPS[index - 1];
}
