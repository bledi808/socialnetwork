import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
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
        console.log("about to submit");
        axios
            .post("/register", this.state)
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
            <div>
                <h2>And I am the Registration child component</h2>
                {/* conditional rendering of error message */}
                {this.state.error && (
                    <div>Opps somthing went wrong with registration</div>
                )}

                <input
                    name="first"
                    placeholder="first name"
                    onChange={(e) => this.handleChange(e)} // instead of binding
                ></input>
                <input
                    name="last"
                    placeholder="last name"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <button onClick={() => this.submit()}>Register</button>
            </div>
        );
    }
}
