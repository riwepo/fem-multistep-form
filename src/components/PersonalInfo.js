import React from "react";

import StepCard from "./StepCard";
import PersonalInfoField from "./PersonalInfoField";

import { STEPS, validateName, validateEmail, validatePhone } from "../utils";

import "./PersonalInfo.css";

function PersonalInfo() {
  return (
    <StepCard cardInfo={STEPS[0]}>
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
        placeholder="stephenking@lorem.com"
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
