import React from "react";

import SelectPlan from "../SelectPlan";
import PageContainer from "./PageContainer";

import { getStepByCode } from "../../utils/steps";

import "./SelectPlanPage.css";

function SelectPlanPage() {
  return (
    <PageContainer step={getStepByCode("SELECT_PLAN")}>
      <SelectPlan />
    </PageContainer>
  );
}

export default SelectPlanPage;
