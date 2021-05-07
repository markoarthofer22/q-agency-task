import React from 'react';
import useGlobalState from './globalState.reducer';
import { Context } from '../context';

const GlobalStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    return (
        <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
    );
};

export default GlobalStateProvider;
