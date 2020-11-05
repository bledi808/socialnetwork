import React from "react";
// import Logo from "./Logo"; // create logo component
import Uploader from "./Uploader";
import Example from "./example";
import axios from "axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        //bind function
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        console.log("App just mounted");
        // here we make an axios request to get info about our logged in user
        //once we have the user's data we add it to setState with the
        axios
            .get("/user")
            .then((response) => {
                console.log("res in componentDidMount() App axios", response);
                if (response.data.success) {
                    console.log("success in componentDidMount() App axios");
                    this.setState({
                        first: response.data.rows.first,
                        last: response.data.rows.last,
                    });
                    console.log(
                        "this.state after componentDidMount() App axios",
                        this.state
                    );
                } else {
                    // this.state.error = true;
                    console.log(
                        "error with email submission in Password reset"
                    );
                    //here setState{display:X} which can be used to conditionally render an error
                }
            })
            .catch((err) => {
                console.log("err in componentDidMount() App axios", err);
            });
    }

    toggleUploader() {
        console.log("toggle uploader component on/off");
        this.setState({
            //the value means set state to the opposite of what it is; this is a more efficient way than doing it via and if/else statement
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log("method in App running in App component");
        console.log("the argument I got passed is: ", arg);
    }

    render() {
        return (
            <>
                {/* // <Logo /> */}
                <header>
                    <h1>I am the App</h1>
                    <p>
                        My name is {this.state.first} {this.state.last}{" "}
                    </p>
                </header>
                <div>
                    <Example
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                    />
                    <h2 onClick={() => this.toggleUploader()}>
                        Changing state with a method toggleUploader
                    </h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </div>
            </>
        );
    }
}
