import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

//redux
import { useSelector } from "react-redux";
import { selectAllCountryIDs, headerType } from "./redux/globals/globals.selectors";
import _ from "underscore";
//Global scss
import "./css/App.scss";
//Components
import Header from "./components/header/header.component";
import GlobalLoader from "./components/loaders/global.loader.component";
//helmet
import Helmet from "react-helmet";
import Routes from "./routes/Routes";

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export default function App(props) {
    const allowedMarket = useSelector(selectAllCountryIDs);
    const headerProps = useSelector(headerType);
    const selected_lang_cookie = getCookie("selected_language");
    const [userIpID, setUserIpID] = useState("");
    const queryString = require("query-string");
    const history = useHistory();
    let queryParams = queryString.parse(history.location.search);

    useEffect(() => {
        if (selected_lang_cookie === null) {
            if (queryParams.lang_code && queryParams.lang_code !== "") {
                setUserIpID(_.findWhere(allowedMarket, { countryCode: queryParams.lang_code }) ? _.findWhere(allowedMarket, { countryCode: queryParams.lang_code }) : { countryCode: "other" });
            } else if (queryParams.country_code && queryParams.country_code !== "") {
                setUserIpID(_.findWhere(allowedMarket, { countryCode: queryParams.country_code }) ? _.findWhere(allowedMarket, { countryCode: queryParams.country_code }) : { countryCode: "other" });
            } else {
                setUserIpID({ countryCode: "other" });
            }
        } else {
            if (queryParams.lang_code && queryParams.lang_code !== "") {
                setUserIpID(_.findWhere(allowedMarket, { countryCode: queryParams.lang_code }) ? _.findWhere(allowedMarket, { countryCode: queryParams.lang_code }) : { countryCode: "other" });
            } else if (queryParams.country_code && queryParams.country_code !== "") {
                setUserIpID(_.findWhere(allowedMarket, { countryCode: queryParams.country_code }) ? _.findWhere(allowedMarket, { countryCode: queryParams.country_code }) : { countryCode: "other" });
            } else {
                const selectedCustomerCountryID = selected_lang_cookie.toLowerCase();
                setUserIpID(_.findWhere(allowedMarket, { countryCode: selectedCustomerCountryID }) ? _.findWhere(allowedMarket, { countryCode: selectedCustomerCountryID }) : { countryCode: "other" });
            }
        }
    }, [history.location, selected_lang_cookie]);

    useEffect(() => {
        if (localStorage.getItem("lang_code") === undefined) return;
        localStorage.setItem("lang_code", userIpID.countryCode);
    }, [userIpID]);

    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
            </Helmet>

            <div className="wrapper">
                <>
                    <Header type={headerProps} />

                    <Switch>
                        {Routes[0].routes.map((routes, index) => (
                            <Route key={index} path={routes.path} exact={routes.exact} component={routes.component} />
                        ))}
                    </Switch>
                </>
            </div>

            <GlobalLoader />
        </>
    );
}
