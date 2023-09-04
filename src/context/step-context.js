import React, { useState } from "react";

import { getItemByCode, replaceItemByCode } from "../utils/utils";

import { STEPS } from "../utils/steps";

const defaultStepStates = STEPS.map((step) => ({
  code: step.code,
  fieldStates: step.fieldCodes.map((code) => ({
    code: code,
    value: "",
    isValid: false,
    isInitialised: false,
  })),
}));

export const StepContext = React.createContext({
  stepStates: defaultStepStates,

  setStepFieldState: (stepCode, fieldCode, fieldValue, isValid) => {},

  getStepFieldState: (stepCode, fieldCode) => {},

  isStepValid: (stepCode) => {},
});

export default function StepContextProvider({ children }) {
  const [stepStates, setStepStates] = useState(defaultStepStates);

  const _getStepFieldState = (stepCode, fieldCode) => {
    const step = getItemByCode(stepStates, stepCode);
    const field = getItemByCode(step.fieldStates, fieldCode);
    return field;
  };

  const _setStepFieldState = (stepCode, fieldCode, fieldValue, isValid) => {
    setStepStates((currentStepStates) => {
      const step = getItemByCode(currentStepStates, stepCode);
      const newFieldState = {
        code: fieldCode,
        value: fieldValue,
        isValid: isValid,
        isInitialised: true,
      };
      const newFieldStates = replaceItemByCode(step.fieldStates, newFieldState);
      const newStepState = { code: stepCode, fieldStates: newFieldStates };
      const newStepStates = replaceItemByCode(currentStepStates, newStepState);
      return newStepStates;
    });
  };

  const _isStepValid = (stepCode) => {
    const step = getItemByCode(stepStates, stepCode);
    const result = step.fieldStates.every((fieldState) => fieldState.isValid);
    return result;
  };

  return (
    <StepContext.Provider
      value={{
        stepStates: defaultStepStates,
        getStepFieldState: _getStepFieldState,
        setStepFieldState: _setStepFieldState,
        isStepValid: _isStepValid,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}
