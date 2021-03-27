/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Tooltip from "../tooltip/tooltip.component";
import SvgIcon from "../svg-icon/svg-icon.component";

import "./input.scss";

const InputComponent = ({ onBlur, type, name, inputClass, required, errorMessage, register, labelText, onEveryChange, inputValue, tooltip, disabled, showPasswordIcon, showIcon, ref }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <label htmlFor={name ? name : null} className={`floating-label ${tooltip ? "flexed" : ""}`}>
                {labelText} {tooltip && <Tooltip title={tooltip} styles="custom-tooltip" />}
            </label>
            <input
                type={showPassword ? "text" : type ? type : "text"}
                disabled={disabled}
                required
                name={name ? name : null}
                autoComplete="0"
                className={`${inputClass ? inputClass : "input-default"} ${errorMessage && "invalid"}`}
                error={errorMessage ? errorMessage.message : null}
                value={inputValue && inputValue.toString()}
                ref={register ? register({ ...required }) : null}
                onChange={(e) => (onEveryChange ? onEveryChange(e) : null)}
                onBlur={(e) => (onBlur ? onBlur(e) : null)}
            />

            {showIcon && (
                <span onClick={(e) => setShowPassword(!showPassword)}>
                    <SvgIcon icon={showIcon} />
                </span>
            )}

            {showPasswordIcon && (
                <span onClick={(e) => setShowPassword(!showPassword)}>
                    <SvgIcon
                        iconclass="password"
                        pureSvg={`<svg  viewBox="0 0 30 30" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><defs>
                            <path d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z" id="outline"></path>
                            <mask id="mask">
                                <rect width="100%" height="100%" ></rect>
                                <use xlink:href="#outline" id="lid"/>
                            </mask>
                            </defs>
                            <g id="eye">
                            <path d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z M14.9348958,22.081464 C11.2690863,22.081464 8.29688487,18.9510766 8.29688487,15.089434 C8.29688487,11.2277914 11.2690863,8.09740397 14.9348958,8.09740397 C18.6007053,8.09740397 21.5725924,11.2277914 21.5725924,15.089434 C21.5725924,18.9510766 18.6007053,22.081464 14.9348958,22.081464 L14.9348958,22.081464 Z M18.2535869,15.089434 C18.2535869,17.0200844 16.7673289,18.5857907 14.9348958,18.5857907 C13.1018339,18.5857907 11.6162048,17.0200844 11.6162048,15.089434 C11.6162048,13.1587835 13.1018339,11.593419 14.9348958,11.593419 C15.9253152,11.593419 14.3271242,14.3639878 14.9348958,15.089434 C15.451486,15.7055336 18.2535869,14.2027016 18.2535869,15.089434 L18.2535869,15.089434 Z" ></path>
                            <use xlink:href="#outline" mask="url(#mask)" />
                            </g>
                            </svg>`}
                    />
                </span>
            )}
            {errorMessage && <span name={name ? name : null} error={errorMessage && errorMessage.message} />}
        </>
    );
};

export default InputComponent;
