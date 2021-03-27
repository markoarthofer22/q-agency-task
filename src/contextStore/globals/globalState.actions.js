import { SET_IS_LOADING, SET_GLOBAL_ERROR, SET_ALL_POSTS, SET_POST_COMMENT, SET_CURRENT_POST } from "./globalState.types";

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

export const setPostComments = (_singlePost) => {
    return {
        type: SET_POST_COMMENT,
        payload: _singlePost
    };
};

export const setCurrentPost = (_singlePost) => {
    return {
        type: SET_CURRENT_POST,
        payload: _singlePost
    };
};

export const revisedRandId = (_prefix) =>
    _prefix +
    "_" +
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10);
