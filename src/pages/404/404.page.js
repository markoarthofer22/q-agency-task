import React, { useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { NavLink } from "react-router-dom";
//styles
import "./styles.scss";

//assets
import bgImage from "../../assets/img/blog-bg.png";
import emoji from "../../assets/img/emoji.png";

// components
import Button from "../../components/buttons/button.component";

// context
import { Context } from "../../contextStore/context";
import { setIsLoading } from "../../contextStore/globals/globalState.actions";

// hoc
import clgComponentName from "../../components/hoc/consoleComponentName";

const NoPage = () => {
    // globalState
    const { globalDispatch } = useContext(Context);

    useEffect(() => {
        globalDispatch(setIsLoading(false));
    }, []);

    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
                <title>Q Agency | 404 page</title>
            </Helmet>

            <section
                className="no-page"
                style={{
                    backgroundImage: "url('" + bgImage + "')"
                }}
            >
                <div className="no-page-content">
                    <div className="notfound-404">
                        <h2>
                            4
                            <span
                                style={{
                                    backgroundImage: "url('" + emoji + "')"
                                }}
                            ></span>
                            4
                        </h2>
                    </div>
                    <h3>
                        <span>Oops!</span> We broke <span>something</span>...
                    </h3>
                    <p>
                        Sorry but the page you are looking for doesn't exist, it has been removed or <br /> it is temporarily unavailable
                    </p>

                    <NavLink to="/">
                        <Button title="Back to homepage" customClass="no-page--cta" />
                    </NavLink>
                </div>
            </section>
        </>
    );
};

export default clgComponentName(NoPage, "NoPage");
