import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match", this.props.match);
        console.log("this.props.match", this.props.match.params);
        console.log("this.props.match", this.props.match.params.id);
        axios
            .get(`/user/${this.props.match.params.id}`)
            .then(function (response) {
                console.log("response from user/:id", response);
            });
        //we tell our server in the axios request for which user we want tto get the infor for
        //we also want to check if we are attempting to access our own profile - in which case we want to be routed back to "/"... below this is hardcoded using example own ID = 7 ... we will run comparison for :id / {id}
        // if (this.props.match.params.id == 7) {
        //     this.props.history.push("/");
        // }
    }

    submit() {}

    render() {
        return (
            <>
                <h3>OtherProfile inDaHouse</h3>
            </>
        );
    }
}
