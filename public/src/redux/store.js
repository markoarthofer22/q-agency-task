import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import useIsServer from "../components/hooks/useIsServer.hook";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const isServer = useIsServer();

const store = createStore(rootReducer, window.INITIAL_STATE || {}, composeWithDevTools(applyMiddleware(...middleware)));
// const store = createStore(rootReducer, window.INITIAL_STATE || {}, applyMiddleware(...middleware));

export default store;
