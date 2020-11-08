import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
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

    submit() {
        console.log("Login axios about to submit");
        axios
            .post("/login", this.state)
            .then((response) => {
                console.log("response in submit axios", response);
                if (response.data.success) {
                    // then we redirect the user to our social network
                    location.replace("/"); // this does the redirect...
                    console.log("successssss");
                } else {
                    this.setState({
                        error: true,
                        // here we can do conditional rendering for error message (i.e.have an error message appear based on error: true)
                    });
                }
            })
            .catch((err) => {
                console.log("err in submit() axios", err);
            });
    }

    render() {
        // console.log("this.state in after render()", this.state);
        // console.log("this.state.error in after render()", this.state.error);
        return (
            <div className="main-container" id="main-container-login">
                <div id="register">
                    <p>Login in with your details</p>
                </div>
                {/* conditional rendering of error message */}
                {this.state.error && (
                    <div>Opps somthing went wrong with registration</div>
                )}
                <div className="form-layout">
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={(e) => this.handleChange(e)}
                        className="reg-input"
                        autoComplete="off"
                    ></input>
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        className="reg-input"
                        autoComplete="off"
                    ></input>
                    <div id="reg-actions-login">
                        <div>
                            <div id="already-reg">
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <span id="link">Register</span>
                                </Link>{" "}
                                instead
                            </div>
                            <div id="already-reg">
                                <Link
                                    to="/reset"
                                    style={{ textDecoration: "none" }}
                                >
                                    <span id="link">Reset</span>
                                </Link>{" "}
                                password
                            </div>
                        </div>
                        <div id="already-reg">
                            <button
                                onClick={() => this.submit()}
                                id="submit-reg"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
