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
    // profileImgClass,
}) {
    return (
        <>
            {/* <div id="profile-container"> */}
            <div id="profile">
                <div id="picture-bio-layout">
                    <div id="profile-image-container" onClick={toggleUploader}>
                        <ProfilePic imgUrl={imgUrl} />
                    </div>
                    <div id="bio">
                        <h2 id="bio-name">
                            {first} {last}
                        </h2>
                        <div id="bio-bio">
                            <BioEditor
                                bio={bio}
                                updateBioInApp={updateBioInApp}
                                deleteAccount={deleteAccount}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}
