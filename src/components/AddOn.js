import React from "react";

import Card from "./Card";

import { getPrice } from "../utils";

import "./AddOn.css";

function AddOn({ addOn, timeSpan }) {
  return (
    <Card>
      <div className="add-on flex">
        <div>checkbox</div>
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
