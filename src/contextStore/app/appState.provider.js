import React from "react";
import useAppState from "./appState.reducer";
import { ContextApp } from "../context";

const AppStateProvider = ({ children }) => {
    return <ContextApp.Provider value={useAppState()}>{children}</ContextApp.Provider>;
};

export default AppStateProvider;
