export const PLANS = {
  arcade: { name: "arcade", priceMonth: 9, priceYear: 90 },
  advanced: { name: "advanced", priceMonth: 12, priceYear: 120 },
  pro: { name: "pro", priceMonth: 15, priceYear: 150 },
};

export const TIME_SPANS = {
  month: { code: "MONTH", display: "mo", hasBonus: false },
  year: { code: "YEAR", display: "yr", hasBonus: true },
};

export function getPrice(plan, timeSpan) {
  if (timeSpan.code === "YEAR") {
    return plan.priceYear;
  } else if (timeSpan.code === "MONTH") {
    return plan.priceMonth;
  } else throw new Error(`unexpected timespan ${timeSpan}`);
}

export function getIcon(plan) {
  return `${process.env.PUBLIC_URL}/images/icon-${plan.name}.svg`;
}
