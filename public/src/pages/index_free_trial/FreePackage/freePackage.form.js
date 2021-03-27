import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "underscore";

//redux
import axios from "../../../redux/apis/main-api";
import { useDispatch } from "react-redux";
import { setCurrentNavigationStep } from "../../../redux/navigation-steps/steps.actions";
import { setInitialValues } from "../../../redux/pricingTab/pricingTab.actions";
import { getDataForURL, setUserIP, setUserTZ, setUserOriginCountry, setUserHashInformation } from "../../../redux/globals/globals.actions";
import {homeUrl} from "../../../redux/globals/globals.endpoints";

//styles

import "./free-package.scss";

// components
import Button from "../../../components/buttons/button.component";

const FreePackage = (props) => {
    const queryString = require("query-string");
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let queryParams = queryString.parse(history.location.search);

        if (queryParams["uec"]) {
            axios
                .post("/selfcare/auth/hash", {
                    hash: queryParams["uec"]
                })
                .then((response) => {
                    if (response.data.success === false) {
                        history.push("/404");
                        return;
                    }
                    dispatch(setUserHashInformation(response.data.data));
                    let queryParams = queryString.parse(history.location.search);
                    delete queryParams["uec"];
                    window.history.replaceState(null, null, `/shop/free-trial/?${queryString.stringify(queryParams)}`);
                })
                .catch((error) => {});
        }
    }, []);

    useEffect(() => {
        let queryParams = queryString.parse(history.location.search);
        let url;

        if (queryParams.plan !== undefined && queryParams.plan !== "") {
            url = `free-trial/?plan=${queryParams.plan}&country_code=${
                queryParams.country_code ? queryParams.country_code : localStorage.getItem("lang_code") ? localStorage.getItem("lang_code") : "other"
            }`;
        } else {
            window.location = homeUrl + "paketi";
            return;
        }

        dispatch(getDataForURL(url)).then((response) => {
            let item = response.data;
            setData(item);
            dispatch(setUserIP(item.origin));
            dispatch(setUserTZ(item.originTZ));
            dispatch(setUserOriginCountry(item.originCountry));

            const currentPricing = {
                currency: item.currency,
                mainProductId: item.product_code,
                variantDurationID: item.payment_options.credit_card.duration_id, //ima
                productCountryCode: item.language_code,
                headerValues: {
                    name: item.title,
                    price: 0,
                    paymentOptions: { ...item.payment_options }, //nista
                    selectedPaymentOptions: { ...item.payment_options.credit_card },
                    subscriptionDuration: item.payment_options.credit_card.subscription_duration,
                    isPromotion: true
                },
                paymentValues: {
                    additionalExpenses: [],
                    totalPrice: 0
                },
                available: {
                    availableDevices: [...item.meta.devices],
                    features: item.meta.feature_additional
                }
            };

            dispatch(setInitialValues(currentPricing));
            sendGAevent(item)
        });
    }, [localStorage.getItem("lang_code")]);

    const sendGAevent = (payload) => {
        if (window.dataLayer) {
            console.log('Free Trial dataLayer - step 1: ', payload);

            window.dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': payload.currency,
                    'checkout': {
                        'actionField': {'step': 1, 'option': ''},
                        'products': [{
                            'name': 'Standard',
                            'id': payload.product_code,
                            'price': 0,
                            'brand': 'NetTV',
                            'category': 'Tržište '+ payload.language_code,
                            'variant': 'Gratis',
                            'quantity': 1
                        }]
                    }
                }
            });
        }
    };

    const goToCheckout = (e) => {
        dispatch(setCurrentNavigationStep(2));
    };

    return (
        data && (
            <section className="packages">
                <div className="top-content">
                    <h3 className="top-content--title big">{data.title}</h3>
                </div>

                <div className="main-content">
                    {data.meta.features.map((item, index) => (
                        <div className="main-content--package" key={index}>
                            <div className="main-content--package--option">
                                <div className="icon-holder">
                                    <img src={item.feature_icon} alt="" />
                                </div>
                                <div className="name">{item.feature_name}</div>
                                <div className="value">{item.feature_description}</div>
                            </div>
                        </div>
                    ))}

                    <div className="main-content--actions-box--gratis">
                        <Button customClass="button-next" clicked={(e) => goToCheckout(e)}>
                            <span className="button-name">Nastavi</span>
                        </Button>
                    </div>
                </div>
            </section>
        )
    );
};

export default FreePackage;
