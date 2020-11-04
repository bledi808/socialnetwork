import React from "react";
import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div id="welcome-header">
            <h1 id="welcome">Welcome to the anti-social network</h1>
            <Registration />
        </div>
    );
}
