import React from "react";

import "./ToggleSwitch.css";

function ToggleSwitch({ isActive, onChange }) {
  const clickHandler = () => {
    onChange && onChange(!isActive);
  };
  return (
    <button className="toggle-switch" onClick={clickHandler}>
      <div
        className={`indicator ${isActive ? "indicator--active" : undefined}`}
      ></div>
    </button>
  );
}

export default ToggleSwitch;
