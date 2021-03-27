import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { resetToInitialValues } from "../../../../../redux/pricingTab/pricingTab.actions";

//assets
import eonLogo from "../../../../../../public/assets/eon_logo.png";

//components
import MonthSubscriptionItem from "./MonthSubscriptionItems";

const ProductsChooseSubs = (props) => {
    const { metaData } = props;
    const { monthly_subscriptions, meta, title } = metaData;
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(null);

    const setProductAsActive = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const promiseFunction = new Promise((resolve, reject) => {
            setIsActive(null);
            document.querySelector(".month-variations-holder").classList.remove("active");
            document.querySelectorAll(".box-variations--item > .checkbox").forEach((item, index) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".box-variations--item").forEach((item, index) => {
                item.classList.remove("active", "disabled");
            });
            resolve();
        });

        promiseFunction.then(() => {
            setIsActive(true);
            document.querySelectorAll(".box-variations--item").forEach((item, index) => {
                if (!item.classList.contains("active")) {
                    item.classList.add("disabled");
                }
            });
            const initialPricing = {
                currency: meta.currency,
                headerValues: {
                    name: title,
                    price: meta.base_price
                },
                available: {
                    availableDevices: meta.additional.devices,
                    features: meta.additional.features
                }
            };
            dispatch(resetToInitialValues(initialPricing));
        });
    };

    return (
        <>
            <div onClick={(e) => setProductAsActive(e)} className={`box-variations--item ${isActive === null ? "" : isActive ? "active" : ""}`}>
                <div className={`checkbox ${isActive ? "active" : ""}`}>
                    <span className="filled"></span>
                </div>

                <div className="img-box">
                    <img src={eonLogo} alt={monthly_subscriptions.name} />
                </div>
                <div className="content">
                    <h3 className="title">{monthly_subscriptions.name}</h3>
                    <p className="text">{monthly_subscriptions.description}</p>
                </div>
            </div>
            <div className={`month-variations-holder ${isActive ? "active" : ""}`}>
                <h3 className="main-content--title with-margin">Odaberi period trajanja pretplate</h3>
                <div className="month-variations">
                    {monthly_subscriptions.variations.map((item, index) => (
                        <MonthSubscriptionItem metaData={metaData} data={item} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductsChooseSubs;
