import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(rootReducer, window.INITIAL_STATE || {}, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
