import React from "react";
import PropTypes from "prop-types";
// components
import SvgIcon from "../svg-icon/svg-icon.component";

// styles
import "./tooltip.scss";

const Tooltip = (props) => {
    const { styles, title, icon } = props;

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
