import React from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile(props) {
    console.log("props in Profile comp", props); // work out how to pass props to here
    return (
        <>
            <h2>I am the Profile component</h2>
            <span>name: {props.first}</span>
            {/* here we insert the existing component ProfilePic; work out how to render this diffierently (bigger size than in App component) here
            Clue: we pass props to it again below (maybe have 2 different URLs of the imafge that we pass down to it?*/}
            {/* <ProfilePic
            url{props.url} />
            can also be hardcoded: url = "???" */}
            {/* <ProfilePic 
            {props.ProfilePicUrl}/> */}
            <BioEditor />
        </>
    );
}
