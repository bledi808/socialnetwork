import React from "react";

export default function Logo() {
    return (
        <>
            {/* <h2>I am the Logo</h2> */}
            <div className="logo-container">
                <div className="logo-image-container">
                    <img src="/logo.png" className="logo-image" />
                </div>
                <div id="logo-title">myDroogs</div>
                {/* <h2 id="logo-title">myDroogs</h2> */}
            </div>
        </>
    );
}
