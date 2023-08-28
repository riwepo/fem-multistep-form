import React, { useState } from "react";

import "./PersonalInfoField.css";

function PersonalInfoField({ label, validator }) {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);
  const [enteredValueHasError, setEnteredValueHasError] = useState(false);
  const [enteredValueIsValid, setEnteredValueIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (event) => {
    setEnteredValueIsTouched(true);
    const localValue = event.target.value.trim();
    console.log(localValue);
    setEnteredValue(localValue);
    if (localValue === "") {
      setErrorMessage("This field is required.");
      setEnteredValueHasError(true);
      setEnteredValueIsValid(false);
      return;
    }
    const error = validator(localValue);
    if (error !== "") {
      setErrorMessage(error);
      setEnteredValueHasError(true);
      setEnteredValueIsValid(false);
      return;
    }

    setErrorMessage("");
    setEnteredValueHasError(false);
    setEnteredValueIsValid(true);
  };

  return (
    <div className="personal-info-field grid">
      <div className="input-info flex">
        <label className="fs-300 text-marine-blue" htmlFor="name">
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
        id="name"
        type="text"
        placeholder="e.g. Stephen King"
        onChange={changeHandler}
      />
    </div>
  );
}

export default PersonalInfoField;
