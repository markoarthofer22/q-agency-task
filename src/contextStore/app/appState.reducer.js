import { useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

const useAppState = () => {
    const [appState, appDispatch] = useReducer(reducer, {
        propsMessage: "Hello from"
    });

    return { appState, appDispatch };
};

export default useAppState;
