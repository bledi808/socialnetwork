import React from "react";

export default function Example(props) {
    // alternatively you can destructure the props: export default function Example(first, last, imgUrl)
    //we then render it like this <h1>My name is {first} {last}</h1>
    console.log("props from parent - App component", props);
    return (
        <>
            <h2>I am the example component</h2>
            <h2>
                My name is {props.first} {props.last}{" "}
            </h2>
            {/* links to profile image for user or defaukt if no profile */}
            <img
                src={
                    props.imgUrl ||
                    "/Users/bledihasa/Desktop/Spiced/pimento-socialnetwork/public/assets/katsuji isaka 1975.jpg"
                }
            />
        </>
    );
}
