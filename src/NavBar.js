import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ logoutButton }) {
    return (
        <div id="app-navbar">
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">Profile</button>
            </Link>
            <Link
                to="/users"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">Search</button>
            </Link>
            <Link
                to="/api/getFriends"
                style={{
                    textDecoration: "none",
                }}
            >
                <button className="navbar-buttons">Friends</button>
            </Link>
            <button onClick={logoutButton} className="navbar-buttons">
                Log out
            </button>
        </div>
    );
}
