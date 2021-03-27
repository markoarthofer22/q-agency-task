import React, { useEffect, useState } from "react";
import _ from "underscore";
//redux
import { useDispatch, useSelector } from "react-redux";
import { currentPricing, selectedPaymentOptions } from "../../../redux/pricingTab/pricingTab.selectors";
import useIsBreakpoint from "../../../components/hooks/useIsBreakpoint.hook";
import Button from "../../../components/buttons/button.component";

//styles
import "../../index/SidePanel/sidePanel.scss";

// components
import SvgIcon from "../../../components/svg-icon/svg-icon.component";

const FreeSidePanel = (props) => {
    const dispatch = useDispatch();
    const isMobile = useIsBreakpoint();
    const currentPrices = useSelector(currentPricing);
    const [openMobile, setOpenMobile] = useState(false);
    const selectedPricing = useSelector(selectedPaymentOptions);

    useEffect(() => {
        document.querySelectorAll(`.devices-icons--list-item`).forEach((item) => {
            item.classList.remove("active");
        });

        if (currentPrices.available && currentPrices.available.availableDevices) {
            currentPrices.available.availableDevices.forEach((item) => {
                document.querySelector(`.devices-icons--list-item[data-type="${item}"]`).classList.add("active");
            })
        }
    }, [currentPrices.available.availableDevices]);

    return (
        <>
            {isMobile !== "large" && isMobile !== "x-large" && (
                <Button clicked={(e) => setOpenMobile(!openMobile)} customClass="side-menu-button">
                    <SvgIcon icon="icon-cart" />
                </Button>
            )}
            <section className={`sidePanel ${isMobile !== "large" && isMobile !== "x-large" ? "mobile" : ""} ${openMobile ? "open" : ""}`}>
                {currentPrices.headerValues.isPromotion && (
                    <div className="side-panel-promo gratis">
                        <div>
                            {selectedPricing.featured_banner_title && (
                                <div className="promotion-name">
                                    <p>{selectedPricing.featured_banner_title}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="side-panel-box gratis">
                    <div className="package-section">
                        <p className="cart-title">Izabrani paket</p>
                        <div className="cart-row">
                            <p className="package-name">{currentPrices.headerValues.name}</p>
                            <p className="package-price">
                                {currentPrices.headerValues.price} <span className="currency">{currentPrices.currency}</span>
                            </p>
                        </div>
                        <div className="cart-row">
                            <p className="light-cart-text">Trajanje pretplate</p>
                            <p className="item-value">{currentPrices.headerValues.subscriptionDuration} dana</p>
                        </div>
                    </div>

                    <div className="package-section devices">
                        <p className="cart-title">Dostupno na uređajima</p>

                        <div className="devices-icons">
                            <ul className="devices-icons--list">
                                <li className="devices-icons--list-item" data-type="smart-tv">
                                    <span className="device-icon net-smart-tv"></span>
                                    <span className="title">Smart TV</span>
                                </li>
                                <li className="devices-icons--list-item" data-type="racunar">
                                    <span className="device-icon net-racunar"></span>
                                    <span className="title">Računar</span>
                                </li>
                                <li className="devices-icons--list-item" data-type="tablet">
                                    <span className="device-icon net-tablet"></span>
                                    <span className="title">Tablet</span>
                                </li>
                                <li className="devices-icons--list-item" data-type="mobilni">
                                    <span className="device-icon net-mobilni"></span>
                                    <span className="title">Mobilni</span>
                                </li>
                                <li className="devices-icons--list-item" data-type="box">
                                    <span className="device-icon net-box"></span>
                                    <span className="title">Box</span>
                                </li>
                            </ul>
                        </div>

                        {currentPrices.available && currentPrices.available.features ? (
                            currentPrices.available.features.map((item, index) => {
                                <div className="cart-row" key={index}>
                                    <p className="light-cart-text">{item.feature_name}</p>
                                    <p className="item-value">{item.feature_description}</p>
                                </div>;
                            })
                        ) : (
                            <>
                                <div className="cart-row">
                                    <p className="light-cart-text">Instaliraj na maksimalno</p>
                                    <p className="item-value">-</p>
                                </div>
                                <div className="cart-row">
                                    <p className="light-cart-text">Gledaj istovremeno na</p>
                                    <p className="item-value">-</p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="package-section total gratis">
                        <div className="cart-row">
                            <p className="cart-title">Ukupno</p>
                            {currentPrices.paymentValues.totalPrice ||
                                (parseInt(currentPrices.paymentValues.totalPrice) === 0 && (
                                    <p className="item-value">
                                        {parseInt(currentPrices.paymentValues.totalPrice)} {currentPrices.currency}
                                    </p>
                                ))}
                        </div>
                    </div>

                    <div className="cart-row notice-gratis">
                        <p dangerouslySetInnerHTML={{ __html: selectedPricing.duration_expiration_recurring }}></p>
                        <br />
                        <p>
                            <span dangerouslySetInnerHTML={{ __html: selectedPricing.duration_expiration }}></span>
                            <br />
                            <span dangerouslySetInnerHTML={{ __html: selectedPricing.duration_expiration_reminder }}></span>
                        </p>
                        <br />
                        <p>
                            <span dangerouslySetInnerHTML={{ __html: selectedPricing.duration_sentence_one }}></span>
                            <br />
                            <span dangerouslySetInnerHTML={{ __html: selectedPricing.duration_sentence_two }}></span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FreeSidePanel;
