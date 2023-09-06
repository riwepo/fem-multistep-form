import React from "react";

import StepCard from "./StepCard";
import PersonalInfoField from "./PersonalInfoField";

import { getStepByCode } from "../utils/steps";
import { FIELDS } from "../utils/personal_info";

import "./PersonalInfo.css";

const STEP_CODE = "PERSONAL_INFO";

const personalInfoStep = getStepByCode(STEP_CODE);

function PersonalInfo() {
  return (
    <StepCard className="personal-info" stepInfo={personalInfoStep}>
      {FIELDS.map((field) => {
        return (
          <PersonalInfoField
            key={field.id}
            type={field.type}
            id={field.code}
            label={field.label}
            placeholder={field.placeholder}
            validator={field.validator}
          />
        );
      })}
    </StepCard>
  );
}

export default PersonalInfo;
