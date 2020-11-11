import React from "react";
import Logo from "./Logo"; // create logo component
import Uploader from "./Uploader";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            // first: first,
        };
        //bind functions
        this.methodInApp = this.methodInApp.bind(this);
        this.updateBioInApp = this.updateBioInApp.bind(this);
        // this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentDidMount() {
        // console.log("App just mounted");
        axios
            .get("/api/user")
            .then((response) => {
                // console.log("res in componentDidMount() App axios", response);
                if (response.data.success) {
                    this.setState({
                        first: response.data.rows.first,
                        last: response.data.rows.last,
                        imgUrl: response.data.rows.url,
                        bio: response.data.rows.bio,
                    });
                    // console.log("this.state in App axios", this.state);
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

    updateBioInApp(arg) {
        // this.setState({ bio: arg }),
        this.setState({ bio: arg });
        () => {
            console.log("state in App after UpdateBioInApp", this.state);
        };
    }
    logOut() {
        console.log("logout clicked");
        axios.get("/api/logout").then(() => {
            location.replace("/welcome#/login");
        });
    }

    deleteAccount() {
        console.log("delete Acct clicked");
        axios
            .get("/api/delete/account")
            .then(() => {
                location.replace("/");
            })
            .catch(function (err) {
                console.log("error in axios POST /upload", err);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="app-container">
                    <header id="app-header">
                        <Logo />
                        <button
                            onClick={() => this.logOut()}
                            // id="submit-reg"
                            id="log-out-button"
                            className="button"
                        >
                            Log out
                        </button>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.imgUrl}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    </header>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imgUrl={this.state.imgUrl}
                                bio={this.state.bio}
                                toggleUploader={() => this.toggleUploader()}
                                updateBioInApp={this.updateBioInApp}
                                deleteAccount={this.deleteAccount}
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/users" render={() => <FindPeople />} />
                    <div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={this.methodInApp}
                                imgUrl={this.state.imgUrl}
                                // toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
