import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";
import Plan from "./Plan";

import { PLANS, TIME_SPANS, ADD_ONS } from "../utils";

import "./DesignSystem.css";
import ToggleSwitch from "./ToggleSwitch";
import MonthYearToggleSwitch from "./MonthYearToggleSwitch";
import AddOn from "./AddOn";
import Checkbox from "./Checkbox";
import PersonalInfoField from "./PersonalInfoField";

const progressData = [
  { step: 1, title: "Your info", isActive: true },
  { step: 2, title: "Select plan", isActive: false },
  { step: 3, title: "Add-ons", isActive: false },
  { step: 4, title: "Summary", isActive: false },
];

function DesignSystem() {
  const validateEmail = (email) => {
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return "Please enter a valid email";
    }
    return "";
  };
  const validatePhone = (phone) => {
    if (
      !phone.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    ) {
      return "Please enter a valid phone number";
    }
    return "";
  };
  const validateName = (name) => {
    if (!name.match(/^[a-zA-Z ]+$/)) {
      return "Please enter a valid name";
    }
    return "";
  };
  return (
    <div className="design-system grid">
      {/* <ProgressIndicator data={progressData} />
      <StepControl canGoBack={false} isValid={true} isLastPage={false} />
      <StepControl canGoBack={true} isValid={true} isLastPage={false} />
      <StepControl canGoBack={true} isValid={true} isLastPage={true} />
      <StepControl canGoBack={true} isValid={false} isLastPage={false} />
      <Plan plan={PLANS.arcade} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.arcade} timeSpan={TIME_SPANS.year} />
      <Plan plan={PLANS.advanced} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.advanced} timeSpan={TIME_SPANS.year} />
      <Plan plan={PLANS.pro} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.pro} timeSpan={TIME_SPANS.year} />
      <ToggleSwitch isActive={false} onChange={null} />
      <MonthYearToggleSwitch />
      <Checkbox isActive={false} />
      <Checkbox isActive={true} />
      <AddOn addOn={ADD_ONS.online} timeSpan={TIME_SPANS.month} />
      <AddOn addOn={ADD_ONS.online} timeSpan={TIME_SPANS.year} />
      <AddOn addOn={ADD_ONS.storage} timeSpan={TIME_SPANS.month} />
      <AddOn addOn={ADD_ONS.storage} timeSpan={TIME_SPANS.year} />
      <AddOn addOn={ADD_ONS.customizable} timeSpan={TIME_SPANS.month} />
      <AddOn addOn={ADD_ONS.customizable} timeSpan={TIME_SPANS.year} /> */}
      <PersonalInfoField
        type="text"
        id="name"
        label="Name"
        validator={(name) => {
          if (name !== "fred") return "name must be fred";
          return "";
        }}
      />
      <PersonalInfoField
        type="email"
        id="email"
        label="Email"
        validator={validateEmail}
      />
      <PersonalInfoField
        type="tel"
        id="phone"
        label="Phone number"
        validator={validatePhone}
      />
    </div>
  );
}

export default DesignSystem;
