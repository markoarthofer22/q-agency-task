import React from 'react';
import { Route, Switch } from 'react-router-dom';
//helmet
import Helmet from 'react-helmet';
import Routes from './routes/Routes';

//Global scss
import './css/App.scss';

//Components
import GlobalLoader from './components/loaders/global.loader.component';

// context
import GlobalStateProvider from './contextStore/globals/globalsState.provider';
import AppStateProvider from './contextStore/app/appState.provider';
const App = (): JSX.Element => {
    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
                <title>Q Agency | Home</title>
            </Helmet>
            <AppStateProvider>
                <GlobalStateProvider>
                    <div className="wrapper">
                        <Switch>
                            {Routes[0].routes.map((routes, index) => (
                                <Route
                                    key={index}
                                    path={routes.path}
                                    exact={routes.exact}
                                    component={
                                        routes.component as React.ComponentType
                                    }
                                />
                            ))}
                        </Switch>
                    </div>

                    <GlobalLoader />
                </GlobalStateProvider>
            </AppStateProvider>
        </>
    );
};

export default App;
