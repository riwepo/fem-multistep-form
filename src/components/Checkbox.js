import React from "react";

import iconCheckmark from "../assets/images/icon-checkmark.svg";

import "./Checkbox.css";

function Checkbox({ isActive }) {
  return (
    <div
      className={`checkbox grid ${isActive ? "checkbox--active" : undefined}`}
      aria-selected={isActive}
    >
      <img src={iconCheckmark} alt="checkmark" />
    </div>
  );
}

export default Checkbox;
