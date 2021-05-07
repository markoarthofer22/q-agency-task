import React from 'react';
import useAppState from './appState.reducer';
import { ContextApp } from '../context';

const AppStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    return (
        <ContextApp.Provider value={useAppState()}>
            {children}
        </ContextApp.Provider>
    );
};

export default AppStateProvider;
