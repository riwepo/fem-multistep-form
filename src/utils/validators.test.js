import { validateEmail, validatePhone, validateName } from "./validators";

test("should return empty string from valid email", () => {
  const errorMessage = validateEmail("stephenking@lorem.com");
  expect(errorMessage).toEqual("");
});

test("should return error string from invalid email", () => {
  const errorMessage = validateEmail("stephenking@@lorem.com");
  expect(errorMessage).toBe("Please enter a valid email");
});

test("should return error string from blank email", () => {
  const errorMessage = validateEmail("");
  expect(errorMessage).toBe("Please enter an email");
});

test("should return empty string from valid phone", () => {
  const errorMessage = validatePhone("1234567890");
  expect(errorMessage).toEqual("");
});

test("should return error string from invalid phone", () => {
  const errorMessage = validatePhone("1234567890###");
  expect(errorMessage).toEqual("Please enter a valid phone number");
});

test("should return error string from empty phone", () => {
  const errorMessage = validatePhone("");
  expect(errorMessage).toEqual("Please enter a phone number");
});

test("should return empty string from valid name", () => {
  const errorMessage = validateName("Stephen King");
  expect(errorMessage).toEqual("");
});

test("should return error string from invalid name", () => {
  const errorMessage = validateName("666Stephen King");
  expect(errorMessage).toEqual("Please enter a valid name");
});

test("should return error string from blank name", () => {
  const errorMessage = validateName("");
  expect(errorMessage).toEqual("Please enter a name");
});
