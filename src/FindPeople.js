import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    // const [first, setFirst] = useState("");
    const [users, setUsers] = useState([]);
    // console.log(users);

    useEffect(() => {
        console.log("useEffect is running!!!");
        // console.log(`${first} has been rendered in useEffect!`);
        // let dataArray = [];
        axios.get("/api/users").then(({ data }) => {
            setUsers(data.rows);
        });
        // return () => {
        //     console.log(`about to replace ${country} with a new value!`);
        // };
    }, []);

    return (
        <div id="other-profile-container">
            <h3>Our newest comrades</h3>
            <ul>
                {users &&
                    users.map((user) => (
                        <div key={user.id} className="profile-container">
                            <div id="profile-image-container">
                                <img
                                    className="profile-image"
                                    src={user.url || "/default.jpg"}
                                />
                                <p>
                                    {user.first} {user.last}
                                </p>
                            </div>
                        </div>
                    ))}
            </ul>
        </div>
    );
}
