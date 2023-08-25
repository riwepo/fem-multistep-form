import React from "react";
import ProgressIndicator from "./ProgressIndicator";

const progressData = [
  { step: 1, isActive: true },
  { step: 2, isActive: false },
  { step: 3, isActive: false },
  { step: 4, isActive: false },
];

function DesignSystem() {
  return (
    <div>
      <ProgressIndicator data={progressData} />
    </div>
  );
}

export default DesignSystem;
