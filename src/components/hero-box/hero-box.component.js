import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// styles
import "./styles.scss";

// Context
import { ContextApp } from "../../contextStore/context";

const HeroBox = (props) => {
    const { heroClass, bgImage, title, subtitle } = props;
    const [componentName] = useState("HeroBox");
    const { appState } = useContext(ContextApp);

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <section className={`hero-box ${heroClass ? heroClass : ""}`}>
            {bgImage && (
                <div
                    className="hero-box--helper-img"
                    style={{
                        backgroundImage: "url('" + bgImage + "')"
                    }}
                ></div>
            )}
            {(title || subtitle) && (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-8">
                            {title && <h1 className="hero-box--title">{title}</h1>}
                            {subtitle && <h1 className="hero-box--subtitle">{subtitle}</h1>}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

HeroBox.propTypes = {
    heroClass: PropTypes.string,
    bgImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default HeroBox;
