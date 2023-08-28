export const PLANS = {
  arcade: { name: "arcade", priceMonth: 9, priceYear: 90 },
  advanced: { name: "advanced", priceMonth: 12, priceYear: 120 },
  pro: { name: "pro", priceMonth: 15, priceYear: 150 },
};

export const TIME_SPANS = {
  month: { code: "MONTH", display: "mo", hasBonus: false },
  year: { code: "YEAR", display: "yr", hasBonus: true },
};

export const ADD_ONS = {
  online: {
    code: "ONLINE",
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonth: 1,
    priceYear: 10,
  },
  storage: {
    code: "STORAGE",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonth: 1,
    priceYear: 10,
  },
  customizable: {
    code: "CUSTOMIZABLE",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonth: 1,
    priceYear: 10,
  },
};

export const STEPS = [
  {
    id: 1,
    title: "Personal info",
    description: "Please provide your name, email address and phone number.",
  },
  {
    id: 2,
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
  },
  {
    id: 3,
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
  },
];

export function getPrice(pricedItem, timeSpan) {
  if (timeSpan.code === "YEAR") {
    return pricedItem.priceYear;
  } else if (timeSpan.code === "MONTH") {
    return pricedItem.priceMonth;
  } else throw new Error(`unexpected timespan ${timeSpan}`);
}

export function getIcon(plan) {
  return `${process.env.PUBLIC_URL}/images/icon-${plan.name}.svg`;
}

export function validateEmail(email) {
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return "Please enter a valid email";
  }
  return "";
}
export function validatePhone(phone) {
  if (
    !phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  ) {
    return "Please enter a valid phone number";
  }
  return "";
}
export function validateName(name) {
  if (!name.match(/^[a-zA-Z ]+$/)) {
    return "Please enter a valid name";
  }
  return "";
}
