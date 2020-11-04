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
                    <p>Please enter the email address you regisetered with:</p>
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={(e) => this.handleChange(e)}
                        className="reg-input"
                        autoComplete="off"
                    ></input>
                    <button onClick={() => this.submit()} id="submit-reg">
                        Next
                    </button>
                </div>
            );
        } else if (step == 2) {
            console.log("SECOND step in the RESET process");
            return (
                <div>
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
            <div>
                <p>Password reset successfully reset</p>
                <p>
                    <Link to="/login">Log in </Link> with new password.
                </p>
            </div>;
        }
    }

    mounted() {
        //1st display
        axios
            .post("/reset/start", this.state)
            .then((response) => {
                console.log("response in Reset mounted axios", response);
                if (response.data.success) {
                    // then we redirect the user to our social network
                    // location.replace("/"); // this does the redirect...
                    console.log("successssss");
                    this.setState = {
                        display: "first",
                    };
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

    submit() {
        console.log("Login axios about to submit");
        axios
            .post("/reset/start", this.state)
            .then((response) => {
                console.log("response in submit axios", response);
                if (response.data.success) {
                    // then we redirect the user to our social network
                    // location.replace("/"); // this does the redirect...
                    console.log("successssss in reset/start axios");
                    this.setState = {
                        display: 2,
                    };
                } else {
                    this.setState({
                        error: true,
                        // here we can do conditional rendering for error message (i.e.have an error message appear based on error: true)
                    });
                    console.log(
                        "error with email submission in Password reset"
                    );
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
