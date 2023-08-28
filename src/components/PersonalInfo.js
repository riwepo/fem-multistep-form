import React, { useState } from "react";

import "./PersonalInfo.css";

function PersonalInfo() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState("");
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState("");
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");

  return (
    <Card
      className={`card-add-on ${isActive ? "card-add-on--active" : undefined}`}
    >
      <div className="add-on flex" onClick={clickHandler}>
        <Checkbox isActive={isActive} />
        <div>
          <p className="text-marine-blue">{addOn.name}</p>
          <p>{addOn.description}</p>
        </div>
        <p className="text-purplish-blue">{`$${getPrice(addOn, timeSpan)}/${
          timeSpan.display
        }`}</p>
      </div>
    </Card>
  );
}

export default PersonalInfo;
