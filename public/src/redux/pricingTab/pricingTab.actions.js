import { SET_INITIAL_VALUES, RESET_TO_INITIAL_VALUES, SET_PAYMENT_OPTIONS, SET_EXISTING_TRANSACTION_RESPONSE } from "./pricingTab.types";

export const setInitialValues = (values) => {
    return {
        type: SET_INITIAL_VALUES,
        payload: values
    };
};

export const resetToInitialValues = (values) => {
    return {
        type: RESET_TO_INITIAL_VALUES,
        payload: values
    };
};

export const setPaymentOptions = (_paymentOptions) => {
    return {
        type: SET_PAYMENT_OPTIONS,
        payload: _paymentOptions
    };
};

export const setExistingTransactionResponse = (payload) => {
    return {
        type: SET_EXISTING_TRANSACTION_RESPONSE,
        payload: payload
    };
};
