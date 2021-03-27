import { SET_IS_LOADING, SET_GLOBAL_ERROR, SET_ALL_POSTS } from "./globalState.types";

import { useReducer } from "react";

const reducer = (state, action) => {
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

        case SET_ALL_POSTS:
            return {
                ...state,
                allPosts: [...action.payload]
            };

        default:
            return state;
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        isLoading: true,
        isError: false,
        allPosts: []
    });

    return { globalState, globalDispatch };
};

export default useGlobalState;
