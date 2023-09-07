import React, { useState, useContext, useEffect } from "react";

import { StepContext } from "../context/step-context";

import "./PersonalInfoField.css";

const STEP_CODE = "PERSONAL_INFO";

function PersonalInfoField({
  type,
  id,
  label,
  placeholder,
  validator,
  autoFocus,
}) {
  const [enteredValue, setEnteredValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const stepContext = useContext(StepContext);

  // this will run when the component is mounted
  // restore values from StepContext
  useEffect(() => {
    const isStepInitialised = stepContext.isStepInitialised(STEP_CODE);
    if (!isStepInitialised) return; // don't restore values if they have never been set
    const infoFieldState = stepContext.getPersonalInfoField(id);
    const localValue = infoFieldState.value;
    setEnteredValue(localValue);
    setErrorMessage(validator(localValue));
  }, []);

  const changeHandler = (event) => {
    const localValue = event.target.value.trim();
    setEnteredValue(localValue);
  };

  const blurHandler = (event) => {
    const localValue = event.target.value.trim();
    const errorMessage = validator(localValue);
    setErrorMessage(errorMessage);
    stepContext.setPersonalInfoField(id, enteredValue, errorMessage === "");
  };

  return (
    <div className="personal-info-field grid">
      <div className="input-info flex">
        <label className="fs-300 text-marine-blue" htmlFor={id}>
          {label}
        </label>
        <p
          className={`error-message fs-300 text-strawberry-red ${
            errorMessage !== "" ? "error-message--error" : undefined
          }`}
        >
          {errorMessage}
        </p>
      </div>
      <input
        className={`input ${errorMessage !== "" ? "input--error" : undefined}`}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={enteredValue}
        autoFocus={autoFocus}
      />
    </div>
  );
}

export default PersonalInfoField;
