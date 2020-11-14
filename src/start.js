import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
const userIsLoggedIn = location.pathname != "/welcome"; // evaluates to false in /welcome route bc user is on that route

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
//Appends React code to the DOM
//only called once per project; will never be called again after
// render() takes 2 args: the component ("HelloWorld") and the DOM node ("main") on which we append the component
ReactDOM.render(elem, document.querySelector("main"));
