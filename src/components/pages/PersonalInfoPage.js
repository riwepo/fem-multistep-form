import React from "react";

import PersonalInfo from "../PersonalInfo";

import PageContainer from "./PageContainer";
import { getStepByCode } from "../../utils/steps";

import "./PersonalInfoPage.css";

function PersonalInfoPage() {
  return (
    <PageContainer step={getStepByCode("PERSONAL_INFO")}>
      <PersonalInfo />
    </PageContainer>
  );
}

export default PersonalInfoPage;
