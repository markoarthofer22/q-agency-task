import React from "react";
import {homeUrl} from "../../redux/globals/globals.endpoints";
// styles
import "./header.scss";

// redux
import { useSelector } from "react-redux";
import { selectCurrentStep } from "../../redux/navigation-steps/steps.selectors";
import Logo from "../../../public/assets/nettv-logo.svg";

const Header = (props) => {
    const { type } = props;
    const currentStep = useSelector(selectCurrentStep);

    return (
        <>
            <header className="header">
                <a href={homeUrl}>
                    <img src={Logo} alt="Logo" className="logo" />
                </a>
            </header>
            {type !== "disabled" && (
                <div className="navigation-bar">
                    {type === "gratis" && (
                        <ul className="navigation-bar--list">
                            <li className={`navigation-bar--list-item ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}>
                                <span className="name">Tvoj paket</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}>
                                <span className="name">Podaci</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 3 ? "active" : currentStep > 3 ? "completed" : ""}`}>
                                <span className="name">Obrada porudžbine</span>
                            </li>
                        </ul>
                    )}

                    {type === "bundle" && (
                        <ul className="navigation-bar--list">
                            <li className={`navigation-bar--list-item ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}>
                                <span className="name">Podaci</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}>
                                <span className="name">Plaćanje</span>
                            </li>
                        </ul>
                    )}

                    {type === "normal" && (
                        <ul className="navigation-bar--list">
                            <li className={`navigation-bar--list-item ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}>
                                <span className="name">Paketi</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}>
                                <span className="name">Uređaji</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 3 ? "active" : currentStep > 3 ? "completed" : ""}`}>
                                <span className="name">Pretplata</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 4 ? "active" : currentStep > 4 ? "completed" : ""}`}>
                                <span className="name">Podaci</span>
                            </li>
                            <li className={`navigation-bar--list-item ${currentStep === 5 ? "active" : currentStep > 5 ? "completed" : ""}`}>
                                <span className="name">Plaćanje</span>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};

export default Header;
