import { validateName, validateEmail, validatePhone } from "./validators";

export const FIELDS = [
  {
    id: 1,
    code: "NAME",
    type: "text",
    label: "Name",
    placeholder: "e.g. Stephen King",
    validator: validateName,
  },
  {
    id: 2,
    code: "EMAIL",
    type: "email",
    label: "Email Address",
    placeholder: "e.g. stephenking@gmail.com",
    validator: validateEmail,
  },
  {
    id: 3,
    code: "PHONE",
    type: "phone",
    label: "Phone Number",
    placeholder: "e.g. 0123456789",
    validator: validatePhone,
  },
];
