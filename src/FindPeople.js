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
            <div id="search-input-div">
                <input
                    className="reg-input"
                    id="search-input"
                    autoComplete="off"
                    placeholder="Find People"
                    onChange={(e) => setSearch(e.target.value)}
                    defaultValue={search}
                ></input>
                {error && <p>{error}</p>}
            </div>
            <div id="search-layout">
                {users &&
                    users.map((user) => (
                        <div key={user.id} id="search-container">
                            <Link
                                to={`/user/${user.id}`}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <div id="search-image-container">
                                    <img
                                        className="search-image"
                                        src={user.url || "/default.jpg"}
                                    />
                                </div>
                                <p id="search-name">
                                    {user.first} {user.last}
                                </p>
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}
