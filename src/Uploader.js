import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader just mounted");
        console.log("this.props", this.props); //should be the methodInApp from App
    }

    // methodInUploader() {
    //     this.props.methodInApp("Pimento argument example");
    // }

    render() {
        return (
            <>
                <h1>I am the Uploader</h1>
                {/* <h2 onClick={() => this.methodInUploader()}>
                    click here to run the method in Uploader that triggers the
                    methodInApp
                </h2> */}
            </>
        );
    }
}
