import React, { useState, useContext } from "react";

import StepCard from "./StepCard";
import PersonalInfoField from "./PersonalInfoField";

import {
  validateName,
  validateEmail,
  validatePhone,
} from "../utils/validators";

import { StepContext } from "../context/step-context";

import { getStepByCode } from "../utils/steps";

import "./PersonalInfo.css";

const personalInfoStep = getStepByCode("PERSONAL_INFO");

function PersonalInfo() {
  const [validState, setValidState] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const stepContext = useContext(StepContext);

  const validChangeHandler = (id, isValid) => {
    const newValidState = { ...validState, [id]: isValid };
    const allFieldsValid = Object.values(newValidState).every(
      (item) => item === true
    );
    setValidState(newValidState);
    stepContext.setIsValid("PERSONAL_INFO", allFieldsValid);
  };
  return (
    <StepCard className="personal-info" stepInfo={personalInfoStep}>
      <PersonalInfoField
        type="text"
        id="name"
        label="Name"
        placeholder="e.g. Stephen King"
        validator={validateName}
        onValidChange={validChangeHandler}
      />
      <PersonalInfoField
        type="email"
        id="email"
        placeholder="e.g. stephenking@lorem.com"
        label="Email"
        validator={validateEmail}
        onValidChange={validChangeHandler}
      />
      <PersonalInfoField
        type="tel"
        id="phone"
        label="Phone number"
        placeholder="e.g. +1 234 567 890"
        validator={validatePhone}
        onValidChange={validChangeHandler}
      />
    </StepCard>
  );
}

export default PersonalInfo;
