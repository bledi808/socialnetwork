import React, { Component } from "react";

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
                <h1>I am the BioEditor comp</h1>
                {this.state.editorIsVisible && <textarea />}
                <button onClick={() => this.toggleEditor()}>
                    Toggle Editor
                </button>
            </>
        );
    }
}
