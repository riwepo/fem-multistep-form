import React from "react";

import ProgressIndicatorItem from "./ProgressIndicatorItem";

import "./ProgressIndicator.css";

function ProgressIndicator({ data }) {
  return (
    <ul className="progress-indicator flex">
      {data.map((item) => {
        return (
          <ProgressIndicatorItem step={item.step} isActive={item.isActive} />
        );
      })}
    </ul>
  );
}

export default ProgressIndicator;
