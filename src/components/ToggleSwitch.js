import React, { useState } from "react";

import "./ToggleSwitch.css";

function ToggleSwitch({ onChange }) {
  const [isActive, setIsActive] = useState(false);
  const clickHandler = () => {
    setIsActive((current) => !current);
    onChange && onChange(isActive);
  };
  return (
    <div className="toggle-switch" onClick={clickHandler}>
      <div
        className={`indicator ${isActive ? "indicator--active" : undefined}`}
      ></div>
    </div>
  );
}

export default ToggleSwitch;
