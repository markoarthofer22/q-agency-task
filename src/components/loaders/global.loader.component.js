import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// components
import { CSSTransition } from "react-transition-group";

// styles
import "./styles.scss";

// context
// import { AppContext } from "../../context/AppContext";
import { Context, ContextApp } from "../../contextStore/context";

const GlobalLoader = () => {
    const { appState } = useContext(ContextApp);
    const { globalState } = useContext(Context);

    const [componentName] = useState("GlobalLoader");

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <CSSTransition in={globalState.isLoading} timeout={300} classNames="loader" unmountOnExit>
            <div className="main-loader-container">
                <div className="loader"></div>
            </div>
        </CSSTransition>
    );
};

export default GlobalLoader;
