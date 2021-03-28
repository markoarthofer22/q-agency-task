import React, { useState, useEffect, useContext } from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";

// styles
import "./styles.scss";

// context
import { ContextApp } from "../../contextStore/context";

const CustomSwiper = (props) => {
    const { params, children, wrapClass, containerClass, wrapper, additionalClass, noBootstrap } = props;

    // state
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("CustomSwiper");

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    let options = {
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
            speed: 600
        },
        ...params
    };

    return (
        <div className={`${wrapper ? wrapper : "holder"} ${additionalClass ? additionalClass : ""} ${noBootstrap ? "" : "row"}`}>
            <Swiper
                wrapperClass={`swiper-wrapper ${wrapClass ? wrapClass : ""}`}
                containerClass={`swiper-container ${containerClass ? containerClass : ""}`}
                {...options}
            >
                {children}
            </Swiper>
        </div>
    );
};

CustomSwiper.propTypes = {
    params: PropTypes.object,
    children: PropTypes.node.isRequired,
    wrapClass: PropTypes.string,
    containerClass: PropTypes.string,
    wrapper: PropTypes.string,
    additionalClass: PropTypes.string,
    noBootstrap: PropTypes.string
};

export default CustomSwiper;
