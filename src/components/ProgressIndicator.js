import React from "react";

import ProgressStepIndicator from "./ProgressStepIndicator";

import "./ProgressIndicator.css";

function ProgressIndicator({ data }) {
  return (
    <ul className="progress-indicator flex">
      {data.map((item) => {
        return (
          <ProgressStepIndicator
            key={item.step}
            number={item.step}
            title={item.title}
            isActive={item.isActive}
          />
        );
      })}
    </ul>
  );
}

export default ProgressIndicator;
