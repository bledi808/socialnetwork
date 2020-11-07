import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "", // store bio as it is being edited
        };
        // this.toggleEditor = this.toggleEditor.bind(this);
    }

    toggleEditor() {
        console.log("toggleEditor running");
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }

    getCurrentDisplay() {
        let editor = this.state.editorIsVisible;
        if (editor) {
            // edit mode
            return (
                <div id="bio-textarea">
                    <textarea />
                </div>
            );
        } else {
            return (
                //display mode
                <div>
                    <div>DISPLAY BIO HERE</div>
                    <button
                        className="button"
                        id="edit-button"
                        onClick={() => this.toggleEditor()}
                    >
                        {" "}
                        Edit Bio
                    </button>
                    ;
                </div>
            );
        }
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

    render() {
        return <div>{this.getCurrentDisplay()}</div>; // return (
        //     <>
        //         <p></p>
        //         <div id="bio-textarea">
        //             {this.state.editorIsVisible && <textarea />}
        //         </div>
        //         <button
        //             className="button"
        //             id="edit-button"
        //             onClick={() => this.toggleEditor()}
        //         >
        //             Toggle Editor
        //         </button>
        //     </>
        // );
    }
}
