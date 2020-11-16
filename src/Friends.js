import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriends, acceptFriend, removeFriend } from "./actions";

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
    const receivedRequests = useSelector(
        (state) =>
            state.receivedRequests &&
            state.receivedRequests.filter((user) => user)
    );
    const sentRequests = useSelector(
        (state) =>
            state.sentRequests && state.sentRequests.filter((user) => user)
    );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    if (!allFriends) {
        return <p>No friends yet...</p>;
    }

    return (
        <>
            <div id="main-friends-container">
                <div id="friends-subcontainer1">
                    <h3 id="friends-heading">Friends</h3>
                    <div id="friends-layout">
                        {friends &&
                            friends.map((user) => (
                                <div
                                    key={user.id}
                                    id="friends-component-container"
                                >
                                    <Link
                                        to={`/user/${user.id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div
                                            className="friends-name"
                                            style={{
                                                color: "green",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </div>
                                        <div id="friends-image-container">
                                            <img
                                                className="friends-image"
                                                src={user.url || "/default.jpg"}
                                            />
                                        </div>
                                    </Link>
                                    <div id="received-buttons-layout">
                                        <button
                                            onClick={() =>
                                                dispatch(removeFriend(user.id))
                                            }
                                            id="sent-button"
                                            className="button"
                                        >
                                            ✘
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div id="friends-subcontainer2" style={{}}>
                    <div>
                        <h3 id="friends-heading">Received Friend Requests</h3>
                        <div>
                            <div
                                id="friends-layout"
                                style={{
                                    width: "483px",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {receivedRequests &&
                                    receivedRequests.map((user) => (
                                        <div
                                            key={user.id}
                                            id="friends-component-container"
                                        >
                                            <Link
                                                to={`/user/${user.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <div
                                                    className="friends-name"
                                                    style={{
                                                        color: "royalblue",
                                                    }}
                                                >
                                                    {user.first} {user.last}
                                                </div>
                                                <div id="friends-image-container">
                                                    <img
                                                        className="friends-image"
                                                        src={
                                                            user.url ||
                                                            "/default.jpg"
                                                        }
                                                    />
                                                </div>
                                            </Link>
                                            <div id="received-buttons-layout">
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFriend(
                                                                user.id
                                                            )
                                                        )
                                                    }
                                                    id="reject-received-button"
                                                    className="button"
                                                >
                                                    ✘
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            acceptFriend(
                                                                user.id
                                                            )
                                                        )
                                                    }
                                                    id="accept-received-button"
                                                    className="button"
                                                >
                                                    ✔
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 id="friends-heading">Sent Friend Requests</h2>
                        <div>
                            <div
                                id="friends-layout"
                                style={{
                                    width: "483px",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {sentRequests &&
                                    sentRequests.map((user) => (
                                        <div
                                            key={user.id}
                                            id="friends-component-container"
                                        >
                                            <Link
                                                to={`/user/${user.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <div
                                                    className="friends-name"
                                                    style={{
                                                        color: "#fa7f72",
                                                    }}
                                                >
                                                    {user.first} {user.last}
                                                </div>
                                                <div id="friends-image-container">
                                                    <img
                                                        className="friends-image"
                                                        src={
                                                            user.url ||
                                                            "/default.jpg"
                                                        }
                                                    />
                                                </div>
                                            </Link>
                                            <div id="received-buttons-layout">
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFriend(
                                                                user.id
                                                            )
                                                        )
                                                    }
                                                    id="sent-button"
                                                    className="button"
                                                >
                                                    ✘
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
