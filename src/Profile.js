import React from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
// import { deleteAccount } from "../db";
import axios from "./axios";

export default function Profile({
    first,
    last,
    imgUrl,
    toggleUploader,
    bio,
    updateBioInApp,
    deleteAccount,
    imgClass,
}) {
    return (
        <>
            <div id="profile-container">
                <div id="profile">
                    <h3>{first}'s Profile</h3>
                    <span>Edit your details here:</span>
                    <div id="picture-bio-layout">
                        <div
                            id="big-picture-container"
                            onClick={toggleUploader}
                        >
                            <ProfilePic
                                imgUrl={imgUrl}
                                first={first}
                                last={last}
                            />
                        </div>
                        {/* here we insert the existing component ProfilePic; work out how to render this diffierently (bigger size than in App component) here
                    Clue: we pass props to it again below (maybe have 2 different URLs of the imafge that we pass down to it?*/}
                        <div id="bio">
                            <BioEditor
                                bio={bio}
                                updateBioInApp={updateBioInApp}
                                deleteAccount={deleteAccount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
