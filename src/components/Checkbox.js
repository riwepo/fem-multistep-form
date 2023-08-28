import React from "react";

import iconCheckmark from "../assets/images/icon-checkmark.svg";

import "./Checkbox.css";

function Checkbox({ isActive, onChange }) {
  return (
    <div
      className={`checkbox grid ${isActive ? "checkbox--active" : undefined}`}
      onClick={onChange}
    >
      <img src={iconCheckmark} alt="checkmark" />
    </div>
  );
}

export default Checkbox;
