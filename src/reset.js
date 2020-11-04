import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Reset extends React.Component {
    constructor() {
        super();
        this.state = {
            display: 1,
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // console.log("e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state in the callback: ")
        );
    }
    getCurrentDisplay(step) {
        step = this.state.display;
        if (step == 1) {
            return (
                <div>
                    <p>Please enter the email address you registered with:</p>
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={(e) => this.handleChange(e)}
                        className="reg-input"
                        autoComplete="off"
                    ></input>
                    <button onClick={() => this.next()} id="submit-reg">
                        Next
                    </button>
                </div>
            );
        } else if (step == 2) {
            console.log("SECOND step in the RESET process");
            return (
                <div>
                    <p>We found your email and sent you a code</p>
                    <p>Please enter the code emailed to you:</p>
                    <input
                        name="code"
                        placeholder="Code"
                        onChange={(e) => this.handleChange(e)}
                        className="reg-input"
                        autoComplete="off"
                    ></input>
                    <p>Please enter a new password:</p>
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        className="reg-input"
                        autoComplete="off"
                    ></input>
                    <button onClick={() => this.submit()} id="submit-reg">
                        Submit
                    </button>
                </div>
            );
        } else {
            console.log("THIRD step in the RESET process");
            return (
                <div>
                    <p>Password reset successfully reset</p>
                    <p>
                        <Link to="/login">Log in</Link> with new password.
                    </p>
                </div>
            );
        }
    }

    next() {
        console.log("Axios in next()");
        // const me = this;
        axios
            // .post("/reset/:${start}", this.state)
            .post("/reset/start", this.state)
            .then((response) => {
                console.log("response in next() axios", response);
                if (response.data.success) {
                    console.log("successful response in reset/start axios");
                    this.setState({ display: this.state.display + 1 });
                    // console.log("this.state after response in axios", this.state);
                } else {
                    // this.state.error = true;
                    console.log(
                        "error with email submission in Password reset"
                    );
                    //here setStake{display:X} which can be used to conditionally render an error
                }
            })
            .catch((err) => {
                console.log("err in reset/start axios axios", err);
            });
    }
    submit() {
        console.log("Axios in submit()");
        // const me = this;
        axios
            // .post("/reset/:${start}", this.state)
            .post("/reset/verify", this.state)
            .then((response) => {
                console.log("response in submit() axios", response);
                if (response.data.success) {
                    console.log("successful response in reset/verify axios");
                    this.setState({ display: this.state.display + 1 });
                    // console.log("this.state after response in axios", this.state);
                } else {
                    // this.state.error = true;
                    console.log(
                        "error with email submission in Password reset"
                    );
                    //here setState{display:X} which can be used to conditionally render an error
                }
            })
            .catch((err) => {
                console.log("err in reset/start axios axios", err);
            });
    }

    render() {
        // console.log("this.state in after render()", this.state);
        // console.log("this.state.error in after render()", this.state.error);
        return <div className="main-container">{this.getCurrentDisplay()}</div>;
    }
}
