import { combineReducers } from "redux";
import globalsReducer from "./globals/globals.reducer";
import navigationStepReducer from "./navigation-steps/steps.reducer";
import pricingTabReducer from "./pricingTab/pricingTab.reducer";

export default combineReducers({
    globals: globalsReducer,
    navigationSteps: navigationStepReducer,
    pricingTab: pricingTabReducer,
});
