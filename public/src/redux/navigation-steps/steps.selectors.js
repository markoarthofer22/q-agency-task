import { createSelector } from "reselect";

const selectNavigationStep = state => state.navigationSteps;

export const selectCurrentStep = createSelector(
  [selectNavigationStep],
  stepsStore => stepsStore.currentStep
);
