import React from "react";

export default function ProfilePic(props) {
    // alternatively you can destructure the props: export default function Example(first, last, imgUrl)
    //we then render it like this <h1>My name is {first} {last}</h1>
    console.log("props from parent - App component", props);
    return (
        <>
            <h2>I am the ProfilePic</h2>
            <p>
                Name: {props.first} Surname: {props.last}
            </p>
            {/* links to profile image for user or default if no profile */}
            {/* <div className="profile-container" onClick={props.toggleUploader()}> */}
            <div className="profile-container">
                <img
                    src={props.imgUrl || "/default.jpg"}
                    alt={props.first + " " + props.first}
                    className="profile-image"
                />
            </div>
        </>
    );
}
