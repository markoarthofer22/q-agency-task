import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// context
import { ContextApp } from "../../contextStore/context";

const Button = ({ children, customClass, clicked, title, isLoading, attributes }) => {
    const [componentName] = useState("Button");
    const { appState } = useContext(ContextApp);

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <button
            title={title}
            className={`button ${customClass} ${isLoading ? "disabled" : ""}`}
            onClick={clicked && ((e) => clicked(e))}
            disabled={isLoading}
            {...attributes}
        >
            {children} {title}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.element,
    customClass: PropTypes.string,
    clicked: PropTypes.func,
    title: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    attributes: PropTypes.object
};

export default Button;
