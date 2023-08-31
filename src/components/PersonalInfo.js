import React, { useState } from "react";

import StepCard from "./StepCard";
import PersonalInfoField from "./PersonalInfoField";

import {
  validateName,
  validateEmail,
  validatePhone,
} from "../utils/validators";

import { getStepByCode } from "../utils/steps";

import "./PersonalInfo.css";

const personalInfoStep = getStepByCode("PERSONAL_INFO");

function PersonalInfo({ onValidChange }) {
  const [validState, setValidState] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const validChangeHandler = (id, isValid) => {
    const newValidState = { ...validState, [id]: isValid };
    setValidState(newValidState);
    onValidChange(newValidState);
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
