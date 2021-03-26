import React from "react";
import { Route, Switch } from "react-router-dom";

//Global scss
import "./css/App.scss";
//Components
// import Header from "./components/header/header.component";
import GlobalLoader from "./components/loaders/global.loader.component";
//helmet
import Helmet from "react-helmet";
import Routes from "./routes/Routes";

const App = (props) => {
    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
                <title>Q Agency | Home</title>
            </Helmet>

            <div className="wrapper">
                <Switch>
                    {Routes[0].routes.map((routes, index) => (
                        <Route key={index} path={routes.path} exact={routes.exact} component={routes.component} />
                    ))}
                </Switch>
            </div>

            <GlobalLoader />
        </>
    );
};

export default App;
