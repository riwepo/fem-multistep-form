import React from "react";

import Card from "./Card";
import PersonalInfoField from "./PersonalInfoField";

import { validateName, validateEmail, validatePhone } from "../utils";

import "./PersonalInfo.css";

function PersonalInfo() {
  return (
    <Card className="card-personal-info">
      <div className="personal-info grid">
        <h1 className="fs-600 text-marine-blue">Personal Information</h1>
        <p>Please provide your name, email address and phone number.</p>
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
      </div>
    </Card>
  );
}

export default PersonalInfo;
