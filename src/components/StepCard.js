import React from "react";

import Card from "./Card";

import "./StepCard.css";

function StepCard({ children, cardInfo }) {
  return (
    <Card className="card-step">
      <div className="step-card grid">
        <h1 className="fs-600 text-marine-blue">{cardInfo.title}</h1>
        <p>{cardInfo.description}</p>
        {children}
      </div>
    </Card>
  );
}

export default StepCard;
