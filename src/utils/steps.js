import { getItemByCode } from "./utils";

export const STEPS = [
  {
    id: 1,
    number: "1",
    code: "PERSONAL_INFO",
    title: "Personal info",
    description: "Please provide your name, email address and phone number.",
    fieldCodes: ["name", "email", "phone"],
    defaultFieldValid: false,
  },
  {
    id: 2,
    number: "2",
    code: "SELECT_PLAN",
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    fieldCodes: ["selected_plan"],
    defaultFieldValid: false,
  },
  {
    id: 3,
    number: "3",
    code: "PICK_ADD_ONS",
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    fieldCodes: ["ONLINE", "STORAGE", "CUSTOMIZABLE"],
    defaultFieldValid: true,
  },
  {
    id: 4,
    number: "4",
    code: "FINISH_UP",
    title: "Finishing up",
    description: "Double check everything looks OK before confirming.",
    fieldCodes: ["CONFIRM"],
    defaultFieldValid: true,
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
