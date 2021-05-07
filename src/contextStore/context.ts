import { createContext } from 'react';
import { iAppReducer } from './app/appState.reducer';
import { iGlobalReducer } from './globals/interface/globals.interface';

export const Context = createContext<Partial<iGlobalReducer>>({});

export const ContextApp = createContext<Partial<iAppReducer>>({});
