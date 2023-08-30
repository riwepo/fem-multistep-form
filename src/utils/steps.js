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
