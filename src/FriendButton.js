import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

// passed {this.props.match.params.id} as a prop
export default function FriendButton({ otherId }) {
    const [buttonText, setButtonText] = useState("XYZ");

    console.log("props in Friend Button", otherId);

    //when the component mounts, BEFORE the user clicks on the button, make an axios request to server to figure out the current friendship status b/w 2 users (logged in user and the user whose page we're on).

    useEffect(() => {
        console.log("useEffect in FriendButton is running");
        axios.get(`/api/friendStatus/${otherId}`).then(({ data }) => {
            console.log("data in userEffect in FriendButton", data);
            setButtonText(data.status);
            // set;
        });
    }, []);

    return (
        <>
            <button
                // onClick={() => this.logOut()}
                id="submit-reg"
                // id="log-out-button"
                className="button"
            >
                {buttonText}
            </button>
        </>
    );
}
