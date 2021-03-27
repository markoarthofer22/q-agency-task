import React from "react";

const SvgIcon = ({ icon, iconclass, pureSvg }) => {
    if (pureSvg) {
        return <svg className={`icon ${iconclass ? iconclass : ""}`} dangerouslySetInnerHTML={{ __html: pureSvg }} />;
    } else {
        return (
            <svg className={`icon ${iconclass ? iconclass : icon}`}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/assets/icons-v7.svg#${icon}`} />
            </svg>
        );
    }
};

export default SvgIcon;
