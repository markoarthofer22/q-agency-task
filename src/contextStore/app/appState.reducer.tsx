import { iDispatchActionType } from 'contextStore/globals/interface/globals.interface';
import { useReducer } from 'react';

export interface iInitialState {
    propsMessage: string;
}

export interface iAppReducer {
    appState: iInitialState;
    appDispatch: React.Dispatch<iDispatchActionType>;
}

const initialState: iInitialState = {
    propsMessage: 'Hello from',
};

const reducer = (
    state: iInitialState,
    action: iDispatchActionType
): iInitialState => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

const useAppState = (): iAppReducer => {
    const [appState, appDispatch] = useReducer(reducer, initialState);

    return { appState, appDispatch };
};

export default useAppState;
