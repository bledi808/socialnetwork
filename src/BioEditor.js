import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    // const bio=this.props.bio;
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
        };
    }

    toggleEditor() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
        this.props.updateBioInApp(this.state.draftBio);
    }

    getCurrentDisplay() {
        let editor = this.state.editorIsVisible;
        let bio = this.props.bio;
        if (editor) {
            // edit mode
            return (
                <>
                    <div
                        id="bio-textarea"
                        onChange={(e) => this.handleChange(e)}
                    >
                        <textarea />
                    </div>
                    <div>
                        <button
                            className="button"
                            id="save-bio-button"
                            onClick={() => this.submit()}
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
                    <p id="bio-text">{this.props.bio}</p>
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
            // display mode; no bio to display
            return (
                <div>
                    <button
                        className="button"
                        id="edit-bio-button"
                        onClick={() => this.toggleEditor()}
                    >
                        Add Bio
                    </button>
                </div>
            );
        }
    }

    handleChange(e) {
        // console.log("e.target.value", e.target.value);
        this.setState(
            {
                draftBio: e.target.value,
            },
            () => console.log("this.state in handleChange(): ", this.state)
        );
    }

    submit() {
        console.log("BioEditor axios about to submit");
        axios
            .post("/bio", this.state)
            .then(({}) => {
                // console.log("{data} in BioEditor submit() axios", data);
                this.toggleEditor();
            })
            .catch((err) => {
                console.log("err in submit() axios", err);
            });
    }

    render() {
        return <>{this.getCurrentDisplay()}</>;
    }
}