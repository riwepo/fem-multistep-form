export function validateEmail(email) {
  if (!email) {
    return "Please enter an email";
  }
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
  if (!phone) {
    return "Please enter a phone number";
  }
  if (
    !phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  ) {
    return "Please enter a valid phone number";
  }
  return "";
}
export function validateName(name) {
  if (!name) {
    return "Please enter a name";
  }
  if (!name.match(/^[a-zA-Z ]+$/)) {
    return "Please enter a valid name";
  }
  return "";
}
