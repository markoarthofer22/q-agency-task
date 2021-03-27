import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { setInitialValues } from "../../../../../redux/pricingTab/pricingTab.actions";

const ProductsNoBox = (props) => {
    const { item, metaData, isFeatured } = props;
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(null);

    const setProductAsActive = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const promiseFunction = new Promise((resolve) => {
            setIsActive(null);
            document.querySelector(".month-variations-holder").classList.remove("active");
            document.querySelectorAll(".month-variations-holder .checkbox").forEach((item) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".month-variations--item").forEach((item) => {
                item.classList.remove("active", "disabled");
            });

            document.querySelectorAll(".box-variations--item > .checkbox").forEach((item) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".box-variations--item").forEach((item) => {
                item.classList.remove("active", "disabled");
            });
            resolve();
        });

        promiseFunction.then(() => {
            setIsActive(true);
            document.querySelectorAll(".box-variations--item").forEach((item) => {
                if (!item.classList.contains("active")) {
                    item.classList.add("disabled");
                }
            });
            setCurrentPrices();
        });

        const setCurrentPrices = (data) => {
            const {
                variation_name,
                contract_duration,
                duration_id,
                expenses,
                pricing,
                subscription_duration,
                total_saving,
                total_sum_discount,
                total_sum_no_discount,
                variation_id,
                is_promotion,
                contract_duration_tooltip
            } = item;

            const currentPricing = {
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
                    subscriptionDuration: subscription_duration,
                    contractLength: contract_duration,
                    contractLengthText: contract_duration_tooltip,
                    isPromotion: is_promotion
                },
                paymentValues: {
                    subscriptionFullPrice: pricing.subscription_price,
                    subscriptionDiscountPrice: pricing.subscription_discount_price,
                    boxPrice: pricing.box_price ? pricing.boxPrice : 0,
                    boxPriceDiscount: pricing.box_discount_price ? pricing.box_discount_price : 0,
                    additionalExpenses: expenses,
                    totalPrice: total_sum_discount ? total_sum_discount : total_sum_no_discount,
                    totalDiscount: total_saving
                },
                available: {
                    availableDevices: metaData.meta.additional.devices
                }
            };

            dispatch(setInitialValues(currentPricing));
        };
    };

    return (
        <div onClick={(e) => setProductAsActive(e)} className={`box-variations--item  ${isFeatured ? "featured" : ""} ${isActive === null ? "" : isActive ? "active" : ""}`}>
            <div className={`checkbox ${isActive ? "active" : ""}`}>
                <span className="filled"></span>
            </div>

            <div className="img-box">
                <img src={item.variation_image} alt={item.variation_name} />
            </div>
            <div className="content">
                <h3 className="title">{item.variation_name}</h3>
                <p className="text">{item.variation_description}</p>
            </div>
        </div>
    );
};

export default ProductsNoBox;
