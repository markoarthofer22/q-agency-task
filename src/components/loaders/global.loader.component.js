import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./loader.scss";
import { selectIsLoading } from "../../redux/globals/globals.selectors";

const GlobalLoader = () => {
    const isLoading = useSelector(selectIsLoading);

    return (
        <CSSTransition in={isLoading} timeout={400} classNames="loader" unmountOnExit>
            <div className="main-loader-container">
                <div className="loader"></div>
            </div>
        </CSSTransition>
    );
};

export default GlobalLoader;
