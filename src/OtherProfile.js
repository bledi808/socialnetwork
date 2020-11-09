import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match", this.props.match);
        //we tell our server in the axios request for which user we want tto get the infor for
        //we also want to check if we are attempting to access our own profile - in which case we want to be routed back to "/"... below this is hardcoded using example own ID = 7 ... we will run comparison for :id / {id}
        if (this.props.match.params.id == 7) {
            this.props.history.push("/");
        }
    }

    submit() {}

    render() {
        return (
            <>
                <h3>OtherProfile component</h3>
            </>
        );
    }
}
