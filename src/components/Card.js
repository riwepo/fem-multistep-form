import React from "react";

import "./Card.css";

function Card({ className, onClick, children }) {
  return (
    <div className={`${className} card`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
