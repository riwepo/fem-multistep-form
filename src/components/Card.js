import React, { useEffect, useRef } from "react";

import "./Card.css";

function Card({ className, onClick, autoFocus, children }) {
  const divRef = useRef(null);
  useEffect(() => {
    if (autoFocus && divRef.current) {
      divRef.current.focus();
    }
  }, []);
  return (
    <div
      className={`${className} card`}
      ref={divRef}
      onClick={onClick}
      tabIndex={0} // this is needed to get focus
    >
      {children}
    </div>
  );
}

export default Card;
