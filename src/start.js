import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome"; // evaluates to false in /welcome route bc user is on that route

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <h1>You Have Arrived at The Anti Social Network</h1>;
}
//Appends React code to the DOM
//only called once per project; will never be called again after
// render() takes 2 args: the component ("HelloWorld") and the DOM node ("main") on which we append the component
ReactDOM.render(elem, document.querySelector("main"));
