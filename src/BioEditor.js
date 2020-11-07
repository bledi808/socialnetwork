import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            bio: "",
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
        let bio = this.state.bio;

        if (editor) {
            // edit mode
            return (
                <>
                    <div id="bio-textarea">
                        <textarea />
                    </div>
                    <div>
                        <button
                            className="button"
                            id="save-bio-button"
                            onClick={() => this.toggleEditor()}
                        >
                            Save
                        </button>
                    </div>
                </>
            );
        } else if (!editor && bio) {
            return (
                //display mode; bio exists in database
                <>
                    <p id="bio-text">
                        Display bio here if it already exists for the user. This
                        should be retrieved from the users table in the database
                    </p>
                    <button
                        className="button"
                        id="edit-bio-button"
                        onClick={() => this.toggleEditor()}
                    >
                        {" "}
                        Edit Bio
                    </button>
                </>
            );
        } else {
            // display mode; bio exists in database
            return (
                <button
                    className="button"
                    id="edit-bio-button"
                    onClick={() => this.toggleEditor()}
                >
                    {" "}
                    Add Bio
                </button>
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
        return <>{this.getCurrentDisplay()}</>; // return (
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
