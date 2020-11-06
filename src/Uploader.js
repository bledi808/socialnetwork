import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // console.log("Uploader just mounted");
        console.log("this.props in Uploader", this.props); //should be the methodInApp from App
    }

    selectImage() {
        console.log("selectImage running");
    }
    uploadImage() {
        console.log("uploadImage running");
    }

    closeUploader(arg) {
        console.log("closeUploader() clicked in Uploader");
        this.props.methodInApp();
    }

    render() {
        return (
            <>
                <div id="upload-overlay-container">
                    {/* <h2 onClick={() => this.methodInUploader()}>
                                click here to run the method in Uploader that triggers the
                                methodInApp
                            </h2> */}
                    <div
                        id="upload-overlay"
                        onClick={() => this.closeUploader()}
                    ></div>
                    <div id="upload-modal">
                        <div id="upload-modal-layout">
                            <div id="upload-modal-header">
                                <h3 id="upload-modal-title">
                                    Select profile photo
                                </h3>
                                <p
                                    id="upload-modal-x"
                                    onClick={() => this.closeUploader()}
                                >
                                    x
                                </p>
                            </div>

                            <input
                                onChange={() => this.handleChange()}
                                id="file"
                                type="file"
                                name="file"
                                placeholder="image/*"
                                className="input-file"
                                data-multiple-caption="{count} files selected"
                                multiple
                            />
                            {/* <label id="file-label" for="file">
                                Select image
                                </label> */}
                            <button
                                onClick={() => this.uploadImage()}
                                className="button"
                            >
                                Upload image
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
