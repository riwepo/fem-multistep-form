import React from "react";

import StepCard from "./StepCard";
import PersonalInfoField from "./PersonalInfoField";

import {
  validateName,
  validateEmail,
  validatePhone,
} from "../utils/validators";

import { getStepByCode } from "../utils/steps";

import "./PersonalInfo.css";

const STEP_CODE = "PERSONAL_INFO";

const personalInfoStep = getStepByCode(STEP_CODE);

function PersonalInfo() {
  return (
    <StepCard className="personal-info" stepInfo={personalInfoStep}>
      <PersonalInfoField
        type="text"
        id="name"
        label="Name"
        placeholder="e.g. Stephen King"
        validator={validateName}
      />
      <PersonalInfoField
        type="text"
        id="email"
        label="Email"
        placeholder="e.g. stephenking@gmail.com"
        validator={validateEmail}
      />
      <PersonalInfoField
        type="text"
        id="phone"
        label="Phone"
        placeholder="e.g. 0123456789"
        validator={validatePhone}
      />
    </StepCard>
  );
}

export default PersonalInfo;
