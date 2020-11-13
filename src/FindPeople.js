import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
// import { render } from "react-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [error, setError] = useState([]);
    // console.log(users);

    useEffect(() => {
        console.log("useEffect 1 is running");
        async () => {
            try {
                let { data } = await axios.get("/api/users");
                setUsers(data.rows);
            } catch (err) {
                console.log("err in useEffect() axios /api/users", err);
            }
        };
    }, []);

    useEffect(() => {
        console.log("useEffect 2 is running");
        let abort;
        axios.get(`/api/users/${search}`).then(({ data }) => {
            console.log("data in userEffect() 2", data);
            if (!data.success) {
                setError(data.error);
            } else setError(null);

            if (!abort) {
                setUsers(data.rows);
            }
        });

        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <>
            <div id="profile">
                <div id="search-users">
                    <input
                        className="reg-input"
                        autoComplete="off"
                        placeholder="Search People"
                        onChange={(e) => setSearch(e.target.value)}
                        defaultValue={search}
                    ></input>
                    {error && <p>{error}</p>}
                </div>
                <div id="other-profile-container">
                    {users &&
                        users.map((user) => (
                            <div
                                key={user.id}
                                className="profile-container"
                                style={{ margin: "10%" }}
                            >
                                <Link
                                    to={`/user/${user.id}`}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <div id="profile-image-container">
                                        <img
                                            className="profile-image"
                                            src={user.url || "/default.jpg"}
                                        />
                                        <p
                                            style={{
                                                color: "blue",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
