import { TIME_SPANS, getTimespanByCode } from "./timespans";

test("get existing timespan by code", () => {
  const timespan = getTimespanByCode("MONTH");
  expect(timespan).toBe(TIME_SPANS[0]);
});

test("should throw an error if time-span code bad", () => {
  expect(() => {
    getTimespanByCode("MONTHXXX");
  }).toThrow("Code MONTHXXX matched 0 items");
});
