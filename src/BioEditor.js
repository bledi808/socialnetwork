import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    // const bio=this.props.bio;
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
            deleteModal: false,
        };
    }

    toggleEditor() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
            draftBio: this.props.bio,
        });
    }

    deleteModal() {
        this.setState({
            deleteModal: !this.state.deleteModal,
        });
        // return (
        //     <div>
        //         Are you sure you want to delete?
        //         {/* {this.props.deleteAccount} */}
        //     </div>
        // );
    }

    getCurrentDisplay() {
        let editor = this.state.editorIsVisible;
        let bio = this.props.bio;
        let deleteModal = this.state.deleteModal;
        if (editor) {
            // edit mode
            return (
                <>
                    <div id="bio-textarea-div">
                        <textarea
                            id="bio-textarea"
                            rows="4"
                            cols="44"
                            onChange={(e) => this.handleChange(e)}
                            maxLength="255"
                            value={this.state.draftBio}
                        />
                    </div>
                    <div>
                        {!bio && (
                            <button
                                className="button"
                                id="save-bio-button"
                                onClick={() => this.submit()}
                            >
                                Save
                            </button>
                        )}
                        {bio && (
                            <button
                                className="button"
                                id="save-bio-button"
                                onClick={() => this.submit()}
                            >
                                Update
                            </button>
                        )}
                    </div>
                </>
            );
        } else if (!editor && bio) {
            return (
                //display mode; bio exists in database
                <>
                    <div id="other-bio-text">{this.props.bio}</div>
                    <div id="bio-buttons-div" className="bio-buttons">
                        <button
                            // onClick={this.props.deleteAccount}
                            onClick={() => this.deleteModal()}
                            // id="delete-account-button"
                            className="button"
                        >
                            Delete Account
                        </button>
                        <button
                            className="button"
                            id="edit-bio-button"
                            onClick={() => this.toggleEditor()}
                        >
                            {" "}
                            Edit Bio
                        </button>
                    </div>
                </>
            );
        } else {
            // display mode; no bio to display
            return (
                <>
                    <div id="bio-buttons-div">
                        <button
                            onClick={() => this.deleteModal()}
                            // onClick={this.props.deleteAccount}
                            id="delete-account-button"
                            className="button"
                        >
                            Delete Account
                        </button>
                        <button
                            className="button"
                            id="edit-bio-button"
                            onClick={() => this.toggleEditor()}
                        >
                            {" "}
                            Add Bio
                        </button>
                    </div>
                    {/* <> */}
                    {/* <div id="bio-buttons-div">Are yousure?</div>
                            <button
                                // onClick={() => this.deleteModal()}
                                onClick={this.props.deleteAccount}
                                id="delete-account-button"
                                className="button"
                            >
                                Yes
                            </button> */}
                    {/* </> */}
                    {deleteModal && (
                        <div id="upload-overlay-container">
                            <div
                                id="upload-overlay"
                                onClick={() => this.deleteModal()}
                            ></div>
                            <div id="upload-modal">
                                <div id="upload-modal-layout">
                                    <div id="upload-modal-header">
                                        <h2 id="upload-modal-title">
                                            Are you sure you want to delete your
                                            account?
                                        </h2>
                                        <p
                                            id="upload-modal-x"
                                            onClick={() => this.deleteModal()}
                                        >
                                            x
                                        </p>
                                    </div>
                                    <div id="uploader-buttons-div">
                                        <button
                                            onClick={this.props.deleteAccount}
                                            className="button"
                                            id="uploader-button"
                                        >
                                            Yes, Delete
                                        </button>
                                        <button
                                            onClick={() => this.deleteModal()}
                                            className="button"
                                            id="uploader-button"
                                        >
                                            No, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
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

    updateBio(arg) {
        this.props.updateBioInApp(arg);
    }

    submit() {
        console.log("BioEditor axios about to submit");
        axios
            .post("/bio", this.state)
            .then(({ data }) => {
                // console.log("{data} in BioEditor submit() axios", data);
                this.setState({
                    draftBio: data,
                });
                this.updateBio(data);
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
