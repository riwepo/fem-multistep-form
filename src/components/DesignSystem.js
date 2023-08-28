import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";
import Plan from "./Plan";
import SelectPlan from "./SelectPlan";

import {
  PLANS,
  TIME_SPANS,
  ADD_ONS,
  STEPS,
  validateName,
  validateEmail,
  validatePhone,
} from "../utils";

import "./DesignSystem.css";
import ToggleSwitch from "./ToggleSwitch";
import MonthYearToggleSwitch from "./MonthYearToggleSwitch";
import AddOn from "./AddOn";
import Checkbox from "./Checkbox";
import PersonalInfoField from "./PersonalInfoField";
import PersonalInfo from "./PersonalInfo";
import StepCard from "./StepCard";

const progressData = [
  { step: 1, title: "Your info", isActive: true },
  { step: 2, title: "Select plan", isActive: false },
  { step: 3, title: "Add-ons", isActive: false },
  { step: 4, title: "Summary", isActive: false },
];

function DesignSystem() {
  return (
    <div className="design-system grid">
      {/* <ProgressIndicator data={progressData} />
      <StepControl canGoBack={false} isValid={true} isLastPage={false} />
      <StepControl canGoBack={true} isValid={true} isLastPage={false} />
      <StepControl canGoBack={true} isValid={true} isLastPage={true} />
      <StepControl canGoBack={true} isValid={false} isLastPage={false} /> */}
      {/* <Plan plan={PLANS.arcade} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.arcade} timeSpan={TIME_SPANS.year} />
      <Plan plan={PLANS.advanced} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.advanced} timeSpan={TIME_SPANS.year} />
      <Plan plan={PLANS.pro} timeSpan={TIME_SPANS.month} />
      <Plan plan={PLANS.pro} timeSpan={TIME_SPANS.year} /> */}
      {/* <ToggleSwitch isActive={false} onChange={null} />
      <MonthYearToggleSwitch />
      <Checkbox isActive={false} />
      <Checkbox isActive={true} />
      <AddOn addOn={ADD_ONS.online} timeSpan={TIME_SPANS.month} />
      <AddOn addOn={ADD_ONS.online} timeSpan={TIME_SPANS.year} />
      <AddOn addOn={ADD_ONS.storage} timeSpan={TIME_SPANS.month} />
      <AddOn addOn={ADD_ONS.storage} timeSpan={TIME_SPANS.year} />
      <AddOn addOn={ADD_ONS.customizable} timeSpan={TIME_SPANS.month} />
      <AddOn addOn={ADD_ONS.customizable} timeSpan={TIME_SPANS.year} />
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
      <StepCard cardInfo={STEPS[0]}>
        <h1>step card content</h1>
      </StepCard>
      <PersonalInfo />*/}
      <SelectPlan />
    </div>
  );
}

export default DesignSystem;
