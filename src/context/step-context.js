import React, { useState } from "react";

import { STEPS } from "../utils/steps";

export const StepContext = React.createContext({
  // array with object for each step in the wizard
  // each object has structure
  // {code: step_code, isValid: boolean}
  stepState: [{}],

  // function to toggle valid flag
  setIsValid: (stepCode, isValid) => {},

  // checks if valid
  getIsValid: (stepCode) => {},
});

export default function StepContextProvider({ children }) {
  const defaultState = STEPS.map((step) => ({
    code: step.code,
    isValid: false,
  }));
  const [stepState, setStepState] = useState(defaultState);

  const getIsValid = (stepCode) => {
    const stepStatesOfInterest = stepState.filter(
      (step) => step.code === stepCode
    );
    return stepStatesOfInterest.length === 1 && stepStatesOfInterest[0].isValid;
  };

  const setIsValid = (stepCode, isValid) => {
    const otherStepStates = stepState.filter((step) => step.code !== stepCode);
    const newState = [...otherStepStates, { code: stepCode, isValid: isValid }];
    setStepState(newState);
  };

  return (
    <StepContext.Provider
      value={{
        stepState: stepState,
        getIsValid: getIsValid,
        setIsValid: setIsValid,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}
