import React, { useEffect, useState } from "react";
import _ from "underscore";
//redux
import { useSelector } from "react-redux";
import { currentPricing } from "../../../redux/pricingTab/pricingTab.selectors";
import useIsBreakpoint from "../../../components/hooks/useIsBreakpoint.hook";
import Button from "../../../components/buttons/button.component";

//styles
import "./sidePanel.scss";

// components
import Tooltip from "../../../components/tooltip/tooltip.component";
import SvgIcon from "../../../components/svg-icon/svg-icon.component";

const SidePanel = (props) => {
    const isMobile = useIsBreakpoint();
    const currentPrices = useSelector(currentPricing);
    const [openMobile, setOpenMobile] = useState(false);

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
                    <div className="side-panel-promo">
                        <div>
                            <div className="promo-icon">
                                <span>%</span>
                                <p className="promo-icon-text">Akcija</p>
                            </div>
                            {currentPrices.variationProductName && (
                                <div className="promotion-name">
                                    <p>{currentPrices.variationProductName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="side-panel-box">
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
                            <p className="item-value">
                                {!currentPrices.headerValues.subscriptionDuration
                                    ? "-"
                                    : parseInt(currentPrices.headerValues.subscriptionDuration) > 0
                                    ? currentPrices.headerValues.subscriptionDuration
                                    : "-"}{" "}
                                {(!currentPrices.headerValues.subscriptionDuration || parseInt(currentPrices.headerValues.subscriptionDuration) < 1) && ""}
                                {(parseInt(currentPrices.headerValues.subscriptionDuration) === 1 || parseInt(currentPrices.headerValues.subscriptionDuration) === 21) && "mesec"}
                                {parseInt(currentPrices.headerValues.subscriptionDuration) > 1 && parseInt(currentPrices.headerValues.subscriptionDuration) < 5 && "meseca"}
                                {parseInt(currentPrices.headerValues.subscriptionDuration) > 4 && parseInt(currentPrices.headerValues.subscriptionDuration) < 21 && "meseci"}
                                {parseInt(currentPrices.headerValues.subscriptionDuration) > 21 && parseInt(currentPrices.headerValues.subscriptionDuration) < 25 && "meseca"}
                            </p>
                        </div>
                        <div className="cart-row">
                            <p className="light-cart-text">
                                Ugovorna obaveza
                                {currentPrices.headerValues.contractLengthText && <Tooltip title={currentPrices.headerValues.contractLengthText} styles="custom-tooltip" />}
                            </p>
                            <p className="item-value">
                                {!currentPrices.headerValues.contractLength ? "-" : parseInt(currentPrices.headerValues.contractLength) > 0 ? currentPrices.headerValues.contractLength : "-"}{" "}
                                {(!currentPrices.headerValues.contractLength || parseInt(currentPrices.headerValues.contractLength) < 1) && ""}
                                {(parseInt(currentPrices.headerValues.contractLength) === 1 || parseInt(currentPrices.headerValues.contractLength) === 21) && "mesec"}
                                {parseInt(currentPrices.headerValues.contractLength) > 1 && parseInt(currentPrices.headerValues.contractLength) < 5 && "meseca"}
                                {parseInt(currentPrices.headerValues.contractLength) > 4 && parseInt(currentPrices.headerValues.contractLength) < 21 && "meseci"}
                                {parseInt(currentPrices.headerValues.contractLength) > 21 && parseInt(currentPrices.headerValues.contractLength) < 25 && "meseca"}
                            </p>
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
                            currentPrices.available.features.map((item, index) => (
                                <div className="cart-row" key={index}>
                                    <p className="light-cart-text">{item.feature_name}</p>
                                    <p className="item-value">{item.feature_description}</p>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="cart-row">
                                    <p className="light-cart-text">Gledaj istovremeno na</p>
                                    <p className="item-value">-</p>
                                </div>
                                <div className="cart-row">
                                    <p className="light-cart-text">Instaliraj EON aplikaciju na</p>
                                    <p className="item-value">-</p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="package-section payments">
                        <p className="cart-title">Odmah za plaćanje</p>

                        <div className="cart-row">
                            <p className="light-cart-text">Pretplata</p>

                            {!currentPrices.paymentValues.subscriptionFullPrice && !currentPrices.paymentValues.subscriptionDiscountPrice && <p className="item-value">-</p>}
                            {currentPrices.paymentValues.subscriptionFullPrice && !currentPrices.paymentValues.subscriptionDiscountPrice && (
                                <p className="item-value">
                                    {parseFloat(currentPrices.paymentValues.subscriptionFullPrice).toFixed(2)} {currentPrices.currency}
                                </p>
                            )}
                            {currentPrices.paymentValues.subscriptionFullPrice &&
                                currentPrices.paymentValues.subscriptionDiscountPrice &&
                                (parseFloat(currentPrices.paymentValues.subscriptionFullPrice).toFixed(2) !== parseFloat(currentPrices.paymentValues.subscriptionDiscountPrice).toFixed(2) ? (
                                    <p className="item-value">
                                        <span className="no-discount">
                                            {parseFloat(currentPrices.paymentValues.subscriptionFullPrice).toFixed(2)} {currentPrices.currency}
                                        </span>
                                        <span className="discount-price">
                                            {parseFloat(currentPrices.paymentValues.subscriptionDiscountPrice).toFixed(2)} {currentPrices.currency}
                                        </span>
                                    </p>
                                ) : (
                                    <p className="item-value">
                                        {parseFloat(currentPrices.paymentValues.subscriptionDiscountPrice).toFixed(2)} {currentPrices.currency}
                                    </p>
                                ))}
                        </div>
                        <div className="cart-row">
                            <p className="light-cart-text">BOX</p>
                            {!currentPrices.paymentValues.boxPrice && !currentPrices.paymentValues.boxPriceDiscount && <p className="item-value">-</p>}

                            {parseInt(currentPrices.paymentValues.boxPrice) > 0 && parseInt(currentPrices.paymentValues.boxPriceDiscount) > 0 && (
                                <>
                                    {currentPrices.paymentValues.boxPrice && !currentPrices.paymentValues.boxPriceDiscount && (
                                        <p className="item-value">
                                            {parseFloat(currentPrices.paymentValues.boxPrice).toFixed(2)} {currentPrices.currency}
                                        </p>
                                    )}
                                    {currentPrices.paymentValues.boxPrice &&
                                        currentPrices.paymentValues.boxPriceDiscount &&
                                        (parseFloat(currentPrices.paymentValues.boxPrice).toFixed(2) !== parseFloat(currentPrices.paymentValues.boxPriceDiscount).toFixed(2) ? (
                                            <p className="item-value">
                                                <span className="no-discount">
                                                    {parseFloat(currentPrices.paymentValues.boxPrice).toFixed(2)} {currentPrices.currency}
                                                </span>
                                                <span className="discount-price">
                                                    {parseFloat(currentPrices.paymentValues.boxPriceDiscount).toFixed(2)} {currentPrices.currency}
                                                </span>
                                            </p>
                                        ) : (
                                            <p className="item-value">
                                                {parseFloat(currentPrices.paymentValues.boxPriceDiscount).toFixed(2)} {currentPrices.currency}
                                            </p>
                                        ))}
                                </>
                            )}
                        </div>
                        <div className={`cart-row ${!_.isEmpty(currentPrices.paymentValues.additionalExpenses) ? "two-row" : ""}`}>
                            <p className="light-cart-text" style={{ marginBottom: 10 + "px" }}>
                                Dodatni troškovi
                            </p>
                            {_.isEmpty(currentPrices.paymentValues.additionalExpenses) && <p className="item-value">-</p>}

                            {!_.isEmpty(currentPrices.paymentValues.additionalExpenses) ? (
                                currentPrices.paymentValues.additionalExpenses.activation_price && currentPrices.paymentValues.additionalExpenses.activation_price > 0 ? (
                                    <div className="sub-item-value">
                                        <span className="name">- Aktivacija</span>{" "}
                                        <span className="value">
                                            {parseFloat(currentPrices.paymentValues.additionalExpenses.activation_price).toFixed(2)} {currentPrices.currency}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="sub-item-value">
                                        <span className="name">- Aktivacija</span> <span className="value">-</span>
                                    </div>
                                )
                            ) : null}

                            {!_.isEmpty(currentPrices.paymentValues.additionalExpenses) ? (
                                currentPrices.paymentValues.additionalExpenses.delivery_price && currentPrices.paymentValues.additionalExpenses.delivery_price > 0 ? (
                                    <div className="sub-item-value">
                                        <span className="name">- Dostava</span>{" "}
                                        <span className="value">
                                            {parseFloat(currentPrices.paymentValues.additionalExpenses.delivery_price).toFixed(2)} {currentPrices.currency}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="sub-item-value">
                                        <span className="name">- Dostava</span> <span className="value">-</span>
                                    </div>
                                )
                            ) : null}
                        </div>
                    </div>

                    <div className="package-section total">
                        <div className="cart-row">
                            <p className="cart-title">Ukupno</p>
                            {currentPrices.paymentValues.totalPrice && (
                                <p className="item-value">
                                    {parseFloat(currentPrices.paymentValues.totalPrice).toFixed(2)} {currentPrices.currency}
                                </p>
                            )}

                            {!currentPrices.paymentValues.totalPrice && <p className="item-value">-</p>}
                        </div>

                        {currentPrices.paymentValues.totalDiscount && parseInt(currentPrices.paymentValues.totalDiscount) > 0 ? (
                            <div className="cart-row blue">
                                <p className="cart-title">Uštedeli ste</p>
                                <p className="item-value">
                                    {parseFloat(currentPrices.paymentValues.totalDiscount).toFixed(2)} {currentPrices.currency}
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div className="cart-row">
                        <p className="notice">*Cene su sa uključenim VAT-om</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SidePanel;
