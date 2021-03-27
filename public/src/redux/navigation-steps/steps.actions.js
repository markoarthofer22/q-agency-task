import { SET_NAVIGATION_STEP } from "./steps.types";

export const setCurrentNavigationStep = _type => {
  return {
    type: SET_NAVIGATION_STEP,
    payload: _type
  };
};
