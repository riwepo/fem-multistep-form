import React from "react";

import Card from "./Card";

import "./StepCard.css";

function StepCard({ children, stepInfo }) {
  return (
    <Card className="card-step">
      <div className="step-card grid">
        <h1 className="fs-600 text-marine-blue">{stepInfo.title}</h1>
        <p>{stepInfo.description}</p>
        {children}
      </div>
    </Card>
  );
}

export default StepCard;
