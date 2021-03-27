import { createSelector } from "reselect";

const selectGlobals = (state) => state.globals;

export const selectIsLoading = createSelector([selectGlobals], (globals) => globals.isLoading);

export const globalError = createSelector([selectGlobals], (globals) => globals.globalError);

export const selectAllCountryIDs = createSelector([selectGlobals], (globals) => globals.lang_codes);

export const globalUserIP = createSelector([selectGlobals], (globals) => globals.userIP);

export const globalUserHash = createSelector([selectGlobals], (globals) => globals.userHash);

export const globalUserTZ = createSelector([selectGlobals], (globals) => globals.userTimeZone);

export const globalUserCountry = createSelector([selectGlobals], (globals) => globals.userCountryOrigin);

export const headerType = createSelector([selectGlobals], (globals) => globals.headerType);
