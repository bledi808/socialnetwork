import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state.chatMessages);
    console.log("chat messages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        // console.log("key pressed", e.target.value);
        if (e.key === "Enter") {
            console.log("user wants to send mesage");
            e.preventDefault();
            console.log("message typed and sent: ", e.target.value);
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div id="chat-container">
                <div id="chat-heading">
                    <h2>Chat Room</h2>
                </div>
                <div className="chat-display-msgs" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((chat) => (
                            <div
                                key={chat.chat_id}
                                id="chat-component-container"
                            >
                                <Link to={`/user/${chat.sender_id}`}>
                                    <div id="chat-image-container">
                                        <img
                                            className="chat-image"
                                            src={chat.url || "/default.jpg"}
                                        />
                                    </div>
                                </Link>
                                <div id="chat-text">
                                    <Link
                                        to={`/user/${chat.sender_id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <p id="chat-name">{chat.first}</p>
                                    </Link>
                                    <p id="chat-msg">{chat.message}</p>
                                    <p id="chat-timestamp">
                                        <div>
                                            {chat.timestamp.slice(11, 16)}
                                        </div>
                                        <div>
                                            {chat.timestamp.split("T")[0]}
                                        </div>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div id="chat-textarea">
                    <textarea
                        onKeyDown={keyCheck}
                        placeholder="Type your message here"
                        id="bio-textarea"
                        rows="2"
                        cols="53"
                        maxLength="255"
                    ></textarea>
                </div>
            </div>
        </>
    );
}
