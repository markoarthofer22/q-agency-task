import { SET_IS_LOADING, SET_GLOBAL_ERROR, SET_ALL_POSTS } from "./globals.types";
import mainApi from "../apis/main-api";

export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        payload: isLoading
    };
};

export const setGlobalError = (error) => {
    return {
        type: SET_GLOBAL_ERROR,
        payload: error
    };
};

export const setAllPosts = (_posts) => {
    return {
        type: SET_ALL_POSTS,
        payload: _posts
    };
};
