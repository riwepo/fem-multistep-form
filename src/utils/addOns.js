import { getItemByCode } from "./utils";

export const ADD_ONS = [
  {
    id: 1,
    code: "ONLINE",
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonth: 1,
    priceYear: 10,
  },
  {
    id: 2,
    code: "STORAGE",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonth: 1,
    priceYear: 10,
  },
  {
    id: 3,
    code: "CUSTOMIZABLE",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonth: 1,
    priceYear: 10,
  },
];

export function getAddOnByCode(code) {
  return getItemByCode(ADD_ONS, code);
}
