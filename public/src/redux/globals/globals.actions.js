import { SET_HEADER_TYPE, SET_IS_LOADING, SET_GLOBAL_ERROR, SET_PAGE_DATA, SET_USER_ORIGIN, SET_USER_IP, SET_USER_TZ, SET_USER_HASH } from "./globals.types";

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

export const setDataForURL = (data) => {
    return {
        type: SET_PAGE_DATA,
        payload: data
    };
};

export const setUserIP = (_ip) => {
    return {
        type: SET_USER_IP,
        payload: _ip
    };
};

export const setUserHashInformation = (_hash) => {
    return {
        type: SET_USER_HASH,
        payload: _hash
    };
};

export const setUserTZ = (_tz) => {
    return {
        type: SET_USER_TZ,
        payload: _tz
    };
};

export const setUserOriginCountry = (_countryCode) => {
    return {
        type: SET_USER_ORIGIN,
        payload: _countryCode
    };
};

export const setHeaderType = (_type) => {
    return {
        type: SET_HEADER_TYPE,
        payload: _type
    };
};

export const getDataForURL = (url) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));

        return new Promise((resolve, reject) => {
            mainApi
                .get(url)
                .then((responseData) => {
                    dispatch(setIsLoading(false));
                    resolve(responseData);
                })
                .catch((error) => {
                    dispatch(setIsLoading(false));
                    reject(error);
                });
        });
    };
};
