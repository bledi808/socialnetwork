import React from "react";
// import Logo from "./Logo"; // create logo component
import Uploader from "./Uploader";
import Example from "./example";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // here we hard code info in state but for u=our case we get this info from axios request
            first: "Bledi",
            last: "Hasa",
            ImgUrl: null,
            uploaderIsVisible: false,
        };
        //bind function
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        console.log("App just mounted");
        // here we make an axios request to get info about our logged in user
        //once we have the user's data we add it to setState with the
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
                </header>
                <div>
                    <Example
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                    />
                    <h2 onClick={() => this.toggleUploader}>
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
