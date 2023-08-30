import React from "react";

import Card from "./Card";

import "./StepCard.css";

function StepCard({ className, children, stepInfo }) {
  return (
    <Card className={`card-step ${className}`}>
      <div className="step-card grid">
        <h1 className="fs-700 fw-bold text-marine-blue">{stepInfo.title}</h1>
        <p>{stepInfo.description}</p>
        {children}
      </div>
    </Card>
  );
}

export default StepCard;
