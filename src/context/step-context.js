import React, { useState } from "react";

import { getItemByCode, replaceItemByCode } from "../utils/utils";

import { ADD_ONS } from "../utils/addOns";
import { FIELDS } from "../utils/personal_info";

const personalInfoCodes = FIELDS.map((field) => field.code);
const addOnCodes = ADD_ONS.map((addOn) => addOn.code);

const defaultStepStates = {
  PERSONAL_INFO: {
    state: personalInfoCodes.map((code) => ({
      code: code,
      value: "",
      isValid: false,
    })),
    isValid: false,
    isInitialised: false,
  },
  SELECT_PLAN: { state: "", isValid: false, isInitialised: false },
  PICK_ADD_ONS: {
    state: addOnCodes.map((code) => ({ code: code, isSelected: false })),
    isValid: true,
    isInitialised: false,
  },
};

export const StepContext = React.createContext({
  stepStates: defaultStepStates,

  setPersonalInfoField: (fieldCode, fieldValue, isValid) => {},

  getPersonalInfoField: (fieldCode) => {},

  setSelectedPlanCode(planCode) {},

  getSelectedPlanCode() {},

  selectAddOn(addOnCode, isSelected) {},

  getAddOn(addOnCode) {},

  isStepInitialised: (stepCode) => {},

  isStepValid: (stepCode) => {},
});

export default function StepContextProvider({ children }) {
  const [stepStates, setStepStates] = useState(defaultStepStates);

  const _setPersonalInfoField = (fieldCode, fieldValue, isValid) => {
    setStepStates((currentStepStates) => {
      const newFieldState = {
        code: fieldCode,
        value: fieldValue,
        isValid: isValid,
      };
      const newState = replaceItemByCode(
        currentStepStates.PERSONAL_INFO.state,
        newFieldState
      );
      const newStepStates = {
        ...currentStepStates,
        PERSONAL_INFO: {
          state: newState,
          isValid: newState.every((field) => field.isValid),
          isInitialised: true,
        },
      };
      return newStepStates;
    });
  };

  const _getPersonalInfoField = (fieldCode) => {
    const fieldState = getItemByCode(stepStates.PERSONAL_INFO.state, fieldCode);
    return fieldState;
  };

  const _setSelectedPlanCode = (planCode) => {
    setStepStates((currentStepStates) => {
      const newStepStates = {
        ...currentStepStates,
        SELECT_PLAN: {
          state: planCode,
          isValid: planCode !== "",
          isInitialised: true,
        },
      };
      return newStepStates;
    });
  };

  const _getSelectedPlanCode = () => {
    return stepStates.SELECT_PLAN.state;
  };

  const _selectAddOn = (addOnCode, isSelected) => {
    setStepStates((currentStepStates) => {
      const newAddOn = {
        code: addOnCode,
        isSelected: isSelected,
      };
      const newAddOns = replaceItemByCode(
        currentStepStates.PICK_ADD_ONS.state,
        newAddOn
      );
      const newStepStates = {
        ...currentStepStates,
        PICK_ADD_ONS: {
          state: newAddOns,
          isValid: true,
          isInitialised: true,
        },
      };
      return newStepStates;
    });
  };

  const _getAddOn = (code) => {
    return getItemByCode(stepStates.PICK_ADD_ONS.state, code);
  };

  const _isStepInitialised = (stepCode) => {
    return stepStates[stepCode].isInitialised;
  };

  const _isStepValid = (stepCode) => {
    return stepStates[stepCode].isValid;
  };
  return (
    <StepContext.Provider
      value={{
        stepStates: defaultStepStates,
        setPersonalInfoField: _setPersonalInfoField,
        getPersonalInfoField: _getPersonalInfoField,
        setSelectedPlanCode: _setSelectedPlanCode,
        getSelectedPlanCode: _getSelectedPlanCode,
        selectAddOn: _selectAddOn,
        getAddOn: _getAddOn,
        isStepInitialised: _isStepInitialised,
        isStepValid: _isStepValid,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}
