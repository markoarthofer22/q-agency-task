import React, { useState, useEffect } from "react";
import _ from "underscore";
import "./dropdown.scss";

const DropdownPure = props => {
    const [isOpen, setOpen] = useState();
    const [selectedTitle, setSelectedTitle] = useState(props.title);

    useEffect(() => {
        checkIfSelected();
    }, []);

    function checkIfSelected() {
        _.find(data, item => {
            if (item.selected) {
                setSelectedTitle(item.name);
            }
        });
    }

    function toggleDropdown() {
        setOpen(!isOpen);
    }

    function selectItem(e, name, id) {
        e.stopPropagation();
        setOpen(false);
        setSelectedTitle(name);
    }

    const { data, dropdownClass, placeholder, label } = props;

    return (
        <div className={`dropdown-pure ${dropdownClass}`}>
            <label className="dropdown-label">{label}</label>
            <div
                className={`dropdown-header ${isOpen ? "open" : ""} `}
                onClick={() => {
                    toggleDropdown();
                }}
            >
                {selectedTitle ? (
                    <div className="title">{selectedTitle ? selectedTitle : ""}</div>
                ) : (
                    <div className="placeholder">{placeholder ? placeholder : ""}</div>
                )}
                <svg className={`icon-ios-arrow-down ${isOpen ? "open" : ""} `}>
                    <use xlinkHref="/icons.svg#icon-ios-arrow-down" />
                </svg>
            </div>
            <div className={`dropdown-list ${isOpen ? "open" : ""}`}>
                {data.map(item => {
                    return (
                        <li
                            className="dropdown-item"
                            key={item.id}
                            onClick={e => {
                                selectItem(e, item.name, item.id);
                            }}
                        >
                            {item.name}
                        </li>
                    );
                })}
            </div>
        </div>
    );
};

export default DropdownPure;
