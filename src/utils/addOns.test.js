import { ADD_ONS, getAddOnByCode } from "./addOns";

describe("add-ons test suite", () => {
  test("get existing add-on by code", () => {
    const addOn = getAddOnByCode("ONLINE");
    expect(addOn).toBe(ADD_ONS[0]);
  });

  test("should throw an error if add-on code bad", () => {
    expect(() => {
      getAddOnByCode("ONLINEXXX");
    }).toThrow("Code ONLINEXXX matched 0 items");
  });
});
