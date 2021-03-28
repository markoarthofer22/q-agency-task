import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// components
import SvgIcon from "../svg-icon/svg-icon.component";

// styles
import "./styles.scss";

// context
import { ContextApp } from "../../contextStore/context";

const Tooltip = (props) => {
    const { styles, title, icon } = props;

    // state
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("Tooltip");

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <span className={`${styles ? styles : ""} tooltip`} tooltiptitle={title ? title : "Not defined"}>
            {icon ? <SvgIcon icon={icon} /> : "?"}
        </span>
    );
};

Tooltip.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    styles: PropTypes.string
};

export default Tooltip;
