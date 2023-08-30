import { getItemByCode } from "./utils";

export const TIME_SPANS = [
  { id: 1, code: "MONTH", display: "mo", hasBonus: false },
  { id: 2, code: "YEAR", display: "yr", hasBonus: true },
];

export function getTimespanByCode(code) {
  return getItemByCode(TIME_SPANS, code);
}
