import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
        };
        // this.toggleEditor = this.toggleEditor.bind(this);
    }

    toggleEditor() {
        console.log("toggleEditor running");
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }

    render() {
        return (
            <>
                <p></p>
                <div id="bio-textarea">
                    {this.state.editorIsVisible && <textarea />}
                </div>
                <button
                    className="button"
                    id="edit-button"
                    onClick={() => this.toggleEditor()}
                >
                    Toggle Editor
                </button>
            </>
        );
    }
}
