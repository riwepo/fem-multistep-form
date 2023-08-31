import React from "react";

import DesignSystem from "./components/DesignSystem";
import PageContainer from "./components/PageContainer";

import StepContextProvider from "./context/step-context";

function App() {
  return (
    <div className="App">
      <StepContextProvider>
        {/* <DesignSystem /> */}
        <PageContainer />
      </StepContextProvider>
    </div>
  );
}

export default App;
