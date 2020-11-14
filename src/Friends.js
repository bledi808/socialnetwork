import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriends, acceptFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const allFriends = useSelector(
        (state) => state.friendsList && state.friendsList.filter((user) => user)
    );
    const friends = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((user) => user.accepted)
    );
    const friendRequests = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((user) => user.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    // console.log("allFriends: ", allFriends);
    // console.log("friends: ", friends);
    // console.log("friendRequests: ", friendRequests);

    if (!allFriends) {
        return <p>No friends yet...</p>;
    }

    return (
        <>
            {friends && <span>Your Friends</span>}
            <div id="friends-layout">
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
                                        className="friends-image"
                                        src={user.url || "/default.jpg"}
                                    />
                                </div>
                                <p
                                    style={{
                                        color: "green",
                                    }}
                                >
                                    {user.first} {user.last}
                                </p>
                            </Link>
                        </div>
                    ))}
            </div>
            {friendRequests && <span>Your Friend Requests</span>}
            <div id="friends-layout">
                {friendRequests &&
                    friendRequests.map((user) => (
                        <div key={user.id} id="friends-container">
                            <Link
                                to={`/user/${user.id}`}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <div id="friends-image-container">
                                    <img
                                        className="friends-image"
                                        src={user.url || "/default.jpg"}
                                    />
                                </div>
                                <p
                                    style={{
                                        color: "orange",
                                    }}
                                >
                                    {user.first} {user.last}
                                </p>
                            </Link>
                            <button
                                onClick={(e) => dispatch(acceptFriend(user.id))}
                                id="submit-reg"
                                id="friend-button"
                                className="button"
                            >
                                Accept
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
}
