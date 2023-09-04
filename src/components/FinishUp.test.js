import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import StepContextProvider, { StepContext } from "../context/step-context";

import { ADD_ONS } from "../utils/addOns";
import PickAddOns from "./PickAddOns";
import { getTimespanByCode } from "../utils/timespans";
import { getPriceDisplay } from "../utils/utils";

const STEP_CODE = "FINISH_UP";
const monthlyTimespan = getTimespanByCode("MONTH");
const yearlyTimespan = getTimespanByCode("YEAR");
