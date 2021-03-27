import { SET_NAVIGATION_STEP } from "./steps.types";

const INITIAL_STATE = {
  currentStep: null,
};

const navigationStepReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NAVIGATION_STEP:
      let step;

      if (typeof action.payload === "number") {
        step = parseInt(action.payload);
      } else {
        step =
          action.payload === "add"
            ? state.currentStep + 1
            : action.payload === "subtract"
            ? state.currentStep - 1
            : 1;
      }

      return {
        ...state,
        currentStep: step,
      };

    default:
      return state;
  }
};

export default navigationStepReducer;
