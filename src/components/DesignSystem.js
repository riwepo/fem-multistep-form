import React, { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";
import Plan from "./Plan";
import SelectPlan from "./SelectPlan";

import "./DesignSystem.css";
import ToggleSwitch from "./ToggleSwitch";
import MonthYearToggleSwitch from "./MonthYearToggleSwitch";
import AddOn from "./AddOn";
import Checkbox from "./Checkbox";
import PersonalInfoField from "./PersonalInfoField";
import PersonalInfo from "./PersonalInfo";
import StepCard from "./StepCard";
import { getPlanByCode } from "../utils/plans";
import { getAddOnByCode } from "../utils/addOns";
import { getTimespanByCode } from "../utils/timespans";
import { STEPS } from "../utils/steps";
import {
  validateName,
  validateEmail,
  validatePhone,
} from "../utils/validators";

function DesignSystem() {
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [isPlanActive, setIsPlanActive] = useState(false);

  return (
    <div className="design-system grid">
      {/* <div>
        <ProgressIndicator steps={STEPS} activeStepCode={STEPS[0].code} />
      </div>
      <div>
        <StepControl canGoBack={false} isValid={true} isLastStep={false} />
        <StepControl canGoBack={true} isValid={true} isLastStep={false} />
        <StepControl canGoBack={true} isValid={true} isLastStep={true} />
        <StepControl canGoBack={true} isValid={false} isLastStep={false} />
      </div>
      <div>
        <Plan
          plan={getPlanByCode("ARCADE")}
          timeSpan={getTimespanByCode("MONTH")}
          isActive={true}
          onActivated={null}
        />
        <Plan
          plan={getPlanByCode("ADVANCED")}
          timeSpan={getTimespanByCode("YEAR")}
          isActive={false}
          onActivated={null}
        />
      </div>
      <div>
        <ToggleSwitch
          isActive={isToggleActive}
          onChange={(active) => {
            setIsToggleActive(active);
          }}
        />
      </div>
      <div>
        <MonthYearToggleSwitch
          activeTimespan={getTimespanByCode("MONTH")}
          onTimespanChange={null}
        />
      </div>
      <div>
        <Checkbox isActive={false} />
        <Checkbox isActive={true} />
      </div>
      <div>
        <AddOn
          addOn={getAddOnByCode("ONLINE")}
          timeSpan={getTimespanByCode("MONTH")}
        />
        <AddOn
          addOn={getAddOnByCode("STORAGE")}
          timeSpan={getTimespanByCode("YEAR")}
        />
      </div>
      <div>
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
      <div>
        <StepCard stepInfo={STEPS[0]}>
          <h1>step card content</h1>
        </StepCard>
      </div> */}
      <div>
        <PersonalInfo />
      </div>
      {/* <div>
        <Plan
          plan={getPlanByCode("ARCADE")}
          timeSpan={getTimespanByCode("MONTH")}
          isActive={isPlanActive}
          onActivated={() => setIsPlanActive(true)}
        />
      </div>
      <div>
        <SelectPlan />
      </div> */}
    </div>
  );
}

export default DesignSystem;
