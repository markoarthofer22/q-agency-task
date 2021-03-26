import { SET_IS_LOADING, SET_GLOBAL_ERROR, SET_ALL_POSTS } from "./globals.types";

const revisedRandId = (_prefix) =>
    _prefix +
    "_" +
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10);

const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    allPosts: []
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

        case SET_ALL_POSTS:
            return {
                ...state,
                allPosts: [...state.allPosts, ...action.payload]
            };

        default:
            return state;
    }
};

export default globalsReducer;
