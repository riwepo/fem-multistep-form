import React from "react";

import Card from "./Card";
import iconThankYou from "../assets/images/icon-thank-you.svg";

import "./ThankYou.css";

function ThankYou() {
  return (
    <Card className="thank-you flex" onClick={null}>
      <img src={iconThankYou} alt="thank you icon" />
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription. We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </Card>
  );
}

export default ThankYou;
