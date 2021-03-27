import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Context
import { ContextApp } from "../../contextStore/context";

const SvgIcon = ({ icon, iconclass, pureSvg }) => {
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("SvgIcon");

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    if (pureSvg) {
        return <svg className={`icon ${iconclass ? iconclass : ""}`} dangerouslySetInnerHTML={{ __html: pureSvg }} />;
    } else {
        return (
            <svg className={`icon ${iconclass ? iconclass : icon}`}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#${icon}`} />
            </svg>
        );
    }
};

SvgIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    iconclass: PropTypes.string,
    pureSvg: PropTypes.bool
};

export default SvgIcon;
