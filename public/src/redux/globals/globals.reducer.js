import { SET_HEADER_TYPE, SET_IS_LOADING, SET_GLOBAL_ERROR, SET_USER_IP, SET_USER_HASH, SET_USER_ORIGIN, SET_USER_TZ } from "./globals.types";

const lang_codes = [
    {
        countryCode: "de",
        countryName: "Nemačka"
    },
    {
        countryCode: "au",
        countryName: "Australija"
    },
    {
        countryCode: "nz",
        countryName: "Novi Zeland"
    },
    {
        countryCode: "at",
        countryName: "Austrija"
    },
    {
        countryCode: "no",
        countryName: "Norveška"
    },
    {
        countryCode: "lu",
        countryName: "Luksemburg"
    },
    {
        countryCode: "se",
        countryName: "Švedska"
    },
    {
        countryCode: "gb",
        countryName: "Velika Britanija"
    },
    {
        countryCode: "us",
        countryName: "SAD"
    },
    {
        countryCode: "ch",
        countryName: "Švajcarska"
    },
    {
        countryCode: "ca",
        countryName: "Kanada"
    },
    {
        countryCode: "be",
        countryName: "Belgija"
    },
    {
        countryCode: "dk",
        countryName: "Danska"
    },
    {
        countryCode: "fi",
        countryName: "Finska"
    },
    {
        countryCode: "fr",
        countryName: "Francuska"
    },
    {
        countryCode: "ie",
        countryName: "Irska"
    },
    {
        countryCode: "nl",
        countryName: "Holandija"
    }
];

const INITIAL_STATE = {
    isLoading: false,
    lang_codes: lang_codes,
    userIP: "",
    globalError: false,
    userHash: {},
    userTimeZone: "",
    userCountryOrigin: "",
    headerType: "normal"
};

const globalsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.payload.response
            };

        case SET_USER_IP: {
            return {
                ...state,
                userIP: action.payload
            };
        }

        case SET_USER_HASH: {
            return {
                ...state,
                userHash: action.payload
            };
        }

        case SET_HEADER_TYPE: {
            return {
                ...state,
                headerType: action.payload
            };
        }

        case SET_USER_TZ: {
            return {
                ...state,
                userTimeZone: action.payload
            };
        }

        case SET_USER_ORIGIN: {
            return {
                ...state,
                userCountryOrigin: action.payload
            };
        }

        default:
            return state;
    }
};

export default globalsReducer;
