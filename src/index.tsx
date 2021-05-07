//react
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

//router
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Routes from './routes/Routes';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <Suspense fallback={null}>
        <Provider store={store}>
            <BrowserRouter>
                {renderRoutes(Routes as RouteConfig[])}
            </BrowserRouter>
        </Provider>
    </Suspense>,
    document.getElementById('root')
);
