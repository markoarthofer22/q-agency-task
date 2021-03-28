import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// styles
import "./styles.scss";

// components
import SvgIcon from "../svg-icon/svg-icon.component";

// context
import { ContextApp } from "../../contextStore/context";

const Popup = (props) => {
    const { closePopup, children } = props;

    // state
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("Popup");

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    useEffect(() => {
        const closeOnEsc = (e) => {
            e.stopPropagation();
            if (e.keyCode === 27) {
                closePopup();
            }
        };

        document.addEventListener("keydown", closeOnEsc);
        return () => {
            document.removeEventListener("keydown", closeOnEsc);
        };
    }, [closePopup]);

    useEffect(() => {
        document.querySelector("body").classList.add("no-scroll");

        return () => {
            document.querySelector("body").classList.remove("no-scroll");
        };
    });

    return (
        <div id="popup" className={`popup ${props.class ? props.class : ""}`}>
            <div className="window">
                {closePopup && (
                    <button className="close-button close" aria-label="close" onClick={(e) => closePopup()}>
                        <SvgIcon icon="close" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

Popup.propTypes = {
    closePopup: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default Popup;
