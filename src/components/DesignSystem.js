import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";

import "./DesignSystem.css";

const progressData = [
  { step: 1, title: "Your info", isActive: true },
  { step: 2, title: "Select plan", isActive: false },
  { step: 3, title: "Add-ons", isActive: false },
  { step: 4, title: "Summary", isActive: false },
];

function DesignSystem() {
  return (
    <div className="design-system grid">
      <ProgressIndicator data={progressData} />
      <StepControl canGoBack={false} isValid={true} isLastPage={false} />
      <StepControl canGoBack={true} isValid={true} isLastPage={false} />
      <StepControl canGoBack={true} isValid={true} isLastPage={true} />
      <StepControl canGoBack={true} isValid={false} isLastPage={false} />
    </div>
  );
}

export default DesignSystem;
