import React, { useEffect } from "react";
import SvgIcon from "../svg-icon/svg-icon.component";
import "./popup.scss";

const Popup = (props) => {
    const { closePopup, children } = props;

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

    function handleClose(e) {
        e.stopPropagation();
        // if (e.target.id === "popup" && closePopup) closePopup();
        // else return;
    }

    useEffect(() => {
        document.querySelector("body").classList.add("no-scroll");

        return () => {
            document.querySelector("body").classList.remove("no-scroll");
        };
    });

    return (
        <div id="popup" className={`popup ${props.class ? props.class : ""}`} onClick={handleClose}>
            <div className="window">
                {closePopup && (
                    <button className="close-button close" aria-label="close" onClick={(e) => closePopup()}>
                        <SvgIcon icon="icon-ios-close-empty" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Popup;
