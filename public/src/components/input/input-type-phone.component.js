import React, { useState, useEffect } from "react";
import Select from "../select/select.component";
import "./input-phone.scss";
import _ from "underscore";

const InputTypePhone = ({
    id,
    onBlur,
    copiedCountryIso,
    buyersCountryCode,
    copiedPhoneValue,
    predefinedDialValue,
    predefinedValue,
    returnInputValue,
    register,
    required,
    name,
    errorMessage,
    countriesList,
    disableFocus
}) => {
    const [countriesID, setCountriesID] = useState();
    const [countriesName, setCountriesName] = useState();
    const [countriesDial, setCountriesDial] = useState();
    const [inputValue, setInputValue] = useState("");

    const returnValueFromSelect = (name, value, valueNumber) => {
        setCountriesName(name);
        setCountriesID(value);
        setCountriesDial(valueNumber);
    };

    const checkForCountryPhone = (countryID) => {
        if (countryID === undefined && countriesDial === undefined) {
            return;
        }

        if (countryID && countriesDial === undefined) {
            let country = _.find(countriesList, (item) => item.iso == countryID.toUpperCase());

            if(country === undefined) return;
 
            setInputValue(`+${country.dialing_code}`);
            setCountriesName(country.country);
            setCountriesID(country.iso.toLowerCase());
            setCountriesDial(country.dialing_code);
            return;
        }

        setInputValue(`+${countriesDial}`);
    };

    const copyCountryValues = (countryID) => {
        let country = _.find(countriesList, (item) => item.iso == countryID.toUpperCase());
        setInputValue(`+${country.dialing_code}${copiedPhoneValue ? copiedPhoneValue : ""}`);
        setCountriesName(country.country);
        setCountriesID(country.iso.toLowerCase());
        setCountriesDial(country.dialing_code);
    };

    useEffect(() => {
        if (buyersCountryCode) {
            setCountriesID(buyersCountryCode);
        }
    }, [buyersCountryCode]);

    useEffect(() => {
        if (copiedCountryIso) {
            setCountriesID(copiedCountryIso);
        }
    }, [copiedCountryIso]);

    useEffect(() => {
        if (predefinedValue && predefinedDialValue) {
            let country = _.find(countriesList, (item) => item.dialing_code == predefinedDialValue);
            setCountriesID(country.iso);
            setCountriesName(country.country);
            setCountriesDial(country.dialing_code);
            setInputValue(predefinedValue);
        }
    }, [predefinedValue, predefinedDialValue]);

    useEffect(() => {
        if (predefinedValue && predefinedDialValue) return;

        if (copiedPhoneValue && countriesID) {
            copyCountryValues(countriesID);
        } else {
            checkForCountryPhone(countriesID);
        }
    }, [countriesID, copiedPhoneValue]);

    useEffect(() => {}, [countriesID, copiedPhoneValue]);

    useEffect(() => {
        if (inputValue) {
            if (!disableFocus) {
                document.getElementById(`${id ? id : "countries"}`).focus();
            }
            if (returnInputValue) {
                returnInputValue(countriesID, countriesDial, countriesName);
            }
        }
    }, [inputValue]);

    const setInput = (e) => {
        if (countriesDial) {
            let stringLength = String(countriesDial).length + 1;

            if (e.target.value.substring(1, stringLength) === String(countriesDial)) {
                setInputValue(e.target.value);
            } else {
                setInputValue(`+${countriesDial}`);
            }
        } else {
            setInputValue(e.target.value);
        }
    };

    return (
        <>
            <label htmlFor={name} className="floating-name">
                Broj telefona
            </label>
            <div className="form-item-phone">
                <Select
                    title={countriesName ? countriesName : null}
                    data={countriesList}
                    placeholder="Odaberi državu"
                    selectClass={`select-countries ${Boolean(predefinedValue) ? "disabled" : ""}`}
                    returnValue={returnValueFromSelect}
                    isSearchable
                />
                <div className="countries-input-holder">
                    <input
                        disabled={Boolean(predefinedValue)}
                        type="text"
                        className={errorMessage && "invalid"}
                        error={errorMessage && errorMessage.message}
                        id={`${id ? id : "countries"}`}
                        required
                        name={name}
                        autoComplete="off"
                        ref={register ? register({ ...required }) : null}
                        value={inputValue}
                        onChange={(e) => setInput(e)}
                        onBlur={(e) => (onBlur ? onBlur(e) : null)}
                    />
                    <span name={name} error={errorMessage && errorMessage.message} />
                </div>
            </div>
        </>
    );
};

export default InputTypePhone;
