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

const personalInfoStep = getStepByCode("PERSONAL_INFO");

function PersonalInfo() {
  return (
    <StepCard className="card-step-personal-info" stepInfo={personalInfoStep}>
      <PersonalInfoField
        type="text"
        id="name"
        label="Name"
        placeholder="e.g. Stephen King"
        validator={validateName}
      />
      <PersonalInfoField
        type="email"
        id="email"
        placeholder="e.g. stephenking@lorem.com"
        label="Email"
        validator={validateEmail}
      />
      <PersonalInfoField
        type="tel"
        id="phone"
        label="Phone number"
        placeholder="e.g. +1 234 567 890"
        validator={validatePhone}
      />
    </StepCard>
  );
}

export default PersonalInfo;
