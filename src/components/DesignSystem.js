import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import StepControl from "./StepControl";

import "./DesignSystem.css";

const progressData = [
  { step: 1, isActive: true },
  { step: 2, isActive: false },
  { step: 3, isActive: false },
  { step: 4, isActive: false },
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
