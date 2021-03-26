import React, { useState, useEffect } from "react";
//component

// styles
import "./herobox.scss";

const HeroBox = (props) => {
    const { heroClass, bgImage, title, subtitle } = props;

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

export default HeroBox;
