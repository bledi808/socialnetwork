import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state.chatMessages);
    console.log("chat messages: ", chatMessages); // undefined until redux steps completed

    const elemRef = useRef();

    useEffect(() => {
        // console.log("chat just mounted");
        // console.log("elemRef", elemRef);
        // console.log("scroll top", elemRef.current.scrollTop);
        // console.log("client height", elemRef.current.clientHeight);
        // console.log("scroll height", elemRef.current.scrollHeight);
        //ensures that chat mounts scrolled down to bottom
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

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
            <h1>Chat Component</h1>
            <div className="chat-display-msgs" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((chat) => (
                        <div
                            key={chat.chat_id}
                            id="friends-component-container"
                        >
                            <Link
                                to={`/user/${chat.id}`}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <div id="chat-image-container">
                                    <img
                                        className="chat-image"
                                        src={chat.url || "/default.jpg"}
                                    />
                                </div>
                                <p>{chat.first}</p>
                            </Link>
                            <p>{chat.message}</p>
                        </div>
                    ))}
            </div>
            <textarea
                onKeyDown={keyCheck}
                placeholder="type your message here"
            ></textarea>
        </>
    );
}
