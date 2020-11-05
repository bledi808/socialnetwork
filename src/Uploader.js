import React from "react";
import axios from "./axios";

export default class Uploader extends React.component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader just mounted");
    }

    render() {
        return (
            <>
                <h1>I am the Uploader</h1>
            </>
        );
    }
}
