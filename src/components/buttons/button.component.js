import React from "react";
import PropTypes from "prop-types";

//hoc
import clgComponentName from "../hoc/consoleComponentName";

const Button = ({ children, customClass, clicked, title, isLoading, attributes }) => {
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

export default clgComponentName(Button, "Button");
