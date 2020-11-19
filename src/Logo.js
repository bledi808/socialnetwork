import React from "react";

export default function Logo() {
    return (
        <>
            {/* <h2>I am the Logo</h2> */}
            <div className="logo-container">
                <div className="logo-image-container">
                    <img src="/logo.png" className="logo-image" />
                </div>
                {/* <div id="logo-title">myDroogies</div> */}
                <h3 id="logo-title">myDroogies</h3>
            </div>
        </>
    );
}
