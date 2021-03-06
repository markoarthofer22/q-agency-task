import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import _ from "underscore";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigationStep } from "../../../redux/navigation-steps/steps.actions";
import { setIsLoading, setUserHashInformation, setUserIP, setUserTZ, setUserOriginCountry } from "../../../redux/globals/globals.actions";
import { setExistingTransactionResponse } from "../../../redux/pricingTab/pricingTab.actions";
import { currentPricing } from "../../../redux/pricingTab/pricingTab.selectors";
import { selectAllCountryIDs, globalUserIP, globalUserHash, globalUserTZ, globalUserCountry } from "../../../redux/globals/globals.selectors";
import axios from "../../../redux/apis/main-api";
import {homeUrl} from "../../../redux/globals/globals.endpoints";

//styles
import "../../index/FormSteps/PaymentInfo/paymentInfo.scss";

// components
import Button from "../../../components/buttons/button.component";
import SvgIcon from "../../../components/svg-icon/svg-icon.component";
import InputComponent from "../../../components/input/input.component";
import InputTypePhone from "../../../components/input/input-type-phone.component";
import Popup from "../../../components/popup/popup.component";
import Dialog from "../../../components/dialog/dialog.component";

//hooks
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const BundlePayout = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const queryString = require("query-string");
    const currentPriceValues = useSelector(currentPricing);
    const userIP = useSelector(globalUserIP);
    const userHash = useSelector(globalUserHash);
    const userTZ = useSelector(globalUserTZ);
    const userOriginCountry = useSelector(globalUserCountry);
    const allowedMarket = useSelector(selectAllCountryIDs);
    const [countriesList, setCountriesList] = useState(null);
    const [countryDial, setCountryDial] = useState();
    const [buyersCountry, setBuyersCountry] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cards");
    const [paymentMethodHTML, setPaymentMethodHTML] = useState(null);
    const [buyersCountryCustomInputValue, setBuyersCountryCustomInputValue] = useState("");
    const [checkoutRedirectArray, setCheckoutRedirectArray] = useState();
    const [redirectUrl, setRedirectUrl] = useState("");
    const [selfCarePhone, setSelfCarePhone] = useState("");
    const [selfCareDial, setSelfCareDial] = useState("");
    const [creditCardInfo, setCreditCardInfo] = useState([]);
    const [selectedCreditCardInfo, setSelectedCreditCardInfo] = useState({});
    const [openCreditCardDropdown, setOpenCreditCardDropdown] = useState(false);

    const checkoutRef = useRef();
    const { register, handleSubmit, errors, watch, setError, clearError } = useForm({
        mode: "onChange",
        reValidateMode: "onSubmit"
    });
    const [referralCodeResponse, setReferralCodeResponse] = useState({
        status: false,
        message: "",
        value: ""
    });
    const [bankCheckoutResponse, setBankCheckoutResponse] = useState({
        error: "",
        success: false,
        response: {}
    });

    const [bundleError, setBundleError] = useState({
        isDialogOpen: false,
        title: "",
        message: ""
    });

    //chech if userHash is present and valid
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
                    window.history.replaceState(null, null, `/shop/bundle/?${queryString.stringify(queryParams)}`);
                })
                .catch((error) => {});
        }
    }, []);

    //if hash exist
    useEffect(() => {
        if (userHash) {
            setIsButtonDisabled(true);
            dispatch(setIsLoading(true));
            const entries = Object.entries(userHash);
            for (const [property, value] of entries) {
                if (property === "dialing_code") {
                    setSelfCareDial(value);
                }

                if (property === "ip_address") {
                    dispatch(setUserIP(value));
                }

                if (property === "originCountry") {
                    dispatch(setUserOriginCountry(value));
                }

                if (property === "originTZ") {
                    dispatch(setUserTZ(value));
                }

                if (property === "info") {
                    setCreditCardInfo(value);
                    setSelectedCreditCardInfo(_.find(value, (item) => item.primary_card === 1));
                }

                if (document.querySelector(`input[name='${property}']`)) {
                    if (property === "phone") {
                        setSelfCarePhone(`+${selfCareDial}${value}`);
                    } else {
                        if (value) {
                            document.querySelector(`input[name='${property}']`).disabled = true;
                            document.querySelector(`input[name='${property}']`).value = value;
                        }
                    }
                }
            }
            setIsButtonDisabled(false);
            dispatch(setIsLoading(false));
        }
    }, [userHash, countriesList, selfCareDial]);

    // get all dial codes
    useEffect(() => {
        dispatch(setIsLoading(true));
        axios.get("netapi/dialing_codes").then((response) => {
            setCountriesList(response.data);
            dispatch(setIsLoading(false));
        });

        if (localStorage.getItem("lang_code") && localStorage.getItem("lang_code") !== "other") {
            let state = allowedMarket.find((item) => {
                return item.countryCode === localStorage.getItem("lang_code");
            });
            setBuyersCountry(state.countryName);
        }
    }, []);

    //if success check for submit form and submit
    useEffect(() => {
        if (checkoutRef.current) {
            checkoutRef.current.submit();
            location.reload();
        }
    }, [checkoutRedirectArray]);

    const sendGAevent = (payload) => {
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'checkout',
                'ecommerce': {
                    'currencyCode': payload.currency,
                    'checkout': {
                        'actionField': {'step': 3, 'option': payload.promotion_type},
                        'products': [{
                            'name': payload.title,
                            'id': payload.plan_id,
                            'price': currentPriceValues.paymentValues.subscriptionDiscountPrice,
                            'brand': 'NetTV',
                            'category': 'Tr??i??te ' + payload.country_code,
                            'variant': currentPriceValues.variationProductName,
                            'quantity': 1
                        }]
                    }
                }
            });
        }
    };

    //handle all data from inputs
    const handleData = (_data, e) => {
        e.preventDefault();

        setIsButtonDisabled(true);
        dispatch(setIsLoading(true));

        const utmTags = getUtmTags();

        let payload = {};

        if (currentPriceValues.paymentType === "plan_box") {
            payload = {
                ..._data,
                phone: returnPhoneWithoutDial(_data.phone, countryDial),
                dialing_code: countryDial,
                country_code: currentPriceValues.productCountryCode.toUpperCase(),
                friend_referral_code: referralCodeResponse.status ? referralCodeResponse.value : "",
                ip_address: userIP,
                originTZ: userTZ,
                originCountry: userOriginCountry,
                account_status: !_.isEmpty(userHash) ? "self_care_account" : "checkout",
                subscription_type: "paid",
                utm_source: utmTags.utm_source,
                utm_medium: utmTags.utm_medium,
                utm_campaign: utmTags.utm_campaign,
                plan_id: currentPriceValues.mainProductId,
                duration_id: currentPriceValues.variantDurationID,
                subscription_price: currentPriceValues.paymentValues.subscriptionDiscountPrice
                    ? currentPriceValues.paymentValues.subscriptionDiscountPrice
                    : currentPriceValues.paymentValues.subscriptionFullPrice,
                total_price: currentPriceValues.paymentValues.totalPrice,
                currency: currentPriceValues.currency,
                box_price: currentPriceValues.paymentValues.boxPriceDiscount ? currentPriceValues.paymentValues.boxPriceDiscount : currentPriceValues.paymentValues.boxPrice,
                activation_price: currentPriceValues.paymentValues.additionalExpenses.activation_price,
                transport_price: currentPriceValues.paymentValues.additionalExpenses.delivery_price,
                discount_value: "1.00",
                promotion_id: currentPriceValues.variationProductId,
                promotion_type: currentPriceValues.paymentType,
                credit_card_id: selectedCreditCardInfo ? (selectedCreditCardInfo.credit_card_id !== 1 ? selectedCreditCardInfo.credit_card_id : "") : "",
                new_card_selected: selectedCreditCardInfo ? (selectedCreditCardInfo.credit_card_id === 1 ? "1" : "0") : "1"
            };
        } else if (currentPriceValues.paymentType === "plan_variation") {
            payload = {
                ..._data,
                phone: returnPhoneWithoutDial(_data.phone, countryDial),
                dialing_code: countryDial,
                country_code: currentPriceValues.productCountryCode.toUpperCase(),
                friend_referral_code: referralCodeResponse.status ? referralCodeResponse.value : "",
                ip_address: userIP,
                originTZ: userTZ,
                originCountry: userOriginCountry,
                account_status: !_.isEmpty(userHash) ? "self_care_account" : "checkout",
                subscription_type: "paid",
                utm_source: utmTags.utm_source,
                utm_medium: utmTags.utm_medium,
                utm_campaign: utmTags.utm_campaign,
                plan_id: currentPriceValues.mainProductId,
                duration_id: currentPriceValues.variantDurationID,
                subscription_price: currentPriceValues.paymentValues.subscriptionDiscountPrice
                    ? currentPriceValues.paymentValues.subscriptionDiscountPrice
                    : currentPriceValues.paymentValues.subscriptionFullPrice,
                total_price: currentPriceValues.paymentValues.totalPrice,
                currency: currentPriceValues.currency,
                box_price: "0",
                activation_price: currentPriceValues.paymentValues.additionalExpenses.activation_price,
                transport_price: currentPriceValues.paymentValues.additionalExpenses.delivery_price,
                discount_value: "1.00",
                promotion_id: currentPriceValues.variationProductId,
                promotion_type: currentPriceValues.paymentType,
                credit_card_id: selectedCreditCardInfo ? (selectedCreditCardInfo.credit_card_id !== 1 ? selectedCreditCardInfo.credit_card_id : "") : "",
                new_card_selected: selectedCreditCardInfo ? (selectedCreditCardInfo.credit_card_id === 1 ? "1" : "0") : "1"
            };
        }

        sendGAevent(payload);

        if (paymentMethod === "cards") {
            let paymentURL = !_.isEmpty(userHash) ? "selfcare/shoppayment/card" : "shoppayment/card";

            if (currentPriceValues.paymentType === "plan_box" && parseInt(currentPriceValues.headerValues.contractLength) === 0) {
                payload = {
                    ...payload
                };
            } else if (parseInt(currentPriceValues.headerValues.contractLength) === 0) {
                payload = {
                    ...payload,
                    address: "",
                    city: "",
                    zip: "",
                    state: "",
                    comment: ""
                };
            }
            axios
                .post(paymentURL, { ...payload })
                .then((response) => {
                    if (!_.isEmpty(response.data.errors)) {
                        setIsButtonDisabled(false);
                        dispatch(setIsLoading(false));

                        const entries = Object.entries(response.data.errors);
                        for (const [property, value] of entries) {
                            if (property === "system") {
                                return history.push("/transaction-fail");
                            }
                            else if(property === 'phone') {
                                setError(property, 'empty', value);
                                document.querySelector(`input[name='phone']`).focus();
                            }
                            else {
                                setBundleError({
                                    isDialogOpen: true,
                                    title: "Neuspe??na pretplata!",
                                    message: value
                                });
                            }
                        }
                        //document.querySelector(`input[name='${entries[0][0]}']`).focus();
                        return;
                    }

                    if(response.data.existing_transaction !== undefined) {
                        dispatch(setExistingTransactionResponse(response.data.response));
                        setIsButtonDisabled(false);
                        dispatch(setCurrentNavigationStep(2));
                        dispatch(setIsLoading(false));
                        return;
                    }

                    const entries = Object.entries(response.data.fd);
                    let tempArray = [];

                    for (const [property, value] of entries) {
                        if (property === "post_url") {
                            setRedirectUrl(value);
                        }

                        tempArray.push({
                            item: property,
                            value: value
                        });
                    }

                    setIsButtonDisabled(false);
                    dispatch(setIsLoading(false));

                    if (tempArray.length < 1) return;

                    return setCheckoutRedirectArray(tempArray);
                })
                .catch((error) => {
                    setIsButtonDisabled(false);
                    dispatch(setIsLoading(false));
                    setBundleError({
                        isDialogOpen: true,
                        title: "Neuspe??na pretplata!",
                        message: error.response ? error.response.data.message : "error"
                    });
                });
        } else if (paymentMethod === "bank") {
            let paymentURL = !_.isEmpty(userHash) ? "selfcare/shoppayment/bank" : "shoppayment/bank/bankpayment";

            if (currentPriceValues.paymentType === "plan_box" && parseInt(currentPriceValues.headerValues.contractLength) === 0) {
                payload = {
                    ...payload
                };
            } else if (parseInt(currentPriceValues.headerValues.contractLength) === 0) {
                payload = {
                    ...payload,
                    address: "",
                    city: "",
                    zip: "",
                    state: "",
                    comment: ""
                };
            }

            axios
                .post(paymentURL, { ...payload })
                .then((response) => {
                    if (!_.isEmpty(response.data.errors)) {
                        setIsButtonDisabled(false);
                        dispatch(setIsLoading(false));

                        const entries = Object.entries(response.data.errors);
                        for (const [property, value] of entries) {
                            if (property === "system") {
                                return history.push("/transaction-fail");
                            }
                            else if(property === 'phone') {
                                setError(property, 'empty', value);
                                document.querySelector(`input[name='phone']`).focus();
                            }
                            else {
                                setBundleError({
                                    isDialogOpen: true,
                                    title: "Neuspe??na pretplata!",
                                    message: value
                                });
                            }
                        }
                        //document.querySelector(`input[name='${entries[0][0]}']`).focus();
                        return;
                    }

                    dispatch(setExistingTransactionResponse(response.data.response));
                    setIsButtonDisabled(false);
                    dispatch(setCurrentNavigationStep(2));
                    dispatch(setIsLoading(false));
                })
                .catch((error) => {
                    setIsButtonDisabled(false);
                    dispatch(setIsLoading(false));
                    setBundleError({
                        isDialogOpen: true,
                        title: "Neuspe??na pretplata!",
                        message: error.response ? error.response.data.message : "error"
                    });
                });
        }
    };

    const getUtmTags = () => {
        const queryParams = queryString.parse(location.search);
        return {
            utm_source: queryParams.utm_source || "",
            utm_medium: queryParams.utm_medium || "",
            utm_campaign: queryParams.utm_campaign || ""
        }
    }


    //return input from select (phone)
    const returnInputValue = (countryID, countryDial, countryName) => {
        setCountryDial(countryDial);
    };

    const returnPhoneWithoutDial = (phoneNumber, dialCode) => {
        return phoneNumber.replace(`+${dialCode}`, "");
    };

    const changeActivePayMethod = (e) => {
        e.preventDefault();

        let current = e.currentTarget;

        if (current.dataset.payment === paymentMethod) return;

        const promiseFunction = new Promise((resolve) => {
            setPaymentMethodHTML("");

            document.querySelectorAll(".main-content--payment-options .checkbox").forEach((item) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".main-content--payment-options options").forEach((item) => {
                item.classList.remove("active");
            });
            resolve(current);
        });

        promiseFunction.then((current) => {
            current.classList.add("active");
            current.children[0].children[0].classList.add("active");
            setPaymentMethod(current.dataset.payment);
            if (current.dataset.payment === "bank") {
                if (document.querySelector("input[name='name']").value.length < 1 && document.querySelector("input[name='surname']").value.length < 1) {
                    setError("name", "empty", "Ovo polje ne mo??e biti prazno!");
                    setError("surname", "empty", "Ovo polje ne mo??e biti prazno!");
                    document.querySelector("input[name='name']").focus();
                    return;
                }
                fetchBankHTMLCode();
            }
        });
    };

    const onInputChange = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setBuyersCountryCustomInputValue(e.target.value);
    };

    const checkPromoCode = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (document.querySelector("input[name='friend_referral_code']").value.length < 1) {
            setError("friend_referral_code", "empty", "Molimo unesite promo kod!");
            return;
        }

        let url = `netapi/referral?referral_code=${document.querySelector("input[name='friend_referral_code']").value}`;

        dispatch(setIsLoading(true));
        axios.get(url).then((response) => {
            if (!response.data.response.status) setError("friend_referral_code", "notMatch", response.data.response.message);

            setReferralCodeResponse({
                status: response.data.response.status,
                message: response.data.response.message,
                value: document.querySelector("input[name='friend_referral_code']").value
            });

            dispatch(setIsLoading(false));
        });
    };

    const fetchBankHTMLCode = () => {
        dispatch(setIsLoading(true));

        const data = {
            name_surname: `${document.querySelector("input[name='name']").value} ${document.querySelector("input[name='surname']").value}`,
            country_code: localStorage.getItem("lang_code"),
            ip_address: userIP,
            promotion_id: currentPriceValues.variationProductId,
            plan_id: currentPriceValues.mainProductId,
            includeSC: true
        };

        axios
            .post("shoppayment/bank", { ...data })
            .then((response) => {
                dispatch(setIsLoading(false));
                setPaymentMethodHTML(response.data.response);
            })
            .catch((error) => {
                dispatch(setIsLoading(false));
            });
    };

    const setNewSelectedCardInfo = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setOpenCreditCardDropdown(false);
        if (e.currentTarget.dataset.id == 1) {
            setSelectedCreditCardInfo({
                credit_card_id: 1,
                credit_card_number: "Pla??anje putem kartice",
                primary_card: 0
            });
        } else {
            setSelectedCreditCardInfo(_.find(creditCardInfo, (item) => item.credit_card_id == e.currentTarget.dataset.id));
        }
    };

    const verifyEmail = (e) => {
        clearError("email");

        if (errors.email !== undefined) return;

        axios
            .get("netapi/check_email", {
                params: {
                    email: e.currentTarget.value
                }
            })
            .then((response) => {
                if (!response.data.success) {
                    setError("email", "manual", response.data.msg);
                } else {
                    clearError("email");
                }
            })
            .catch((error) => {});
    };

    const verifyContactPhoneNumber = (e) => {
        clearError("phone");

        if (errors.phone !== undefined || e.currentTarget.value.length < 5) return;

        let phoneNum;

        if (e.currentTarget.value.charAt(0) === "+") {
            phoneNum = e.currentTarget.value.slice(1);
        } else {
            phoneNum = e.currentTarget.value;
        }

        axios
            .get("netapi/check_phone_number", {
                params: {
                    phone: phoneNum
                }
            })
            .then((response) => {
                if (!response.data.success) {
                    setError("phone", "manual", response.data.msg);
                } else {
                    clearError("phone");
                }
            })
            .catch((error) => {});
    };

    return (
        <>
            <section className="payment-info">
                <div className="main-content">
                    <div className="main-content--form">
                        <form noValidate={true} onSubmit={handleSubmit(handleData)} className="form-group" autoComplete="1">
                            <div className="form-item-container">
                                <div className={`form-item-floating ${errors.name && "invalid"}`}>
                                    <InputComponent name="name" labelText="Ime" errorMessage={errors.name} register={register} required={{ required: "Ovo polje je obavezno" }} />
                                </div>

                                <div className={`form-item-floating ${errors.surname && "invalid"}`}>
                                    <InputComponent name="surname" labelText="Prezime" errorMessage={errors.surname} register={register} required={{ required: "Ovo polje je obavezno" }} />
                                </div>
                            </div>

                            <div className="form-item-container">
                                <div className={`form-item-floating ${errors.email && "invalid"}`}>
                                    <InputComponent
                                        name="email"
                                        onBlur={verifyEmail}
                                        labelText="Email"
                                        errorMessage={errors.email}
                                        register={register}
                                        required={{
                                            required: "Ovo polje je obavezno",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Molimo unesite valjanu e-mail adresu!"
                                            }
                                        }}
                                    />
                                </div>
                                <div className="form-item-floating">
                                    <span className="form-notice-text">Podatke o email-u i lozinki koje unese?? ovde koristi??e?? za pristup NetTV Plus uslugama</span>
                                </div>
                            </div>

                            <div className={`form-item-container ${!_.isEmpty(userHash) ? "hidden" : ""}`}>
                                <div className={`form-item-floating ${errors.password && "invalid"}`}>
                                    <InputComponent
                                        name="password"
                                        showPasswordIcon={true}
                                        type="password"
                                        tooltip="Lozinka mora da sadr??i najmanje 7 karaktera, minimum jedan broj i jedno veliko slovo."
                                        labelText="Lozinka"
                                        errorMessage={errors.password}
                                        register={register}
                                        required={{
                                            required: !_.isEmpty(userHash) ? false : "Ovo polje je obavezno",
                                            minLength: {
                                                value: 7,
                                                message: "Lozinka mora sadr??avati najmanje 7 znakova"
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*[0-9])/,
                                                message: "Lozinka mora sadr??avati barem jedno veliko slovo i jedan broj"
                                            }
                                        }}
                                    />
                                </div>
                                <div className={`form-item-floating ${errors.confirm_password && "invalid"}`}>
                                    <InputComponent
                                        name="confirm_password"
                                        type="password"
                                        showPasswordIcon={true}
                                        labelText="Ponovi lozinku:"
                                        errorMessage={errors.confirm_password}
                                        register={register}
                                        required={{
                                            required: !_.isEmpty(userHash) ? false : "Ovo polje je obavezno",
                                            minLength: {
                                                value: 7,
                                                message: "Lozinka mora sadr??avati najmanje 7 znakova"
                                            },
                                            validate: (value) => {
                                                return value === watch("password") || "Lozinke se ne podudaraju";
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {countriesList && (
                                <div className="form-item-container">
                                    <div className={`form-item-floating ${errors.phone && "invalid"} phone-type`}>
                                        <InputTypePhone
                                            onBlur={verifyContactPhoneNumber}
                                            countriesList={countriesList}
                                            buyersCountryCode={userOriginCountry ? userOriginCountry : null}
                                            returnInputValue={returnInputValue}
                                            predefinedValue={selfCarePhone}
                                            predefinedDialValue={selfCareDial}
                                            name="phone"
                                            errorMessage={errors.phone}
                                            register={register}
                                            required={{
                                                required: "Molimo unesite broj telefona",
                                                pattern: {
                                                    value: /^[\+\d]?(?:[\d-.\s()]*)$/,
                                                    message: "Molimo koristite samo brojeve"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {currentPriceValues.paymentType !== "plan_variation" ||
                            (currentPriceValues.headerValues.contractLength !== null && parseInt(currentPriceValues.headerValues.contractLength) > 0) ? (
                                <>
                                    <div className="group-title-holder">
                                        <h2 className="title">Adresa</h2>
                                    </div>

                                    <div className="form-item-container">
                                        <div className={`form-item-floating ${errors.address && "invalid"}`}>
                                            <InputComponent
                                                name="address"
                                                labelText="Ulica i broj"
                                                errorMessage={errors.address}
                                                register={register}
                                                required={{ required: "Ovo polje je obavezno" }}
                                            />
                                        </div>

                                        <div className={`form-item-floating ${errors.city && "invalid"}`}>
                                            <InputComponent name="city" labelText="Grad" errorMessage={errors.city} register={register} required={{ required: "Ovo polje je obavezno" }} />
                                        </div>
                                    </div>

                                    <div className="form-item-container">
                                        <div className={`form-item-floating ${errors.zip && "invalid"}`}>
                                            <InputComponent
                                                name="zip"
                                                labelText="Po??tanski broj"
                                                errorMessage={errors.zip}
                                                register={register}
                                                required={{
                                                    required: "Ovo polje je obavezno",
                                                    maxLength: {
                                                        value: 10,
                                                        message: "Ne mo??ete unijeti vi??e od 10 karaktera"
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className={`form-item-floating ${errors.state && "invalid"}`}>
                                            <InputComponent
                                                inputValue={buyersCountry ? buyersCountry : buyersCountryCustomInputValue}
                                                onEveryChange={onInputChange}
                                                disabled={buyersCountry && true}
                                                name="state"
                                                labelText="Dr??ava"
                                                errorMessage={errors.state}
                                                register={register}
                                                required={{ required: "Ovo polje je obavezno" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-item-container single">
                                        <div className={`form-item-floating`}>
                                            <label htmlFor="comment">Napomena (opciono)</label>
                                            <textarea className={`no-resize`} ref={register({ required: false })} name="comment" required />
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            <div className="group-title-holder">
                                <h2 className="title">Ima?? promo kod? Unesi ga ovde.</h2>
                            </div>

                            <div className="form-item-container promo">
                                <div className={`form-item-floating ${errors.friend_referral_code && "invalid"}`}>
                                    <InputComponent
                                        name="friend_referral_code"
                                        labelText="Unesi kod"
                                        errorMessage={errors.friend_referral_code}
                                        required={{
                                            required: false
                                        }}
                                    />
                                </div>
                                <Button customClass="promo-code-button" title="Potvrdi" clicked={(e) => checkPromoCode(e)} />
                            </div>

                            <div className="group-title-holder">
                                <h2 className="title">Podaci o pla??anju</h2>
                            </div>

                            <div className="main-content--payment-options">
                                <div className="options cards active" data-payment="cards" onClick={(e) => changeActivePayMethod(e)}>
                                    <div className="text-holder">
                                        <div className={`checkbox active`}>
                                            <span className="filled"></span>
                                        </div>
                                        {creditCardInfo.length > 0 ? (
                                            <div className="credit-card-select">
                                                <div className="credit-card-select--selected" onClick={() => setOpenCreditCardDropdown(!openCreditCardDropdown)}>
                                                    {_.isEmpty(selectedCreditCardInfo) ? (
                                                        creditCardInfo.map((item, index) => {
                                                            if (item.primary_card === 1) {
                                                                return (
                                                                    <span key={index} data-id={item.credit_card_id}>
                                                                        {item.credit_card_number}
                                                                    </span>
                                                                );
                                                            }
                                                        })
                                                    ) : (
                                                        <span data-id={selectedCreditCardInfo.credit_card_id}>{selectedCreditCardInfo.credit_card_number}</span>
                                                    )}
                                                </div>
                                                <div className={`credit-card-select--dropdown ${openCreditCardDropdown ? "opened" : ""}`}>
                                                    <ul>
                                                        {creditCardInfo.map((item, index) => (
                                                            <li key={index} data-id={item.credit_card_id} onClick={(e) => setNewSelectedCardInfo(e)}>
                                                                {item.credit_card_number}
                                                            </li>
                                                        ))}
                                                        <li data-id="1" onClick={(e) => setNewSelectedCardInfo(e)}>
                                                            Pla??anje putem kartice
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="name">Pla??anje putem kartice</span>
                                        )}
                                    </div>
                                    <div className="cards-holder">
                                        <img
                                            src="data:image/png;base64,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"
                                            alt="visa"
                                        ></img>
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAAAsSAAALEgHS3X78AAAMv0lEQVR4nO2dzY7jxhHHmz3jXSuOsTKciREHkSY+6OAAXiWBkQQ5rHzzzdpDzpaOOUV+As8+gbVPIO0TZPboUzQPEEB7CeABEksTIIEjGJmBY8j2zpBBaYve3mZTYpMsfrTqBxAz6iYpdvdfVf3Fbi8IAsEweSM5RxkKWFgMCSwshgQWFkMCC4shgYXFkMDCYkhgYTEksLAYElhYDAksLIYEFhZDAguLIYGFxZDAwmJIYGExJLCwGBJYWAwJLCyGBBYWQwILiyGBhcWQwMJiSDisU7auWp2mEKIrhAj/buNSCDGHv0cX5/Mt5xXOetI+FkKoxzZmENcYLmdbzqkclX5hddXqgHh6eMD/7chJyTlDoUEBzY4uzi+LSsd60u5p6bgTOSkZSzUNjeGyUj8YlcoJa9XqQOYPhBD9DAWQhMdCiFM48hbZetJu4vPD8UHkhPxYYhqmVRNZJYSFLm6EgspildLyCArn6OI8k7tBF3dSwI/CBIhsjCIrzBrHUaqwVq1OmQVhAtzlia3A0NVBOu5FIovnCgU2LlNgpQhLsVCjighKBwQ22lXpRws1JnZ3aSlVYIULa9Xq9DHBZbg8Wx6iBYsUzHrSBgv1ceVT8MxFjhrD5WkkhpDChIVWalrRX/c2oGAGoXtcT9pdTMfdLddUEWisDIqyXoUIC7sNTmtipeJ48MMH30KhfBITXwfgR9IvogVJLqxVqwMtvUkkombIo0A0/vBUeG84sVDdsDFcTiOhOUIqrFWrAw//YSSiZhz8JBAv/cLfPLT8qS/kW37dkwQ8bAyXo0hoTpAJyxVRHXZ8cdh6MY/kG76QHSfE9agxXA4ioTlAIixXRPXS2744eNOcPyyu7eQ+u8ElSxUnKsD/Qgr/3InJIR+uJ+3c61u55syq1Rm5UqfS3Z+JjbgunBFXrvWt3Fwhdnz+ORJRM+Rrgbj1azsXd/D2jfBed6K1eD+vjtRchIVjfvOKDs8kxntZiFu/vRGe7Sy1QyEO3rkR3iu1FxcMA3Ubw+UiEmNJXnZ8WndRAdClYC0q4FoI/zMnXOId7MjOTObcWLU6VRnVz8ThW8HGDaYl+Npzpb51F8dBM5HJFe69CzRw8Ct2iSIHizXeaxdowP+7My5xHAm1IHUu4BTius1UiADuL4sL1AmuPBF84UXCa8gHOIExXb5GQpKT2Q9XAahb5Y0jdS2RpYxT5QBaq9pX2PO2ViHBN85YrXtprVbanxbZqHiRUFirEIesVqqytm4VYkvw80hEzfBeDcTt39AOIm86Te840SP/c9sWYpqfFck0i6I5/Bl9gTviDkWaMt9bYckf0wsLBqmhV94BaIWFc9frPG99A0wzzqvfahfBl05YrTa+RJIYW4vVj4TUEIqWYBzQr+UIVmVvK6zUHWZV4uCoOGH5XzrTOrQqe9tU177vCsYFvUYkmI7rZwPUDmBV9omFhZ2itQe6GYomuHTDHdp0ltpYLKvKW1WRr5bwYF9HQupKYg3YCGvXynO1oMiKewgM8ThCYg3sncUqY3FMR+pYgspiOYEsoY7lSCepFTbCqn2LsFS+dSIViTWwXxarxDWiHapnJWKvhFWKG9xTeAMBhgQWFkPCXgkrWO9XPadM9ktY30SCCsN7eb/qdzbCehIJYZJz24m8SqwBG2GVvttBHgTr+qehRBJrwEZYld0QyIYy+pMceaECSPxCxd5ZLP+rSBA5DtWvSIRVq/3y4gi+KqFl+EokpK4k1sDeuUL/f5EgcrymMxYrsQYSCwv3k6l9yxAsVlDkbIND4cJKf8ATm+1SbPuxnHCH/n+Kc4cOVdytyt5WWIXuIEWF/9/ihCVfd2IteGFb9lbCwh2wriIRNeNmVaDFcmM15Svbzc7TDOnU32pdC3HzL3pxbURV4hywHLEu8zTCyrSEYFW4+Te9sGBbFEewLnNrYeF2trVvHUI9i3J4BzpFHXGDZ2n2N0w7u8EJq3X9D7rJHd6WfXhqRqp9dlIvx71qdRYurDxz+/c3+b9yfyjE4bvXLtSvlo3hMtX7pHu/uC2F1ZIt35VKe+oyzrqBwLyGm25HyNNqQd3q4N2bSHgNgbpVKctxC1cWuX36t/ysliObY4qsHilTjmKH6cNIRM2AFmIe/VrQCnRkCOehbYeoTh41gRNc7a3WFfmn51LI1zK4RNharuOEC1yG1kpfHtKm2yGzD8BZD/Vf8PY6m0uEzTAdqbD3lVkMobBmtl1MuVQu0CV+FImoGeASn6bY51m2fVdc4FCzSjP8PLKtT+e6i/0+7F6vw7vZm8lVWMKhLgjYF3rXIm0wgQ/2J3SAx43hMtcVsSnGNHoujCV+90QKf8v8+I2o3nFCVE8o6si5Cwsr8/UX17UQ3/3VLK7vRVX/yjqUUc9mynFSSEZhFXGdRSLrBIpL7eOCOpUjonpEJSpBUcfScaVCf9jxxa3f3Qj5lhMVdegAJR01IV8U5OjiHPz3MBJRM27+KT/13gw+rXkyrrBLgXworpDVZo4uzsFq/bKm9a5NYfzos/P3f/DHxftCiPs1nfcf1qdSza+yhdwV6qxaHRgu+DgSUU2gjjg4ujh/4dXy9aTdxAlwddhsHX4E48ZwWeg0p8KFJZ7v0jqt8ErMMF42Oro43/oSAW4BMq5wv91jSIft7qh5UIqwQnB/npMKCWzz6z66OLf6da8n7QGmoyoD8WBpT7LOUMhCqcIKQYGNSnQtmxF9rAumZj1p9zEdZf1QHqHbK32djUoIKwRdZB97gqndyxW+LzfGN49yYz1pF5mOM6xWnFL1SaWhUsJSUUTWw+kbebiZM5wCMsMZGeSgyHrKkTUdT3DVl1nVxKRSWWHpoNCOlZ0+d83HnuNicfB3kbdVSgu2KLuYFjiaWzY/CsUPle9FmXUmW2ojLKZe8AYCDAksLIYEFhZDghvT/5lckFKGDYpL3/czNXbYYjEq0O/2lzwWfdlbYUkpZ1LKQErpxBoUVYMtFkNC7nUsKaXa4bfwfX+hxXexUzCRH5dShh2hc9/3d/YyK/UEkUddQbmv1XMr14jM9ZUU361e5/u+sWPVNm+tgA7SLIfneT3P8wI8Bp7nXSqf4Zh6ntfE8xZaHHzu6t+P50+1c8N7jfH/mXaN6f4BPg9c08Tz9Hj9ONHuOzLcFz73Dc8dxuvXTA1pW2j3g7DjpN+tfO4p588wbKz8v7nG8P2J8zbNkbew4g5TgasFf6zcr2sQp+mYKdcca/Fz7R7ff4fhPrHCUjI67hjECEs/+gnTpgrAVPimwyQs/RinzduqCOsSrVYXf1V6IkZK3FwJHyv3m2vXnEJhG8JVYZ0o399Vwo8xbqA9b0+530mCdM3D+2rXBtqPQk9rTyt49Qc2w3wYKfcbKZZKt1JjFJuep3HCmippbabN26oIq6fFDUyWwGBlZhimmvhL3U1q9zMJKyywY9OzaveamZ7LYK0uw4KJefaRQVhTw/36O+JVgRrdaPDclc1Nea6kaW64f6q8TXvk2io0VBJfWGBCO9c0XVYd5R/pFVXf96cx7yqq94ZJdp9jV8JcSjnGCr0t4bNApXYE3RLhgf094QsVplkWpinNL6RNjwzzAyvc4dSape/7A+28S9P1tt9vkbepIO15h4eXMrV241o/M32GJghaSgkLwP1JO/cuHgMosBgx76K94+WPZiRk+96OZztaYOr9jM+L6Y2EW5A4b9NS5SEdU4HFhvu+P0JrEk4MbKJluYNHP0OP8oNIyHOMhb+FXQWnis6YVuzSyULc9XHh1lRNWOov6UR3M5ihkQUsMLyJFuk0dAUotAUKKy7TunC9wYosFBFAP4/JvaRKm5QSXJFR5Gjll2gp76Kl1S1MmhdOU+VtWirV846FF77Uek9KeRp2Mkop+2iq70QufJZRUK+aSinB7fWw82+snB9nWeAFjhled4rfIzTrtrkvPkcTz13YDAdh2pb48ROsr8G9jvH/RZhW7btn4TOF5+5wzUYy5G068mwVxsRHWi+GOLWFl6Yfa9f5plbSwHDepgme4Bz1MHU3RNKaMG1z5dws/VhxLd00eTvA+0Y6srcdlRsrRLN/jK8y6TyKWaX5GJeqVFs1V/h56Pt+ZE45toIeaq/LP1ZbmHjOfcXSqMC937NpEGDa4lbhWaqWCluDHxm+Gz6/F7k6+ffb5m0XqwRWC7NVfs67Mp4VGXcs+Dm6Sj0t89iaNqa6dQww7VhhgmfYmbfYVQOimtqkmV+mYEjgaTMMCSwshgQWFkMCC4shgYXFkMDCYkhgYTEksLAYElhYDAksLIYEFhZDAguLIYGFxZDAwmJIYGExJLCwGBJYWAwJLCyGBBYWQwILiyGBhcWQwMJiSGBhMfkjhPg/O0PvF0qCSZgAAAAASUVORK5CYII="
                                            alt="master"
                                        ></img>
                                    </div>
                                </div>
                                <div className={`options bank-payment ${paymentMethodHTML !== null ? "has-content" : ""}`} data-payment="bank" onClick={(e) => changeActivePayMethod(e)}>
                                    <div className="text-holder">
                                        <div className={`checkbox`}>
                                            <span className="filled"></span>
                                        </div>
                                        <span className="name">Pla??anje putem bankovnog ra??una</span>
                                    </div>
                                    {paymentMethodHTML !== false ? (
                                        <CSSTransition
                                            in={Boolean(paymentMethod === "bank") && Boolean(paymentMethodHTML)}
                                            timeout={1000}
                                            classNames={{
                                                enterActive: "animate__fadeIn",
                                                exitActive: "animate__fadeOut"
                                            }}
                                            unmountOnExit
                                        >
                                            <div className="payment-description animate__animated" dangerouslySetInnerHTML={{ __html: paymentMethodHTML }}></div>
                                        </CSSTransition>
                                    ) : (
                                        <div className="payment-description error animate__animated animate__fadeIn">
                                            <h4>Do??lo je do pogre??ke</h4>
                                            <p>Molimo kontaktirajte administratora!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="main-content--terms-of-use">
                                <fieldset id="group1">
                                    <span className="form-item">
                                        <input
                                            type="checkbox"
                                            value="I Agree"
                                            id="terms1"
                                            name="terms1Question"
                                            required
                                            className={`${errors.terms1Question ? "invalid" : ""}`}
                                            error={errors.terms1Question && errors.terms1Question.message}
                                            ref={register({
                                                required: "Ovo polje je obavezno"
                                            })}
                                        />
                                        <label htmlFor="terms1">
                                            Saglasan sam da mi se odmah po obavljenoj kupovini omogu??i pristup NetTV Plus usluzi i potvr??ujem da sam svestan da time gubim pravo na odustanak od
                                            kupovine u zakonom predvi??enom roku.
                                        </label>
                                        {errors.terms1Question && <span name="terms2Question" error={errors.terms1Question && errors.terms1Question.message} />}
                                    </span>

                                    <span className="form-item">
                                        <input
                                            type="checkbox"
                                            value="I Agree"
                                            id="terms2"
                                            name="terms2Question"
                                            required
                                            className={`${errors.terms2Question ? "invalid" : ""}`}
                                            error={errors.terms2Question && errors.terms2Question.message}
                                            ref={register({
                                                required: "Ovo polje je obavezno"
                                            })}
                                        />
                                        <label htmlFor="terms2">
                                            Potvr??ujem da sam pro??itao{" "}
                                            <a target="_blank" href={homeUrl + 'uslovi-koriscenja'}>
                                                Uslove kori????enja
                                            </a>{" "}
                                            i{" "}
                                            <a target="_blank" href={homeUrl + 'politika-privatnosti'}>
                                                Politiku privatnosti
                                            </a>{" "}
                                            i saglasan sam sa njihovim uslovima.
                                        </label>
                                        {errors.terms2Question && <span name="terms2Question" error={errors.terms2Question && errors.terms2Question.message} />}
                                    </span>
                                </fieldset>
                            </div>

                            <div className="main-content--actions-box">
                                <Button clicked={(e) => goToPreviousStep(e)} customClass="button-back" isLoading={isButtonDisabled}>
                                    <SvgIcon icon="icon-arrow-left-1" />
                                    <span className="button-name">Nazad</span>
                                </Button>

                                <Button type="submit" title="Potvrdi" customClass="button-next" isLoading={isButtonDisabled} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {checkoutRedirectArray && (
                <form ref={checkoutRef} method="POST" action={redirectUrl && redirectUrl} target="_blank">
                    {checkoutRedirectArray.map((item) => (
                        <input type="hidden" name={item.item} value={item.value} key={Math.random()} readOnly />
                    ))}
                </form>
            )}

            {(bankCheckoutResponse.success || bankCheckoutResponse.error) && (
                <CSSTransition in={bankCheckoutResponse.success || bankCheckoutResponse.error} timeout={500} classNames="slide-in" unmountOnExit>
                    <Popup
                        class="checkout-message"
                        closePopup={(e) => {
                            if (bankCheckoutResponse.error) {
                                setBankCheckoutResponse({
                                    success: false,
                                    error: "",
                                    response: {}
                                });
                            } else {
                                setBankCheckoutResponse({
                                    success: false,
                                    error: "",
                                    response: {}
                                });
                                window.location = homeUrl + "paketi";
                            }
                        }}
                    >
                        {bankCheckoutResponse.error ? (
                            <div>
                                <h2>Gre??ka!</h2>
                                <p>{bankCheckoutResponse.error}</p>
                            </div>
                        ) : (
                            <div className="checkout-message--content">
                                <div className="checkout-message--title" dangerouslySetInnerHTML={{ __html: bankCheckoutResponse.response.title }}></div>
                                <div className="checkout-message--paragraph" dangerouslySetInnerHTML={{ __html: bankCheckoutResponse.response.content }}></div>
                            </div>
                        )}
                    </Popup>
                </CSSTransition>
            )}

            <Dialog
                title={bundleError.title}
                message={bundleError.message}
                isShowing={bundleError.isDialogOpen}
                okCallback={() => {
                    location.reload();
                }}
            />
        </>
    );
};

export default BundlePayout;
