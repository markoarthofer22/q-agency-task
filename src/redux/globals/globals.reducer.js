import { SET_IS_LOADING, SET_GLOBAL_ERROR } from "./globals.types";

const INITIAL_STATE = {
    isLoading: false,
    isError: false
};

const globalsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case SET_GLOBAL_ERROR:
            return {
                ...state,
                isError: action.payload.response
            };

        default:
            return state;
    }
};

export default globalsReducer;
