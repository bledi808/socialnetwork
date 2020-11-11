import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

// passed {this.props.match.params.id} as a prop
export default function FriendButton({ otherId }) {
    const [buttonText, setButtonText] = useState("");
    // console.log("props in Friend Button", otherId);

    useEffect(() => {
        console.log("useEffect in FriendButton is running");
        (async () => {
            try {
                let { data } = await axios.get(`/api/friendStatus/${otherId}`);
                setButtonText(data.status);
            } catch (err) {
                console.log("err in useEffect axios in FriendButton", err);
            }
        })();
    }, []);

    function submit() {
        console.log("FriendButton clicked");

        (async () => {
            try {
                let { data } = await axios.post(`/api/friendStatus/button`, {
                    buttonText,
                    otherId,
                });
                setButtonText(data.status);
            } catch (err) {
                console.log("err in submit() axios in FriendButton", err);
            }
        })();

        // After db is successfully updated; update button text as follows:
        ////////////////////Send Friend Request -> Cancel Friend Request
        ////////////////////Cancel Friend Request -> Send Friend Request
        ////////////////////Accept Friend Request -> Unfriend
        ////////////////////Unfriend -> Send Friend Request
        // setButtonText(data.status);
    }

    return (
        <>
            <button
                onClick={() => submit()}
                id="submit-reg"
                id="friend-button"
                className="button"
            >
                {buttonText}
            </button>
        </>
    );
}
