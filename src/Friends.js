import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriends } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    // console.log("this.state", state);
    // const friendsList = useSelector((state) => state.friendsList);
    const friends = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((user) => user.accepted)
    );
    // const friendRequests = useSelector(
    //     (state) =>
    //         state.users && state.users.filter((user) => user.accepted == false)
    // );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div id="friends-layout">
            FRIENDS, dear, SWEET Friends!
            {friends &&
                friends.map((user) => (
                    <div key={user.id} id="friends-container">
                        <Link
                            to={`/user/${user.id}`}
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <div id="friends-image-container">
                                <img
                                    className="profile-image"
                                    src={user.url || "/default.jpg"}
                                />
                            </div>
                            <p
                                style={{
                                    color: "blue",
                                }}
                            >
                                {user.first} {user.last}
                            </p>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
