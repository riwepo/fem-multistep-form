import { getItemByCode } from "./utils";

export const TIME_SPANS = [
  { id: 1, code: "MONTH", name: "monthly", shortName: "mo", hasBonus: false },
  { id: 2, code: "YEAR", name: "yearly", shortName: "yr", hasBonus: true },
];

export function getTimespanByCode(code) {
  return getItemByCode(TIME_SPANS, code);
}
