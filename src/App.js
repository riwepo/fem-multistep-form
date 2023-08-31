import React from "react";

import DesignSystem from "./components/DesignSystem";
import PersonalInfoPage from "./components/pages/PersonalInfoPage";
import SelectPlanPage from "./components/pages/SelectPlanPage";
import StepContextProvider from "./context/step-context";

function App() {
  return (
    <div className="App">
      <StepContextProvider>
        {/* <PersonalInfoPage /> */}
        <SelectPlanPage />
        {/* <DesignSystem /> */}
      </StepContextProvider>
    </div>
  );
}

export default App;
