//react
import React from "react";
import ReactDOM from "react-dom";

//router
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "./routes/Routes";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>{renderRoutes(Routes)}</BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
