import {
    SET_IS_LOADING,
    SET_GLOBAL_ERROR,
    SET_ALL_POSTS,
    SET_POST_COMMENT,
    SET_CURRENT_POST,
} from './globalState.types';

import { useReducer } from 'react';

import {
    iInitialState,
    iDispatchActionType,
    iGlobalReducer,
} from './interface/globals.interface';

export const initialState: iInitialState = {
    isLoading: true,
    isError: false,
    allPosts: [],
    currentPost: null,
};

const reducer = (
    state: iInitialState,
    action: iDispatchActionType
): iInitialState => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_GLOBAL_ERROR:
            return {
                ...state,
                isError: action.payload.response,
            };

        case SET_ALL_POSTS:
            return {
                ...state,
                allPosts: [...action.payload],
            };

        case SET_POST_COMMENT:
            return {
                ...state,
                allPosts: [...state.allPosts, ...action.payload],
            };

        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload,
            };

        default:
            return state;
    }
};

const useGlobalState = (): iGlobalReducer => {
    const [globalState, globalDispatch] = useReducer(reducer, initialState);

    return { globalState, globalDispatch };
};

export default useGlobalState;
