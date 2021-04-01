import React from "react";
import PropTypes from "prop-types";

// hoc
import clgComponentName from "../hoc/consoleComponentName";

const SvgIcon = ({ icon, iconclass, pureSvg }) => {
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

export default clgComponentName(SvgIcon, "SvgIcon");
