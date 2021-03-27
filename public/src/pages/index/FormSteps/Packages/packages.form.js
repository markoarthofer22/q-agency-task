import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigationStep } from "../../../../redux/navigation-steps/steps.actions";
import { getDataForURL, setUserHashInformation, setUserIP, setUserTZ, setUserOriginCountry } from "../../../../redux/globals/globals.actions";
import { setInitialValues, resetToInitialValues } from "../../../../redux/pricingTab/pricingTab.actions";
import { selectCurrentStep } from "../../../../redux/navigation-steps/steps.selectors";
import { currentPricing } from "../../../../redux/pricingTab/pricingTab.selectors";
import { useHistory } from "react-router-dom";
import axios from "../../../../redux/apis/main-api";
import {homeUrl} from "../../../../redux/globals/globals.endpoints";

//styles
import "./packages.scss";

// components
import Tooltip from "../../../../components/tooltip/tooltip.component";
import Button from "../../../../components/buttons/button.component";
import SvgIcon from "../../../../components/svg-icon/svg-icon.component";

//product Items
import ProductsWithBox from "./PackageItem/ProductsWithBox";
import ProductsNoBox from "./PackageItem/ProductsNoBox";
import ProductsChooseSubs from "./PackageItem/ProductsChooseSubs";

const PackagesForm = (props) => {
    const history = useHistory();
    const queryString = require("query-string");
    const [data, setData] = useState(null);
    const [variation, setVariation] = useState(null);
    const [box_variations, setBoxVariations] = useState([]);
    const [variations, setVariations] = useState([]);

    const currentStep = useSelector(selectCurrentStep);
    const currentPriceValues = useSelector(currentPricing);
    const dispatch = useDispatch();

    useEffect(() => {
        let queryParams = queryString.parse(history.location.search);
        let url;

        if (queryParams.product_code && queryParams.product_code !== "") {
            url = `/products/code/?product_code=${queryParams["product_code"]}&lang_code=${localStorage.getItem("lang_code")}`;
        } else {
            url = `/products/?lang_code=${localStorage.getItem("lang_code")}`;
        }

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
                    window.history.replaceState(null, null, `/shop/products/?${queryString.stringify(queryParams)}`);
                })
                .catch((error) => {});
        }

        setBoxVariations([]);
        setVariations([]);

        dispatch(getDataForURL(url))
            .then((response) => {
                setData(response.data);
                dispatch(setUserIP(response.data.origin));
                dispatch(setUserTZ(response.data.originTZ));
                dispatch(setUserOriginCountry(response.data.originCountry.toLowerCase()));
                const initialPricing = {
                    currency: response.data.meta.currency,
                    productCountryCode: response.data.meta.language_code,
                    headerValues: {
                        name: response.data.title,
                        price: response.data.meta.base_price
                    },
                    available: {
                        availableDevices: response.data.meta.additional.devices,
                        features: response.data.meta.additional.features
                    }
                };

                response.data.variations.map((item) => {
                    if (item.has_box) {
                        setBoxVariations((oldArray) => [...oldArray, item]);
                    } else {
                        setVariations((oldArray) => [...oldArray, item]);
                    }
                });

                dispatch(setInitialValues(initialPricing));
                sendGAevent(response.data);
            })
            .catch((error) => {
                if (error) {
                    let url = `/?lang_code=${localStorage.getItem("lang_code")}`;
                    history.push(url);
                }
            });
    }, [history.location, localStorage.getItem("lang_code")]);

    const DummyText =
        "EON Smart Box svaki TV pretvara u Smart TV. Pomoću EON Smart Boxa možete uživati u najboljem sadržaju iz NetTV Plus paketa i preuzimati aplikacije iz Google Play Store-a. Sve što vam je potrebno je HDMI priključak i internet konekcija.";

    const DummyTextSecond =
        "Gledaj EON na svom Smart televizoru novije generacije, kao i na računaru i smart mobilnim uređajima. Pogledaj na kojim Smart televizorima možeš da gledaš EON aplikaciju bez korišćenja dodatnog uređaja";

    const goToPreviousStep = () => {
        if (currentStep === 2) {
            let queryParams = queryString.parse(history.location.search);
            delete queryParams["product_code"];

            let url = `/products/?${queryString.stringify(queryParams)}`;
            history.push(url);
            dispatch(setCurrentNavigationStep("subtract"));
        } else if (currentStep === 3) {
            setVariation(null);
            dispatch(setCurrentNavigationStep("subtract"));
            const initialPricing = {
                currency: data.meta.currency,
                headerValues: {
                    name: data.title,
                    price: data.meta.base_price
                },
                available: {
                    availableDevices: data.meta.additional.devices,
                    features: data.meta.additional.features
                }
            };
            dispatch(resetToInitialValues(initialPricing));
        }
    };

    const sendGAevent = (payload) => {
        if (window.dataLayer) {
            console.log('Products dataLayer - step 1: ', payload);

            window.dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': payload.meta.currency,
                    'checkout': {
                        'actionField': {'step': 1, 'option': ''},
                        'products': [{
                            'name': payload.title,
                            'id': payload.meta.product_code,
                            'price': payload.meta.base_price,
                            'brand': 'NetTV',
                            'category': 'Tržište ' + payload.meta.language_code,
                            'variant': '',
                            'quantity': 1
                        }]
                    }
                }
            });
        }
    };

    const sendGAevent2 = (payload, option) => {
        if (window.dataLayer) {
            console.log('Products dataLayer - step 2: ', payload, option);

            window.dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': payload.meta.currency,
                    'checkout': {
                        'actionField': {'step': 2, 'option': option},
                        'products': [{
                            'name': payload.title,
                            'id': payload.meta.product_code,
                            'price': payload.meta.base_price,
                            'brand': 'NetTV',
                            'category': 'Tržište ' + payload.meta.language_code,
                            'variant': '',
                            'quantity': 1
                        }]
                    }
                }
            });
        }
    };

    const sendGAevent3 = (payload) => {
        if (window.dataLayer) {
            console.log('Products dataLayer - step 3: ', payload, variation, currentPriceValues.variationProductName, currentPriceValues.paymentValues.subscriptionDiscountPrice);

            window.dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': payload.meta.currency,
                    'checkout': {
                        'actionField': {'step': 3, 'option': variation},
                        'products': [{
                            'name': payload.title,
                            'id': payload.meta.product_code,
                            'price': currentPriceValues.paymentValues.subscriptionDiscountPrice,
                            'brand': 'NetTV',
                            'category': 'Tržište ' + payload.meta.language_code,
                            'variant': currentPriceValues.variationProductName,
                            'quantity': 1
                        }]
                    }
                }
            });
        }
    };

    const goToCheckout = (e) => {
        dispatch(setCurrentNavigationStep(4));
        sendGAevent3(data);
    };

    const openProductsBoxList = (e) => {
        e.preventDefault();

        dispatch(setCurrentNavigationStep("add"));
        setVariation("box_variation");
        sendGAevent2(data, "plan_box");
    };

    const openProductsNormalList = (e) => {
        e.preventDefault();

        dispatch(setCurrentNavigationStep("add"));
        setVariation("normal_variations");
        sendGAevent2(data, "plan_variation");
    };

    return (
        <section className="packages">
            {variation === null && data && data.meta.additional && data.meta.additional.devices && (
                <div className="top-content">
                    <h3 className="top-content--title">Uvek dostupno na:</h3>
                    <div className="top-content--icons">
                        {data.meta.additional.devices.map((item, index) => (
                            <div className="top-content--icons--available-icon" key={index}>
                                <div className="top-content--icons--item">
                                    <span className={`net-${item}`}></span>
                                </div>
                                <span className="available-name">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="main-content">
                {variation === null && (
                    <>
                        <h3 className="main-content--title">Da li želiš da gledaš televiziju i preko BOX-a?</h3>

                        <div className="main-content--choices">
                            <div className={`main-content--choices-item ${data && box_variations.length < 1 ? "disabled" : ""}`}>
                                <div className="values">
                                    <span className="name">Želim da gledam preko BOX-a</span>
                                    <Tooltip title={DummyText} styles="custom-tooltip" icon="icon-info" />
                                </div>
                                <Button isLoading={data && box_variations.length < 1} title="Odaberi" clicked={(e) => openProductsBoxList(e)} customClass="button-blue" />
                            </div>

                            <div className={`main-content--choices-item ${data && variations.length < 1 && data.monthly_subscriptions.variations.length < 1 ? "disabled" : ""}`}>
                                <div className="values">
                                    <span className="name">Ne želim da gledam preko BOX-a</span>
                                    <Tooltip title={DummyTextSecond} styles="custom-tooltip" icon="icon-info" />
                                </div>
                                <Button
                                    isLoading={data && variations.length < 1 && data.monthly_subscriptions.variations.length < 1}
                                    title="Odaberi"
                                    clicked={(e) => openProductsNormalList(e)}
                                    customClass="button-blue"
                                />
                            </div>
                        </div>
                    </>
                )}

                {variation === "box_variation" && (
                    <>
                        <h3 className="main-content--title with-margin">Odaberi način pretplate</h3>
                        <div className="box-variations">
                            {box_variations.map((item, index) => (
                                <ProductsWithBox metaData={data} isFeatured={box_variations.length % 2 !== 0 && index === 0} item={item} key={index} />
                            ))}
                        </div>
                    </>
                )}

                {variation === "normal_variations" && (
                    <>
                        <h3 className="main-content--title with-margin">Odaberi način pretplate</h3>
                        <div className="box-variations">
                            {variations.map((item, index) => (
                                <ProductsNoBox isFeatured={(variations.length - 1) % 2 !== 0 && index === 0} key={index} metaData={data} item={item} />
                            ))}
                            <ProductsChooseSubs metaData={data} />
                        </div>
                    </>
                )}

                <div className="main-content--actions-box">
                    <Button clicked={(e) => goToPreviousStep()} customClass="button-back">
                        <SvgIcon icon="icon-arrow-left-1" />
                        <span className="button-name">Nazad</span>
                    </Button>

                    <Button isLoading={!currentPriceValues.mainProductId && !currentPriceValues.variationProductId} customClass="button-next" clicked={(e) => goToCheckout(e)}>
                        <span className="button-name">Nastavi</span>
                    </Button>
                </div>

                <div className="main-content--notice-box">
                    <ul className="main-content--notice-box--list">
                        <li className="main-content--notice-box--list-item">Ponude važe za nove korisnike.</li>
                        <li className="main-content--notice-box--list-item">Za dostavu BOX-a biće nam potrebna adresa koju ćeš nam dostaviti u daljim koracima.</li>
                        <li className="main-content--notice-box--list-item">
                            Možeš da nas obavestiš da želiš da vratiš BOX bez navođenja bilo kakvog posebnog razloga. To možeš da učiniš u roku od 14 dana od njegovog prijema poštom, mejlom, telefonom
                            i sl. Ako nam izjavu upućuješ poštom ili mejlom možeš i da popuniš izjavu koju ćemo ti poslati uz mejl nakon obavljene kupovine. Više informacija o postupku vraćanja možeš
                            naći{" "}
                            <a target="_blank" href={homeUrl + 'uslovi-koriscenja/'}>
                                ovde
                            </a>{" "}
                            ili u mejlu koji ćemo ti poslati nakon kupovine.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default PackagesForm;
