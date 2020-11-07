import React from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile({ first, last, imgUrl, toggleUploader }) {
    // console.log("Profile props from App", props); // work out how to pass props to here
    return (
        <>
            <div id="profile-container">
                <div id="profile">
                    <h3>{first}'s Profile</h3>
                    <span>Edit your details here:</span>
                    <div id="picture-bio-layout">
                        <div id="picture">
                            <ProfilePic
                                imgUrl={imgUrl}
                                first={first}
                                last={last}
                            />
                        </div>
                        {/* here we insert the existing component ProfilePic; work out how to render this diffierently (bigger size than in App component) here
                    Clue: we pass props to it again below (maybe have 2 different URLs of the imafge that we pass down to it?*/}
                        <div id="bio">
                            <BioEditor />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
