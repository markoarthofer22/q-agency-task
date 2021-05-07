import {
    SET_IS_LOADING,
    SET_GLOBAL_ERROR,
    SET_ALL_POSTS,
    SET_POST_COMMENT,
    SET_CURRENT_POST,
} from './globalState.types';
import {
    iReturnType,
    iPostType,
    iPostCommentType,
} from './interface/globals.interface';

export const setIsLoading = (isLoading: boolean): iReturnType => {
    return {
        type: SET_IS_LOADING,
        payload: isLoading,
    };
};

export const setGlobalError = (error: string | boolean): iReturnType => {
    return {
        type: SET_GLOBAL_ERROR,
        payload: error,
    };
};

export const setAllPosts = (_posts: iPostType[]): iReturnType => {
    return {
        type: SET_ALL_POSTS,
        payload: _posts,
    };
};

export const setPostComments = (
    _singlePostComment: iPostCommentType
): iReturnType => {
    return {
        type: SET_POST_COMMENT,
        payload: _singlePostComment,
    };
};

export const setCurrentPost = (_singlePost: iPostType): iReturnType => {
    return {
        type: SET_CURRENT_POST,
        payload: _singlePost,
    };
};

export const revisedRandId = (_prefix: string): string =>
    _prefix +
    '_' +
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(2, 10);
