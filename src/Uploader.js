import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            newImage: props.imgUrl,
        };
    }

    componentDidMount() {
        console.log("Uploader just mounted");
        console.log("this.props in Uploader", this.props); // props include the methodInApp from App and ImgUrl
    }

    handleChange(e) {
        // console.log("e.target.value", e.target.value);
        console.log("e.target.files[0]", e.target.files[0]);
        this.setState({
            [e.target.name]: e.target.files[0],
            newImage: e.target.files[0].name,
        });
    }

    uploadImage() {
        console.log("uploadImage running");
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("formData", formData);
        axios
            .post("/upload", formData)
            .then((response) => {
                console.log("response.data in uploadImage()", response);
                this.setState({
                    newImage: response.data,
                });
                this.methodInUploader();
            })
            .catch(function (err) {
                console.log("error in axios POST /upload", err);
            });
    }

    methodInUploader() {
        console.log("closeUploader() clicked in Uploader");
        this.props.methodInApp(this.state.newImage);
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
                        onClick={() => this.methodInUploader()}
                    ></div>
                    <div id="upload-modal">
                        <div id="upload-modal-layout">
                            <div id="upload-modal-header">
                                <h3 id="upload-modal-title">
                                    Select profile photo
                                </h3>
                                <p
                                    id="upload-modal-x"
                                    onClick={() => this.methodInUploader()}
                                >
                                    x
                                </p>
                            </div>

                            <input
                                onChange={(e) => this.handleChange(e)}
                                id="file"
                                type="file"
                                name="file"
                                placeholder="image/*"
                                className="input-file"
                                // data-multiple-caption="{count} files selected"
                                // multiple
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
