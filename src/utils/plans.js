import { getItemByCode } from "./utils";

export const PLANS = [
  { id: 1, code: "ARCADE", name: "arcade", priceMonth: 9, priceYear: 90 },
  {
    id: 2,
    code: "ADVANCED",
    name: "advanced",
    priceMonth: 12,
    priceYear: 120,
  },
  { id: 3, code: "PRO", name: "pro", priceMonth: 15, priceYear: 150 },
];

export function getPlanByCode(code) {
  return getItemByCode(PLANS, code);
}
