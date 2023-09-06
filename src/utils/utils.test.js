import {
  getIconFilepath,
  getItemByCode,
  getPrice,
  getPriceDisplay,
  getTotalPriceDisplay,
} from "./utils";
import { getPlanByCode } from "./plans";
import { getTimespanByCode } from "./timespans";
import { getAddOnByCode } from "./addOns";

describe("utils test suite", () => {
  test("get monthly price from plan", () => {
    const arcade = getPlanByCode("ARCADE");
    const monthly = getTimespanByCode("MONTH");
    const price = getPrice(arcade, monthly);
    expect(price).toBe(arcade.priceMonth);
  });

  test("get yearly price from plan", () => {
    const advanced = getPlanByCode("ADVANCED");
    const yearly = getTimespanByCode("YEAR");
    const price = getPrice(advanced, yearly);
    expect(price).toBe(advanced.priceYear);
  });

  test("get monthly price from add-on", () => {
    const online = getAddOnByCode("ONLINE");
    const monthly = getTimespanByCode("MONTH");
    const price = getPrice(online, monthly);
    expect(price).toBe(online.priceMonth);
  });

  test("get yearly price from add-on", () => {
    const storage = getAddOnByCode("STORAGE");
    const yearly = getTimespanByCode("YEAR");
    const price = getPrice(storage, yearly);
    expect(price).toBe(storage.priceYear);
  });

  test("get monthly price display from plan", () => {
    const arcade = getPlanByCode("ARCADE");
    const monthly = getTimespanByCode("MONTH");
    const priceDisplay = getPriceDisplay(arcade, monthly);
    expect(priceDisplay).toBe("$9/mo");
  });

  test("get yearly price display from plan", () => {
    const advanced = getPlanByCode("ADVANCED");
    const yearly = getTimespanByCode("YEAR");
    const priceDisplay = getPriceDisplay(advanced, yearly);
    expect(priceDisplay).toBe("$120/yr");
  });

  test("get total price display from plan and addons", () => {
    const advanced = getPlanByCode("ADVANCED"); //120
    const online = getAddOnByCode("ONLINE"); //10
    const storage = getAddOnByCode("STORAGE"); //10
    const customizable = getAddOnByCode("CUSTOMIZABLE"); //10
    const items = [advanced, online, storage, customizable];
    const yearly = getTimespanByCode("YEAR");
    const totalPriceDisplay = getTotalPriceDisplay(items, yearly);
    expect(totalPriceDisplay).toBe("$150/yr");
  });

  test("get icon file path for pro plan", () => {
    const pro = getPlanByCode("PRO");
    const filepath = getIconFilepath(pro);
    expect(filepath).toBe("/images/icon-pro.svg");
  });

  const testItems = [{ code: "FIRST" }, { code: "SECOND" }];
  test("get item by code", () => {
    const first = getItemByCode(testItems, "FIRST");
    expect(first).toBe(testItems[0]);
  });

  test("should throw an error if code doesnt match", () => {
    expect(() => {
      getItemByCode(testItems, "FIRSTXXX");
    }).toThrow("Code FIRSTXXX matched 0 items");
  });

  const testItemsWithDuplicate = [
    { code: "FIRST" },
    { code: "FIRST" },
    { code: "SECOND" },
  ];
  test("should throw an error if code matches multiple", () => {
    expect(() => {
      getItemByCode(testItemsWithDuplicate, "FIRST");
    }).toThrow("Code FIRST matched 2 items");
  });
});
