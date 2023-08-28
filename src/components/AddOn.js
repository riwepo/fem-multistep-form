import React, { useState } from "react";

import Card from "./Card";
import Checkbox from "./Checkbox";

import { getPrice } from "../utils";

import "./AddOn.css";

function AddOn({ addOn, timeSpan }) {
  const [isActive, setIsActive] = useState(false);
  const clickHandler = () => {
    setIsActive((current) => !current);
  };
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

export default AddOn;
