import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

//components
import InputComponent from '../../components/input/input.component';
import SvgIcon from '../../components/svg-icon/svg-icon.component';

//hooks
import { useForm } from 'react-hook-form';

// styles
import './styles.scss';

// hoc
import clgComponentName from '../../components/hoc/consoleComponentName';

interface iProps {
    customClass?: string;
    returnSearchParams: (_searchText: string) => void;
    inputLabel?: string;
    inputName?: string;
    inputValidatorObj: iSearchBarValidatorObj;
    ctaText?: string;
    returnCtaAction: () => void;
}

export interface iSearchBarValidatorObj {
    required: boolean;
    k: iKeyObjectValidator;
}

interface iKeyObjectValidator {
    value: string | number;
    message: string;
}

const BlogSearchBar: React.FC<iProps> = ({
    customClass,
    returnSearchParams,
    inputLabel,
    inputName,
    inputValidatorObj,
    ctaText,
    returnCtaAction,
}): JSX.Element => {
    const [searchValue, setSearchValue] = useState<string>('');

    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
    });

    //handle all data from inputs
    const handleData = (_data: any, e: any): void => {
        e.preventDefault();
    };

    // LISTEN TO ALL EVENTS
    //debounce state so there is no flick
    const delayInputChange = useCallback(
        debounce((_inputValue: string) => {
            if (_inputValue.length === 0 || _inputValue.length >= 3) {
                setSearchValue(_inputValue);
            }
        }, 500),
        []
    );

    const changeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        delayInputChange(inputValue);
    };

    useEffect(() => {
        // return value to parent component
        returnSearchParams(searchValue);
    }, [searchValue]);

    return (
        <section
            className={`blog-search-bar ${customClass ? customClass : ''}`}
        >
            <div className="blog-search-bar--input-holder">
                <form
                    noValidate={true}
                    onSubmit={handleSubmit(handleData)}
                    className="form-group"
                    autoComplete="1"
                >
                    <InputComponent
                        onEveryChange={changeInput}
                        name={`${inputName ? inputName : 'search'}`}
                        labelText={`${inputLabel ? inputLabel : 'Search...'} `}
                        errorMessage={
                            inputName ? errors[inputName] : errors.search
                        }
                        register={register}
                        required={inputValidatorObj}
                        showIcon="blog-search"
                    />
                </form>
            </div>
            {returnCtaAction && (
                <div
                    className="blog-search-bar--cta"
                    onClick={() => returnCtaAction()}
                >
                    {ctaText && (
                        <span className="blog-search-bar--cta--text">
                            {ctaText}
                        </span>
                    )}
                    <SvgIcon icon="add-blog" />
                </div>
            )}
        </section>
    );
};

export default clgComponentName(BlogSearchBar, 'BlogSearchBar');
