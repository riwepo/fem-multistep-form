export function getPrice(pricedItem, timespan) {
  if (timespan.code === "YEAR") {
    return pricedItem.priceYear;
  } else if (timespan.code === "MONTH") {
    return pricedItem.priceMonth;
  } else throw new Error(`unexpected timespan ${timespan}`);
}

export function getPriceDisplay(pricedItem, timespan) {
  const price = getPrice(pricedItem, timespan);
  const priceDisplay = `$${price}/${timespan.shortName}`;
  return priceDisplay;
}

export function getIconFilepath(plan) {
  return `${process.env.PUBLIC_URL}/images/icon-${plan.name}.svg`;
}

export function getItemByCode(items, code) {
  const matching = items.filter((item) => item.code === code);
  if (matching.length !== 1) {
    throw new Error(`Code ${code} matched ${matching.length} items`);
  }
  return matching[0];
}

export function replaceItemByCode(items, newItem) {
  const nonMatching = items.filter((item) => item.code !== newItem.code);
  const result = [...nonMatching, newItem];
  return result;
}
