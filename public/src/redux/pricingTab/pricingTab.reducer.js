import { SET_INITIAL_VALUES, RESET_TO_INITIAL_VALUES, SET_PAYMENT_OPTIONS, SET_EXISTING_TRANSACTION_RESPONSE } from "./pricingTab.types";
import _ from "underscore";

const INITIAL_STATE = {
    currency: "EUR",
    mainProductId: null,
    variationProductId: null,
    variationProductName: null,
    variantDurationID: null,
    productCountryCode: null,
    paymentType: "",
    headerValues: {
        name: "",
        price: "0.00",
        subscriptionDuration: null,
        contractLength: null,
        contractLengthText: null,
        isPromotion: false,
        paymentOptions: {},
        selectedPaymentOptions: {}
    },
    available: {
        availableDevices: null,
        features: null
    },
    paymentValues: {
        subscriptionFullPrice: null,
        subscriptionDiscountPrice: null,
        boxPrice: null,
        boxPriceDiscount: null,
        additionalExpenses: null,
        totalPrice: null,
        totalDiscount: null
    },
    existingTransactionResponse: {}
};

const pricingTabReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INITIAL_VALUES:
            return {
                ...state,
                ...action.payload,
                headerValues: {
                    ...state.headerValues,
                    ...action.payload.headerValues
                },
                available: {
                    ...state.available,
                    ...action.payload.available
                },
                paymentValues: {
                    ...state.paymentValues,
                    ...action.payload.paymentValues
                }
            };
        case RESET_TO_INITIAL_VALUES: {
            return {
                ...INITIAL_STATE,
                ...action.payload,
                headerValues: {
                    ...INITIAL_STATE.headerValues,
                    ...action.payload.headerValues
                },
                available: {
                    ...INITIAL_STATE.available,
                    ...action.payload.available
                },
                paymentValues: {
                    ...INITIAL_STATE.paymentValues,
                    ...action.payload.paymentValues
                }
            };
        }

        case SET_PAYMENT_OPTIONS:
            let arr;

            for (const [property, value] of Object.entries(state.headerValues.paymentOptions)) {
                if (property === action.payload) {
                    arr = value;
                }
            }

            return {
                ...state,
                headerValues: {
                    ...state.headerValues,
                    subscriptionDuration: arr.subscription_duration,
                    selectedPaymentOptions: arr
                },
                available: {
                    ...state.available,
                    ...action.payload.available
                },
                paymentValues: {
                    ...state.paymentValues,
                    ...action.payload.paymentValues
                }
            };

        case SET_EXISTING_TRANSACTION_RESPONSE:
            return {
                ...state,
                existingTransactionResponse: action.payload
            };

        default:
            return state;
    }
};

export default pricingTabReducer;
