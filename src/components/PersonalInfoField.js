import React, { useState } from "react";

import "./PersonalInfoField.css";

function PersonalInfoField({
  type,
  id,
  label,
  placeholder,
  validator,
  onValidChange,
}) {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);
  const [enteredValueHasError, setEnteredValueHasError] = useState(false);
  const [enteredValueIsValid, setEnteredValueIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (event) => {
    setEnteredValueIsTouched(true);
  };

  const blurHandler = (event) => {
    const localValue = event.target.value.trim();
    setEnteredValue(localValue);
    if (localValue === "") {
      setErrorMessage("This field is required.");
      setEnteredValueHasError(true);
      setEnteredValueIsValid(false);
      onValidChange(id, false);
      return;
    }
    const error = validator(localValue);
    if (error !== "") {
      setErrorMessage(error);
      setEnteredValueHasError(true);
      setEnteredValueIsValid(false);
      onValidChange(id, false);
      return;
    }

    setErrorMessage("");
    setEnteredValueHasError(false);
    setEnteredValueIsValid(true);
    onValidChange(id, true);
  };

  return (
    <div className="personal-info-field grid">
      <div className="input-info flex">
        <label className="fs-300 text-marine-blue" htmlFor={id}>
          {label}
        </label>
        <p
          className={`error-message fs-300 text-strawberry-red ${
            enteredValueHasError ? "error-message--error" : undefined
          }`}
        >
          {errorMessage}
        </p>
      </div>
      <input
        className={`input ${enteredValueHasError ? "input--error" : undefined}`}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    </div>
  );
}

export default PersonalInfoField;
