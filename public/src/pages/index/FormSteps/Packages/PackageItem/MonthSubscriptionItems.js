import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { resetToInitialValues } from "../../../../../redux/pricingTab/pricingTab.actions";

const MonthSubscriptionItem = (props) => {
    const { data, metaData } = props;
    const { duration_id, contract_duration_tooltip, expenses, pricing, total_sum_discount, total_sum_no_discount, variation_id, variation_name } = data;
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(null);

    const setProductAsActive = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const promiseFunction = new Promise((resolve, reject) => {
            setIsActive(null);
            document.querySelectorAll(".month-variations--item > .checkbox").forEach((item, index) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".month-variations--item").forEach((item, index) => {
                item.classList.remove("active", "disabled");
            });
            resolve();
        });

        promiseFunction.then(() => {
            setIsActive(true);
            document.querySelectorAll(".month-variations--item").forEach((item, index) => {
                if (!item.classList.contains("active")) {
                    item.classList.add("disabled");
                }
            });

            const initialPricing = {
                currency: metaData.meta.currency,
                mainProductId: metaData.meta.product_code,
                variationProductId: variation_id,
                variationProductName: variation_name,
                variantDurationID: duration_id,
                productCountryCode: metaData.meta.language_code,
                paymentType: "plan_variation",
                headerValues: {
                    name: metaData.title,
                    price: metaData.meta.base_price,
                    subscriptionDuration: parseInt(variation_name),
                    contractLength: 0,
                    contractLengthText: contract_duration_tooltip,
                    isPromotion: false
                },
                paymentValues: {
                    subscriptionFullPrice: pricing.subscription_price,
                    subscriptionDiscountPrice: pricing.subscription_discount_price,
                    boxPrice: pricing.box_price ? pricing.boxPrice : 0,
                    boxPriceDiscount: pricing.box_discount_price ? pricing.box_discount_price : 0,
                    additionalExpenses: expenses,
                    totalPrice: total_sum_discount ? total_sum_discount : total_sum_no_discount,
                    totalDiscount: 0
                },
                available: {
                    availableDevices: metaData.meta.additional.devices,
                    features: metaData.meta.additional.features
                }
            };
            dispatch(resetToInitialValues(initialPricing));
        });
    };

    return (
        <div onClick={(e) => setProductAsActive(e)} className={`month-variations--item ${isActive === null ? "" : isActive ? "active" : ""}`}>
            <div className={`checkbox ${isActive ? "active" : ""}`}>
                <span className="filled"></span>
            </div>

            <div className="content">
                <h3 className="title">{variation_name}</h3>
                <p className="text">{
                    parseInt(variation_name) === 1 ? "mesec"
                                                    : parseInt(variation_name) > 5 ? "meseci" : "meseca"
                }</p>
            </div>
        </div>
    );
};

export default MonthSubscriptionItem;
