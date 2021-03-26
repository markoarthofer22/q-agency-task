import { createSelector } from "reselect";

const selectGlobals = (state) => state.globals;

export const selectIsLoading = createSelector([selectGlobals], (globals) => globals.isLoading);

export const globalError = createSelector([selectGlobals], (globals) => globals.globalError);

export const getAllPosts = createSelector([selectGlobals], (globals) => globals.allPosts);
