import React from "react";
import Logo from "./Logo"; // create logo component
import Uploader from "./Uploader";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            // first: "",
            // last: "",
            // imgUrl: "",
        };
        //bind function
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        // console.log("App just mounted");
        axios
            .get("/user")
            .then((response) => {
                // console.log("res in componentDidMount() App axios", response);
                if (response.data.success) {
                    this.setState({
                        first: response.data.rows.first,
                        last: response.data.rows.last,
                        imgUrl: response.data.rows.url,
                    });
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
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        this.toggleUploader();
        // this.setState();
        this.setState({ imgUrl: arg });
    }

    render() {
        return (
            <>
                <header id="app-header">
                    <Logo />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </header>
                <div>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            methodInApp={this.methodInApp}
                            imgUrl={this.state.imgUrl}
                            // toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </div>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                    toggleUploader={() => this.toggleUploader()}
                />
            </>
        );
    }
}
