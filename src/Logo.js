import React from "react";

export default function Logo() {
    return (
        <>
            <h2>I am the Logo</h2>
            <div className="logo-container">
                <img
                    src="/logo.png"
                    alt="anti-social network logo"
                    className="logo-image"
                />
            </div>
            <span>Hello Anti Social Comrade</span>
        </>
    );
}
