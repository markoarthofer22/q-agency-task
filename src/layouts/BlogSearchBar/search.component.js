import React, { useState, useEffect, useContext, useCallback } from "react";
import { debounce } from "lodash";

//components
import InputComponent from "../../components/input/input.component";
import SvgIcon from "../../components/svg-icon/svg-icon.component";

//hooks
import { useForm } from "react-hook-form";

// styles
import "./styles.scss";

// context
import { ContextApp } from "../../contextStore/context";

const BlogSearchBar = ({ customClass, returnSearchParams, inputLabel, inputName, inputValidatorObj, ctaText, returnCtaAction }) => {
    const [searchValue, setSearchValue] = useState("");

    // state
    const [componentName] = useState("BlogSearchBar");
    const { appState } = useContext(ContextApp);

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit"
    });

    //handle all data from inputs
    const handleData = (_data, e) => {
        e.preventDefault();
    };

    // LISTEN TO ALL EVENTS
    //debounce state so there is no flick
    const delayInputChange = useCallback(
        debounce((_inputValue) => {
            if (_inputValue.length === 0 || _inputValue.length >= 3) {
                setSearchValue(_inputValue);
            }
        }, 500),
        []
    );

    const changeInput = (e) => {
        const inputValue = e.currentTarget.value;
        delayInputChange(inputValue);
    };

    useEffect(() => {
        // return value to parent component
        returnSearchParams(searchValue);
    }, [searchValue]);

    return (
        <section className={`blog-search-bar ${customClass ? customClass : ""}`}>
            <div className="blog-search-bar--input-holder">
                <form noValidate={true} onSubmit={handleSubmit(handleData)} className="form-group" autoComplete="1">
                    <InputComponent
                        onEveryChange={changeInput}
                        name={`${inputName ? inputName : "search"}`}
                        labelText={`${inputLabel ? inputLabel : "Search..."} `}
                        errorMessage={inputName ? errors[inputName] : errors.search}
                        register={register}
                        required={inputValidatorObj}
                        showIcon="blog-search"
                    />
                </form>
            </div>
            {returnCtaAction && (
                <div className="blog-search-bar--cta" onClick={() => returnCtaAction()}>
                    {ctaText && <span className="blog-search-bar--cta--text">{ctaText}</span>}
                    <SvgIcon icon="add-blog" />
                </div>
            )}
        </section>
    );
};

export default BlogSearchBar;
