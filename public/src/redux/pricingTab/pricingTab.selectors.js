import { createSelector } from "reselect";

const pricingStore = (state) => state.pricingTab;

export const currentPricing = createSelector([pricingStore], (pricing) => pricing);

export const selectedPaymentOptions = createSelector([pricingStore], (pricing) => pricing.headerValues.selectedPaymentOptions);

export const existingTransactionResponse = createSelector([pricingStore], (pricing) => pricing.existingTransactionResponse);
