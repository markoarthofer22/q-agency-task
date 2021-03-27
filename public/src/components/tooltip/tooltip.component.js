import React from "react";
import SvgIcon from "../svg-icon/svg-icon.component";

import "./tooltip.scss";

const Tooltip = (props) => {
    const { styles, title, icon } = props;

    return (
        <span className={`${styles ? styles : ""} tooltip`} tooltiptitle={title ? title : "Not defined"}>
            <span className="net-tooltip"></span>
        </span>
    );
};

export default Tooltip;
