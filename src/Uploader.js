import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            newImage: props.imgUrl,
        };
    }

    componentDidMount() {}

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
            newImage: e.target.files[0].name,
        });
    }

    uploadImage() {
        // console.log("uploadImage running");
        var formData = new FormData();
        formData.append("file", this.state.file);
        // console.log("formData", formData);
        axios
            .post("/upload", formData)
            .then((response) => {
                // console.log("response.data in uploadImage()", response);
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
        this.props.methodInApp(this.state.newImage);
    }

    deleteImage() {
        axios
            .get("/delete/image")
            .then((response) => {
                console.log("response.data in deleteImage()", response);
                this.setState({
                    newImage: "",
                });
                this.methodInUploader();
            })
            .catch(function (err) {
                console.log("error in axios POST /upload", err);
            });
    }

    render() {
        return (
            <>
                <div id="upload-overlay-container">
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
                            />
                            <div id="uploader-buttons-div">
                                <button
                                    onClick={() => this.uploadImage()}
                                    className="button"
                                >
                                    Upload image
                                </button>
                                <button
                                    onClick={() => this.deleteImage()}
                                    className="button"
                                >
                                    Remove image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
