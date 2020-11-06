import React from "react";
import Profile from "./Profile";

export default function ProfilePic({ first, last, imgUrl, toggleUploader }) {
    return (
        <>
            <div className="profile-container">
                <div className="profile-image-container">
                    <img
                        src={imgUrl || "/default.jpg"}
                        alt={first + " " + last}
                        className="profile-image"
                        onClick={toggleUploader}
                    />
                </div>
                <div>
                    {first} {last}
                </div>
            </div>
            {/* <Profile
                first={props.first}
                last={props.last}
                imgUrl={props.imgUrl}
                // work out how to pass url of profile photo to grandchild Profile
                profilePicUrl={props.imgUrl || "/default.jpg"}
            /> */}
        </>
    );
}
